import { json, NavLink, useNavigate } from "react-router-dom";
import "./show_waiters.css"
import { Box, Button, Card, CardContent, CardHeader, Container, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import { useState } from "react";
import Modal from "./modal";
import WaiterWork from "./WaiterWork";

const ShowWaiter = ({waiter}) =>{

    const navigate = useNavigate();
    const[showModal, setShowModal] = useState(false);
    const[waiterId, setWaiterId] = useState(false);

const handleDelete = async()=>{
    let result = await fetch(`http://localhost:8080/discoBracelet/waiters/${waiter.id}`,
        {
            method:"DELETE"
        });
        if(result.ok){
            let r = await result.json();
            console.log(r);
        } else {
            console.log("Brisanje nije uspelo!");
        }
        window.location.reload(false);
    
}

const handleCloseModal = (deleteWaiter) =>{
    if(deleteWaiter){
        handleDelete();
    }
    setShowModal(false);
}

    const deleteWaiter = async() =>{
        let result = await fetch (`http://localhost:8080/discoBracelet/waiters/${waiter.id}`,
            {
                method:"DELETE"
            }
        );
        if(result.ok){
            let r = await result.json();
            console.log(r.message);
        } else {
            console.log("Brisanje nije uspelo")
        }
        window.location.reload(false);
    }

    return  <Container>
         { showModal && <Modal onCloseModal={handleCloseModal}/>}
    <Card key={waiter.id} variant="outlined">
        <CardHeader subheader={waiter.username} sx={{border:"1px solid gray", borderRadius:"3px 3px 0px 0px",
        textAlign:"center"}}/>
        <CardContent sx={{display:"flex", flexDirection:"column", alignContent:"center", flexWrap:"wrap"}}>
            <Typography>ID: {waiter.id}</Typography>
            <Typography>Name: {waiter.name}</Typography>
            <Typography>Lastname: {waiter.lastname}</Typography>
            <Typography>Username: {waiter.username}</Typography>
            <Typography>Password: {waiter.password}</Typography>
            {/* <div>Amount:{waiter.amount}</div> */}
            <Box>
            <InfoIcon variant="contained" onClick={()=>navigate(`/waiters/${waiter.id}`)}>Details</InfoIcon>
            <AutoDeleteIcon sx={{cursor:"pointer"}} variant="outlined" onClick={deleteWaiter}>Delete waiter</AutoDeleteIcon>
            <EditIcon variant="contained" onClick={()=>navigate(`/waiters/changeById/${waiter.id}`)}>Waiter edit</EditIcon>
            </Box>
            <Box>
            <DeleteIcon sx={{cursor:"pointer"}} variant="outlined" onClick={()=> {setShowModal(true); setWaiterId(waiter.id)}}>Delete waiter</DeleteIcon>
            </Box>
        </CardContent>
        
    </Card>

    </Container>
}

export default ShowWaiter;