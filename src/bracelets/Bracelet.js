import { useLoaderData } from "react-router-dom";
import "./show_bracelets.css"
const Bracelet = () =>{

    const bracelet = useLoaderData();
    console.log(bracelet);

    if (!bracelet) {
        return <div>No data found</div>;
    }

    return <div className="bracelet_overviewcard">
    
    <div className="bracelet_name_container">
        <p className="bracelet_name">{bracelet.id}</p>
    </div>
<div className="bracelet_info">
    <div>Id: {bracelet.id}</div>
    <div>Manufacturer: {bracelet.manufacturer}</div>
    <div>Year of production: {bracelet.yearOfProduction}</div>


</div>
</div>

}
export default Bracelet;