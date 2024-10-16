import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { json, useLoaderData } from "react-router-dom";

const WaiterEdit= () =>{

    const waiter = useLoaderData();

    const[name, setName] = useState("");
    const[lastname, setLastname] = useState("");
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[waiters, setWaiters] = useState([]);
    const[showError, setShowError] = useState(false);
    const[helperText, setHelperText] = useState("");
    const[helperText2, setHelperText2] = useState("");
    const[helperText3, setHelperText3] = useState("");
    const[helperText4, setHelperText4] = useState("");
    const[showAlert, setShowAlert] = useState(false);

    const submitForm = async()=>{
        let response = await fetch(`http://localhost:8080/discoBracelet/waiters/changeById/${waiter.id}`, {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                name:name,
                lastname:lastname,
                username:username,
                password:password
            }),
    });
    if(response.ok){
        let d = await response.json();
        console.log(JSON.stringify(d, null, 4));
        setShowAlert(true);
    } else {
        console.log("Neuspeh izmene konobara!")
    }
}

    useEffect(()=>{
        let ignore = false;
        const ff = async() =>{
            let r = await fetch ("http://localhost:8080/discoBracelet/teachers");
            let rr = await r.json();
            if(!ignore){
                setWaiters(rr);
            }
        };
        ff();
        return () =>{
            ignore = true;
        };
    }, []);

    useEffect(() => {
        if (waiter) {
            setName(waiter.name);
            setLastname(waiter.lastname);
            setUsername(waiter.username);
            // Obično se password ne bi inicijalno postavljao zbog sigurnosti, ali ako je to potrebno:
            setPassword(waiter.password);
        }
    }, [waiter]); // Ovaj useEffect će se pokrenuti kada se `waiter` promeni
    
    // return <div className="form_container">
    // <div className="input_container">
    //  <div className="input_label">Waiter Name</div>
    //  <input className="input_field" type="text" value={name} onChange={((e) => setName(e.target.value))}/>
    //  <div className="input_label">Waiter Lastname</div>
    //  <input className="input_field" type="text" value={lastname} onChange={((e) => setLastname(e.target.value))}/>
    //  <div className="input_label">Waiter username</div>
    //  <input className="input_field" type="text" value={username} onChange={((e) => setUsername(e.target.value))}/>
    //  <div className="input_label">Waiter password</div>
    //  <input className="input_field" type="password" value={password} onChange={((e) => setPassword(e.target.value))}/>
    // </div>

    return <Container Container sx={{ justifyContent:"start", alignContent:"center", flexWrap:"wrap", width:"80%"}}>
    <Box sx={{display:"flex", width:"100%",  alignItems:"center"}}>
        <Typography>Waiter name:</Typography>
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
        <Typography>Waiter lastname:</Typography>
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
        <Typography>Waiter username :</Typography>
        <TextField  id="outlined-basic" label="Username" variant="outlined" value={username}
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
        <TextField  id="outlined-basic" label="Password" variant="outlined" type="password" value={password}
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
  
    {showAlert &&<Alert sx={{width:"100%", marginBottom:4}} onClose={() => {setShowAlert(false)}}>Uspesno izmenjen konobar</Alert>}

    <Button variant="contained" onClick={submitForm}>Update Waiter</Button>
</Box>
</Container>
}

export default WaiterEdit;