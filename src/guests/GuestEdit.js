import { Alert, Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const GuestEdit = () => {
    const guest = useLoaderData();
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [idDocument, setIdDocument] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [availableBracelets, setAvailableBracelets] = useState([]); // Stanje za sve dostupne narukvice
    const [selectedBracelet, setSelectedBracelet] = useState(""); // Stanje za odabranu narukvicu
    const [showAlert, setShowAlert] = useState(false);
    const[helperText, setHelperText] = useState("");
    const[helperText2, setHelperText2] = useState("");
    const[helperText3, setHelperText3] = useState("");
    const[helperText4, setHelperText4] = useState("");
    const[helperText5, setHelperText5] = useState("");
    const[showError, setShowError] = useState(false);

    useEffect(() => {
        let ignore = false;
        const fetchBracelets = async () => {
            let response = await fetch('http://localhost:8080/discoBracelet/bracelets');
            let data = await response.json();
            if (!ignore) {
                setAvailableBracelets(data); // Postavljanje svih narukvica
            }
        };
        fetchBracelets();
        return () => { ignore = true; };
    }, []);

    useEffect(() => {
        if (guest) {
            setName(guest.name);
            setLastname(guest.lastname);
            setIdDocument(guest.idDocument);
            setPhoneNumber(guest.phoneNumber);
            if (guest.bracelet && guest.bracelet.id) {
                setSelectedBracelet(guest.bracelet.id); // Postavljanje ID-a narukvice ako postoji
            }
        }
    }, [guest]);

    const submitForm = async () => {
        let response = await fetch(`http://localhost:8080/discoBracelet/guests/changeById/${guest.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                lastname: lastname,
                idDocument: idDocument,
                phoneNumber: phoneNumber,
                bracelet: selectedBracelet ? { id: selectedBracelet } : null // Pošaljite objekat sa ID-jem ili null
            }),
        });
    
        if (response.ok) {
            let data = await response.json();
            console.log("Guest updated successfully:", data);
            setShowAlert(true);
        } else {
            console.log("Failed to update guest:", response.status, response.statusText);
        }
    }

    return (
        <Container Container sx={{ justifyContent:"start", alignContent:"center", flexWrap:"wrap", width:"80%"}}>
            <Box sx={{display:"flex", width:"100%",  alignItems:"center"}}>
                <Typography>Guest Name</Typography>
                <TextField  id="outlined-basic" label="Name" variant="outlined" value={name}
                onChange={
                    (e)=>{
                          //da bude vece od 0
                if(e.target.value === ""){
                    setShowError(true);
                    setHelperText("Polje ne moze biti prazno");
                    setName(e.target.value);
                }else{
                    setShowError(false);
                    setHelperText("");
                    setName(e.target.value);
                }
            }
                    }
                    required 
              error={showError}
                 helperText={helperText}/>
                <Typography>Guest Lastname</Typography>
                <TextField  id="outlined-basic" label="Lastname" variant="outlined" value={lastname}
                onChange={
                    (e)=>{
                          //da bude vece od 0
                if(e.target.value === ""){
                    setShowError(true);
                    setHelperText2("Polje ne moze biti prazno");
                    setLastname(e.target.value);
                }else{
                    setShowError(false);
                    setHelperText2("");
                    setLastname(e.target.value);
                }
            }
                    }
                    required 
              error={showError}
                 helperText={helperText2}/>
                <Typography>Id document</Typography>
                <TextField  id="outlined-basic" label="ID document" variant="outlined" type="number" value={idDocument}
                onChange={
                    (e)=>{
                          //da bude vece od 0
                if (e.target.value === "" || e.target.value.length !== 13 || parseInt(e.target.value) <= 0) {
                 setShowError(true);
                if (e.target.value === "") {
                setHelperText3("Polje ne može biti prazno");
                    } else if (e.target.value.length !== 13) {
                 setHelperText3("ID dokument mora imati tačno 13 cifara");
                    } else if (parseInt(e.target.value) <= 0) {
                 setHelperText3("ID dokument mora biti veći od 0");
                    }
                    setIdDocument(e.target.value);
                }else{
                    setShowError(false);
                    setHelperText3("");
                    setIdDocument(e.target.value);
                }
            }
                    }
                    required 
              error={showError}
                 helperText={helperText3}/>
                <Typography>Phone number</Typography>
                <TextField  id="outlined-basic" label="Phone number" variant="outlined" type="number" value={phoneNumber}
                onChange={
                    (e)=>{
                          //da bude vece od 0
                if(e.target.value === "" || isNaN(e.target.value)){
                    setShowError(true);
                    setHelperText4("Polje ne moze biti prazno");
                    setPhoneNumber(e.target.value);
                }else{
                    setShowError(false);
                    setHelperText4("");
                    setPhoneNumber(e.target.value);
                }
            }
                    }
                    required 
              error={showError}
                 helperText={helperText4}/>
                <Typography>Bracelet id</Typography>
                {/* <select onChange={(e) => setSelectedBraceletId(parseInt(e.target.value))}>
                    {Array.isArray(bracelets) && bracelets.map((b) => (
                        <option key={b.id} value={b.id}>
                            {b.id}
                        </option>
                    ))}
                </select> */}
                 <FormControl sx={{ width:"30%", minWidth: 120 }} size="small">
                 <InputLabel id="demo-select-small-label">Bracelets</InputLabel>
                <Select
                labelId="filter"
                id="filter"
                label="Bracelets"
                value={selectedBracelet}
                onChange={(e) => {
                    
                    
                    if (e.target.value === "") {
                        setShowError(true); // Postavljamo grešku ako nije ništa odabrano
                        setHelperText5("Morate odabrati narukvicu");
                        setSelectedBracelet(e.target.value);
                    } else {
                        setShowError(false); // Ako je odabrana validna vrednost, uklanjamo grešku
                        setHelperText5("");
                        setSelectedBracelet(parseInt(e.target.value)); // Čuvamo ID narukvice
                    }
                }}
                error={showError} // Prikazujemo grešku ako postoji
                helperText={helperText5}>
    <MenuItem value="">
            <em>Select Bracelet</em>
        </MenuItem>
    {Array.isArray(availableBracelets) && availableBracelets.map((b) => (
        <MenuItem key={b.id} value={b.id}>
        {b.id}
    </MenuItem>
    ))}
</Select>
</FormControl>
         
            {showAlert &&<Alert sx={{width:"100%", marginBottom:4}} onClose={() => {setShowAlert(false)}}>Uspesno izmenjen korisnik</Alert>}
            
            <Button variant="contained" onClick={submitForm}>Update guest</Button>
        </Box>
        </Container>
    );
}

export default GuestEdit;
