import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const BraceletEdit = () => {   const bracelet = useLoaderData();

    const [manufacturer, setManufacturer] = useState(bracelet ? bracelet.manufacturer : "");
    const [yearOfProduction, setYearOfProduction] = useState(bracelet ? bracelet.yearOfProduction : "");
const[showAlert, setShowAlert] = useState(false);
const[helperText, setHelperText] = useState("");
const[showError, setShowError] = useState(false);
const[helperText2, setHelperText2] = useState("");

useEffect(() => {
    if (bracelet && bracelet.manufacturer && bracelet.yearOfProduction) {
        setManufacturer(bracelet.manufacturer);
        setYearOfProduction(bracelet.yearOfProduction);
    }
}, [bracelet]);

const submitForm = async () => {
    console.log("Submitting form with data:", { manufacturer, yearOfProduction }); // Loguj podatke
    let response = await fetch(`http://localhost:8080/discoBracelet/bracelets/changeById/${bracelet.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            manufacturer,
            yearOfProduction
        }),
    });
    if (response.ok) {
        let d = await response.json();
        console.log("Response:", JSON.stringify(d, null, 4)); // Loguj odgovor
        setShowAlert(true);
    } else {
        console.log("Failed to update bracelet!");
    }
}



return <Container Container sx={{ justifyContent:"start", alignContent:"center", flexWrap:"wrap", width:"80%"}}>
<Box sx={{display:"flex", width:"100%",  alignItems:"center"}}>
    <Typography>Bracelet manufacturer:</Typography>
    <TextField  id="outlined-basic" label="Manufacturer" variant="outlined" value={manufacturer}
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
    <TextField  id="outlined-basic" variant="outlined"  type="date" value={yearOfProduction}
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
    

{showAlert &&<Alert sx={{width:"100%", marginBottom:4}} onClose={() => {setShowAlert(false)}}>Uspesno izmenjena narukvica</Alert>}
        <Button variant="contained" onClick={submitForm}>Update Bracelet</Button>
    </Box>
</Container>


}

export default BraceletEdit;