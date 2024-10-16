import { useLoaderData } from "react-router-dom";
import "./show_drinks.css";
const Drink = () =>{

    const drink = useLoaderData();
    console.log(drink);
    console.log(drink.drinkImage);

    return <div className="drink_overviewcard"
    style={{ backgroundImage: `url(http://localhost:8080/images/${drink.drinkImage})`, backgroundColor:"red" }}>
    
    <div className="drink_name_container">
        <p className="drink_name">{drink.name}</p>
    </div>
<div className="drink_info">
    <div>Id: {drink.id}</div>
    <div>Name: {drink.name}</div>
    <div>Price: {drink.price}</div>
    <div>Manufacturer: {drink.manufacturer}</div>
    <div>Volume: {drink.volume}</div>

</div>
</div>
}

export default Drink;