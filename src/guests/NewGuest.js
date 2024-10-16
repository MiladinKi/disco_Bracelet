import { useEffect, useState } from "react";
import "./show_guests.css";
import { Alert, Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

const NewGuest = () => {

    const [guest, setGuest] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [idDocument, setIdDocument] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [bracelets, setBracelets] = useState([]);
    const [selectedBraceletId, setSelectedBraceletId] = useState(null); // Ova promenljiva će čuvati ID izabranog narukvice
    const [showAlert, setShowAlert] = useState(false);
    const[helperText, setHelperText] = useState("");
    const[helperText2, setHelperText2] = useState("");
    const[helperText3, setHelperText3] = useState("");
    const[helperText4, setHelperText4] = useState("");
    const[helperText5, setHelperText5] = useState("");
    const[showError, setShowError] = useState(false);

    const AddNewGuest = async () => {
        if (name === "") {
            setShowError(true);
            setHelperText("Polje ne moze biti prazno");
            return; // Prekinite izvršavanje ako je polje prazno
        }
        if (lastname === "") {
            setShowError(true);
            setHelperText2("Polje ne moze biti prazno");
            return; // Prekinite izvršavanje ako je polje prazno
        }
        if (idDocument === "") {
            setShowError(true);
            setHelperText3("Polje ne moze biti prazno");
            return; // Prekinite izvršavanje ako je polje prazno
        }
        if (phoneNumber === "") {
            setShowError(true);
            setHelperText4("Polje ne moze biti prazno");
            return; // Prekinite izvršavanje ako je polje prazno
        }
        // if (selectedBraceletId === null) {
        //     console.log("Nije izabrana narukvica.");
        //     return;
        // }

        if (selectedBraceletId === null || selectedBraceletId === "") {
            setShowError(true);
            setHelperText5("Morate odabrati narukvicu pre nego što nastavite.");
            return;
        }
    

        let response = await fetch(`http://localhost:8080/discoBracelet/guests/${selectedBraceletId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                lastname: lastname,
                idDocument: idDocument,
                phoneNumber: phoneNumber,
            }),
        });

        if (response.ok) {
            let d = await response.json();
            console.log(JSON.stringify(d, null, 4));
            setShowAlert(true);
        } else {
            console.log("Neuspeh slanja!");
        }
    };

    // useEffect(() => {
    //     let ignore = false;
    //     const ff = async () => {
    //         let r = await fetch('http://localhost:8080/discoBracelet/bracelets');
    //         let rr = await r.json();
    //         console.log(rr);
    //         if (!ignore) {
    //             setBracelets(rr);
    //         }
    //     };
    //     ff();
    //     return () => {
    //         ignore = true;
    //     };
    // }, []);

    useEffect(() => {
        let ignore = false;
        const ff = async () => {
            let r = await fetch('http://localhost:8080/discoBracelet/bracelets/availableBracelets');
            let rr = await r.json();
            console.log(rr);
            if (!ignore) {
                setBracelets(rr);
                console.log(rr);
                console.log(bracelets);
            }
        };
        ff();
        return () => {
            ignore = true;
        };
    }, []);

    return (
        <Container Container sx={{ justifyContent:"start", alignContent:"center", flexWrap:"wrap", width:"80%"}}>
            <Box sx={{display:"flex", width:"100%",  alignItems:"center"}}>
                <Typography>Guest Name</Typography>
                <TextField  id="outlined-basic" label="Name" variant="outlined" 
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
                <TextField  id="outlined-basic" label="Lastname" variant="outlined" 
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
                <TextField  id="outlined-basic" label="ID document" variant="outlined" type="number" 
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
                <TextField  id="outlined-basic" label="Phone number" variant="outlined" type="number" 
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
                onChange={(e) => {
                    
                    
                    if (e.target.value === "") {
                        setShowError(true); // Postavljamo grešku ako nije ništa odabrano
                        setHelperText5("Morate odabrati narukvicu");
                        setSelectedBraceletId(e.target.value);
                    } else {
                        setShowError(false); // Ako je odabrana validna vrednost, uklanjamo grešku
                        setHelperText5("");
                        setSelectedBraceletId(parseInt(e.target.value)); // Čuvamo ID narukvice
                    }
                }}
                error={showError} // Prikazujemo grešku ako postoji
                helperText={helperText5}>
    <MenuItem value="">
            <em>Select Bracelet</em>
        </MenuItem>
    {Array.isArray(bracelets) && bracelets.map((b) => (
        <MenuItem key={b.id} value={b.id}>
        {b.id}
    </MenuItem>
    ))}
</Select>
</FormControl>
            </Box>
            {showAlert &&<Alert sx={{width:"100%", marginBottom:4}} onClose={() => {setShowAlert(false)}}>Uspesno kreirana nov korisnik</Alert>}
            <Button variant="contained" onClick={AddNewGuest}>Save</Button>
        </Container>
    );
};

export default NewGuest;
