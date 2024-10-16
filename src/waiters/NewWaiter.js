import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";

const NewWaiter = () =>{
    const[waiter, setWaiter] = useState("");
    const[name, setName] = useState("");
    const[lastname, setLastname] = useState("");
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[showAlert, setShowAlert] = useState(false);
    // const[amount, setAmount] = useState("");
    const[showError, setShowError] = useState(false);
    const[helperText, setHelperText] = useState("");
    const[helperText2, setHelperText2] = useState("");
    const[helperText3, setHelperText3] = useState("");
    const[helperText4, setHelperText4] = useState("");

    const addNewWaiter = async()=>{
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
        if (username === "") {
            setShowError(true);
            setHelperText3("Polje ne moze biti prazno");
            return; // Prekinite izvršavanje ako je polje prazno
        }
        if (password === "") {
            setShowError(true);
            setHelperText4("Polje ne moze biti prazno");
            return; // Prekinite izvršavanje ako je polje prazno
        }
        let response = await fetch('http://localhost:8080/discoBracelet/waiters', {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                name: name,
                lastname: lastname,
                username: username,
                password: password
                // amount: amount
            }),
        });
        if(response.ok){
            let d = await response.json();
            console.log(JSON.stringify(d, null, 4));
            setWaiter(d);
            setShowAlert(true);
        } else {
            console.log("Neuspeh slanja")
        }
    }

    return <Container Container sx={{ justifyContent:"start", alignContent:"center", flexWrap:"wrap", width:"80%"}}>
    <Box sx={{display:"flex", width:"100%",  alignItems:"center"}}>
        <Typography>Waiter name:</Typography>
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
        <Typography>Waiter lastname:</Typography>
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
        <Typography>Waiter username :</Typography>
        <TextField  id="outlined-basic" label="Username" variant="outlined" 
         onChange={
            (e)=>{
                  //da bude vece od 0
        if(e.target.value === ""){
            setShowError(true);
            setHelperText3("Polje ne moze biti prazno");
            setUsername(e.target.value);
        }else{
            setShowError(false);
            setHelperText3("");
            setUsername(e.target.value);
        }
    }
            }
            required 
      error={showError}
         helperText={helperText3}/>
        <Typography>Waiter password:</Typography>
        <TextField  id="outlined-basic" label="Password" variant="outlined" type="password" 
         onChange={
            (e)=>{
                  //da bude vece od 0
        if(e.target.value === ""){
            setShowError(true);
            setHelperText4("Polje ne moze biti prazno");
            setPassword(e.target.value);
        }else{
            setShowError(false);
            setHelperText4("");
            setPassword(e.target.value);
        }
    }
            }
            required 
      error={showError}
         helperText={helperText4}/>
        {/* <div className="input_label">Waiter amount</div>
        <input className="input_field" type="number" step="0.01" onChange={((e) => setAmount(e.target.value))}/> */}
        <br/>
    </Box>
    {showAlert &&<Alert sx={{width:"100%", marginBottom:4}} onClose={() => {setShowAlert(false)}}>Uspesno kreirana novi konobar</Alert>}
    <Button variant="contained"  onClick={addNewWaiter}>Save waiter</Button>
</Container>
}
export default NewWaiter;