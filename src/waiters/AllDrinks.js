import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AllDrinks = () => {
  const [drinks, setDrinks] = useState([]);  // Stanje za sva pića
  const [totalPrice, setTotalPrice] = useState(0);  // Stanje za ukupnu cenu
  const [startDate, setStartDate] = useState(new Date());  // Početni datum
  const [endDate, setEndDate] = useState(new Date());  // Krajnji datum

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        console.log("Fetching drinks from", startDate.toISOString(), "to", endDate.toISOString());  // Logovanje datuma
        const response = await fetch(`http://localhost:8080/discoBracelet/waiters/drinksByWaiters?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const data = await response.json();
  
        console.log("Received data:", data);
        console.log("Drinks data:", data.drinks);
        console.log("Drinks array length:", data.drinks.length);
  
        setDrinks(data.drinks || []);
        setTotalPrice(data.totalEarnings || 0);
  
      } catch (error) {
        console.error("Error fetching all drinks", error);
      }
    };
  
    fetchDrinks();
  }, [startDate, endDate]);
  
  return (
    <div>
      <h1>All Drinks</h1>

      {/* Date pickers za biranje datuma */}
      <div>
        <label>Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          showTimeSelect
          dateFormat="Pp"
        />
        <label>End Date:</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          showTimeSelect
          dateFormat="Pp"
        />
      </div>

      {/* Tabela za prikaz svih pića */}
      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {drinks.length > 0 ? (
            drinks.map(drink => (
              <tr key={drink.id}>
                <td>{drink.id}</td>
                <td>{drink.drinkName}</td>
                <td>{drink.quantity}</td>
                <td>${drink.totalPrice.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No drinks available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Ukupna cena */}
      <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
    </div>
  );
};

export default AllDrinks;
