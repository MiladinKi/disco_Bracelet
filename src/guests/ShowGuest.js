import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import "./show_guests.css"
import { Box, Button, Card, CardContent, CardHeader, Container, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import Modal from "./modal";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import { useState } from "react";

const ShowGuest = ({guest}) =>{

    const[showModal, setShowModal] = useState(false);
    const[guestId, setGuestId] = useState(null);
    const navigate = useNavigate();

    const handleDelete =async () =>{
        let result = await fetch (`http://localhost:8080/discoBracelet/guests/${guest.id}`,
        {
            method:"DELETE"
        });
        if(result.ok){
            let r = await result.json();
            console.log(r);
          
        } else {
            console.log('Brisanje nije uspelo')
        }
        
        window.location.reload(false);
      }
    
      const handleCloseModal = (deleteGuest) =>{
        if(deleteGuest){
            handleDelete()
    
        }
        setShowModal(false);
      }

    const deleteGuest = async()=>{
        console.log(guest);
        if (!guest.id) {
            console.log("Guest ID is undefined");
            return;
        }
        let result = await fetch (`http://localhost:8080/discoBracelet/guests/${guest.id}`,
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

    return <Container>
        { showModal && <Modal onCloseModal={handleCloseModal}/>}
        
        <Card key={guest.id} variant="outlined">
           <CardHeader subheader={guest.lastname} sx={{border:"1px solid gray", borderRadius:"3px 3px 0px 0px",
        textAlign:"center"}}/>
            <CardContent sx={{display:"flex", flexDirection:"column", alignContent:"center", flexWrap:"wrap"}}>
                <Typography>ID: {guest.id}</Typography>
                <Typography>Id document: {guest.idDocument}</Typography>
                <Typography>Phone number: {guest.phoneNumber}</Typography>
                <Typography>Bracelet ID: {guest.bracelet?.id || "N/A"}</Typography>
                <Box>
                <InfoIcon variant="contained" onClick={() => navigate(`/guests/${guest.id}`)}>Details</InfoIcon>
                <DeleteIcon sx={{cursor:"pointer"}} variant="outlined" onClick={deleteGuest}>Delete guest</DeleteIcon>
                <EditIcon variant="contained" onClick={()=> navigate(`/guests/changeById/${guest.id}`)}>Update guest</EditIcon>
                </Box>
                <Box>
                <DeleteIcon sx={{cursor:"pointer"}} variant="outlined" onClick={()=> {setShowModal(true); setGuestId(guest.id)}}>Delete guest</DeleteIcon>
                </Box>

            </CardContent>
        </Card>
        </Container>
    

}

export default ShowGuest;