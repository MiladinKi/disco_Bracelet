import { useLoaderData } from "react-router-dom";

const Guest = () =>{

    const guest = useLoaderData();

    return <div className="guest_overviewcard">
    
    <div className="guest_name_container">
        <p className="guest_name">{guest.name} {guest.lastname}</p>
    </div>
<div className="guest_info">
    <div>Id: {guest.id}</div>
    <div>Name: {guest.name}</div>
    <div>Lastname: {guest.lastname}</div>
    <div>ID document: {guest.idDocument}</div>
    <div>Phone number: {guest.phoneNumber}</div>

</div>
</div>
}

export default Guest;