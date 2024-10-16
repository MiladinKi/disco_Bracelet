import { NavLink, useNavigate } from "react-router-dom";
import './show_drinks.css'
import { Box, Button, Card, CardContent, CardHeader, Container, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from "react";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import Modal from "./modal";

const ShowDrink = ({drink}) =>{

    const navigate = useNavigate();
    const[showModal, setShowModal] = useState(false);
    const[drinkId, setDrinkId] = useState(false);

    const handleDelete = async()=>{
        let result = await fetch (`http://localhost:8080/discoBracelet/drinks/${drink.id}`,
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
    
    const handleCloseModal = (deleteDrink) =>{
        if(deleteDrink){
            handleDelete();
        }
        setShowModal(false);
    }

    const deleteDrink = async() =>{
        let result = await fetch (`http://localhost:8080/discoBracelet/drinks/${drink.id}`,
        {
            method:"DELETE"
        });
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
    <Card key={drink.id} variant="outlined" style={{ backgroundImage: `url(http://localhost:8080/images/${drink.drinkImage})` }}>
    <CardHeader subheader={drink.name} sx={{border:"1px solid gray", borderRadius:"3px 3px 0px 0px",
        textAlign:"center"}}/>
        <CardContent sx={{display:"flex", flexDirection:"column", alignContent:"center", flexWrap:"wrap"}}>
            <Typography>ID: {drink.id}</Typography>
            <Typography>Name: {drink.name}</Typography>
            <Typography>Price: {drink.price}</Typography>
            <Typography>Manufacturer: {drink.manufacturer}</Typography>
            <Typography>Volume: {drink.volume}</Typography>
            <Box>
            {/* <img src={`http://localhost:8080/${drink.drinkImage}`} alt={drink.name} /> */}
            <InfoIcon  variant="contained" onClick={()=>navigate(`/drinks/${drink.id}`)}>Details</InfoIcon>
            <AutoDeleteIcon  sx={{cursor:"pointer", color:"red"}} variant="outlined" onClick={deleteDrink}>Delete drink</AutoDeleteIcon>
            <EditIcon variant="contained" onClick={()=>navigate(`/drinks/changeById/${drink.id}`)}>Update drink</EditIcon>
            </Box>
            <Box>
            <DeleteIcon sx={{cursor:"pointer"}} variant="outlined" onClick={()=> {setShowModal(true); setDrinkId(drink.id)}}>Delete drink</DeleteIcon>
            </Box>
        </CardContent>
    </Card>
    </Container>
}

export default ShowDrink;