import { CenterFocusStrong } from "@mui/icons-material";
import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";

const NewBracelet = () =>{
    const[bracelet, setBracelet] = useState("");
    const[manufacturer, setManufacturer] = useState("");
    const[yearOfProduction, setYearOfProduction] = useState("");
   
    const[showAlert, setShowAlert] = useState(false);
    const[helperText, setHelperText] = useState("");
    const[showError, setShowError] = useState(false);
    const[helperText2, setHelperText2] = useState("");
    const addNewBracelet = async()=>{
        if (manufacturer === "") {
            setShowError(true);
            setHelperText("Polje ne moze biti prazno");
            return; // Prekinite izvršavanje ako je polje prazno
        }
        if (yearOfProduction === "") {
            setShowError(true);
            setHelperText2("Polje ne moze biti prazno");
            return; // Prekinite izvršavanje ako je polje prazno
        }
        let response = await fetch('http://localhost:8080/discoBracelet/bracelets', {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                manufacturer: manufacturer,
                yearOfProduction: yearOfProduction

            }),
        });
        if(response.ok){
            let d = await response.json();
            console.log(JSON.stringify(d, null, 4));
            setBracelet(d);
            setShowAlert(true);
        } else {
            console.log("Neuspeh slanja")
        }
    }

    return <Container Container sx={{ justifyContent:"start", alignContent:"center", flexWrap:"wrap", width:"80%"}}>
    <Box sx={{display:"flex", width:"100%",  alignItems:"center"}}>
        <Typography>Bracelet manufacturer:</Typography>
        <TextField  id="outlined-basic" label="Manufacturer" variant="outlined" 
        onChange={
            (e) => {
                if(e.target.value === ""){
                    setShowError(true);
                    setHelperText("Polje ne moze biti prazno");
                    setManufacturer(e.target.value);
                }else {
                    setShowError(false);
                    setHelperText("");
                    setManufacturer(e.target.value);
                }
            }
        }
            required
            error={showError}
            helperText={helperText}/>
        <Typography>Bracelet year of production:</Typography>
        <TextField  id="outlined-basic" variant="outlined"  type="date" 
         onChange={
            (e) => {
                if(e.target.value === ""){
                    setShowError(true);
                    setHelperText2("Polje ne moze biti prazno");
                    setYearOfProduction(e.target.value);
                }else {
                    setShowError(false);
                    setHelperText2("");
                    setYearOfProduction(e.target.value);
                }
            }
        }
            required
            error={showError}
            helperText={helperText2}/>
        
    </Box>
    {showAlert &&<Alert sx={{width:"100%", marginBottom:4}} onClose={() => {setShowAlert(false)}}>Uspesno kreirana nova narukvica</Alert>}
    <Button variant="contained" alignItems="start" onClick={addNewBracelet}>Save bracelet</Button>
</Container>
}

export default NewBracelet;