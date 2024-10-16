import { Box, Button, Card, CardContent, CardHeader, colors, Container, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { blue } from "@mui/material/colors";
import { useState } from "react";
import Modal from "./modal";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';

const ShowBracelet = ({bracelet}) =>{

    const navigate = useNavigate();

    const[braceletId, setBraceletId] = useState(null);
    const[showModal, setShowModal] = useState(false);
    const handleDelete = async()=>{
        let result = await fetch (`http://localhost:8080/discoBracelet/bracelets/${bracelet.id}`,
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
    
    const handleCloseModal = (deleteBracelet) =>{
        if(deleteBracelet){
            handleDelete();
        }
        setShowModal(false);
    }

    const deleteBracelet = async() =>{
        let result = await fetch (`http://localhost:8080/discoBracelet/bracelets/${bracelet.id}`,
            {
                method:"DELETE"
            });
            if(result.ok){
                let r = await result.json();
                console.log(r.message);
            } else {
                console.log("Brisanje nije uspelo!")
            }
            window.location.reload(false);
    }

    return  <Container>
         { showModal && <Modal onCloseModal={handleCloseModal}/>}
    <Card key={bracelet.id} variant="outlined">
    <CardHeader subheader={bracelet.manufacturer} sx={{border:"1px solid gray", borderRadius:"3px 3px 0px 0px",
        textAlign:"center"}}/>
        <CardContent sx={{display:"flex", flexDirection:"column", alignContent:"center", flexWrap:"wrap"}}>
            <Typography>ID: {bracelet.id}</Typography>
            <Typography>Manufacturer: {bracelet.manufacturer}</Typography>
            <Typography>Year of production: {bracelet.yearOfProduction}</Typography>
            <Box>
            <InfoIcon variant="contained" onClick={()=>navigate(`/bracelets/${bracelet.id}`)}>Details</InfoIcon>
            <AutoDeleteIcon variant="contained" onClick={deleteBracelet}>Delete bracelet</AutoDeleteIcon>
            <EditIcon variant="contained" onClick={() => navigate(`/bracelets/changeById/${bracelet.id}`)}>Update bracelet</EditIcon>
            </Box>
            <Box>
            <DeleteIcon sx={{cursor:"pointer"}} variant="outlined" onClick={()=> {setShowModal(true); setBraceletId(bracelet.id)}}>Delete bracelet</DeleteIcon>  
            </Box>
        </CardContent>
    </Card>
    </Container>
}

export default ShowBracelet;