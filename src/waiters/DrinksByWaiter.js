import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";

const DrinksByWaiter = () => {
  const { waiterId } = useParams();
  const [drinks, setDrinks] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await fetch(`http://localhost:8080/discoBracelet/waiters/drinksByWaiter?waiterId=${waiterId}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Received data:", data);  // Logovanje podataka za proveru
        setDrinks(data);

        // Izračunavanje ukupne cene
        const total = data.reduce((acc, drink) => acc + drink.totalPrice, 0);
        console.log("Total price:", total);  // Logovanje ukupne cene za proveru
        setTotalPrice(total);
      } catch (error) {
        console.error("Error fetching drinks", error);
      }
    };

    fetchDrinks();
  }, [waiterId, startDate, endDate]);

  return (
    <div>
      <h1>Drinks by Waiter {waiterId}</h1>

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

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Drink Name</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {drinks && drinks.length > 0 ? (
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
              <td colSpan="4">No drinks found</td>
            </tr>
          )}
        </tbody>
      </table>

      <Box
        sx={{
          width: 150,
          height: 25,
          borderRadius: 1,
          bgcolor: 'red',
        }}
      >Total Price: ${totalPrice.toFixed(2)}</Box>
    </div>
  );
};

export default DrinksByWaiter;
