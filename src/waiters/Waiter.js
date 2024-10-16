import { useLoaderData } from "react-router-dom";

const Waiter = () =>{

    const waiter = useLoaderData();

    return <div className="waiter_overviewcard">
    
    <div className="waiter_name_container">
        <p className="waiter_name">{waiter.username}</p>
    </div>
<div className="waiter_info">
    <div>Id: {waiter.id}</div>
    <div>Name: {waiter.name}</div>
    <div>Lastname: {waiter.lastname}</div>
    <div>Username: {waiter.username}</div>
    <div>Password: {waiter.password}</div>

</div>
</div>
}

export default Waiter;