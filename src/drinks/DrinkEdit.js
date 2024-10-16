import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const DrinkEdit = () =>{

    const drink = useLoaderData();

    const[name, setName] = useState("");
    const[price, setPrice] = useState("");
    const[manufacturer, setManufacturer] = useState("");
    const[volume, setVolume] = useState("");
    const[drinkImage, setDrinkImage] = useState("");
    const[showAlert, setShowAlert] = useState(false);
    const[helperText, setHelperText] = useState("");
    const[helperText2, setHelperText2] = useState("");
    const[helperText3, setHelperText3] = useState("");
    const[helperText4, setHelperText4] = useState("");
    const[helperText5, setHelperText5] = useState("");
    const[showError, setShowError] = useState(false);

    const handleImageChange = (e) => {
        setDrinkImage(e.target.files[0]); // Uzimamo prvu sliku iz fajlova
    };

    // const submitForm = async() =>{
    //     let response = await fetch(`http://localhost:8080/discoBracelet/drinks/changeById/${drink.id}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             name:name,
    //             price: price,
    //             manufacturer: manufacturer,
    //             volume: volume,
    //             drinkImage: drinkImage
    //         }),
    //     });

    //     if(response.ok){
    //         let d = await response.json();
    //         console.log(JSON.stringify(d, null, 4));
    //     } else {
    //         console.log("Neuspeh izmene podataka pica");
    //     }
    // };

    const submitForm = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('manufacturer', manufacturer);
        formData.append('volume', volume);
        
        // Ovo je samo ako je drinkImage definisan
        if (drinkImage) {
            formData.append('drinkImage', drinkImage);
        }
    
        let response = await fetch(`http://localhost:8080/discoBracelet/drinks/changeById/${drink.id}`, {
            method: "PUT",
            body: formData,
        });
    
        if (response.ok) {
            let d = await response.json();
            console.log(JSON.stringify(d, null, 4));
            setShowAlert(true);
        } else {
            let error = await response.text();
            console.log("Neuspeh izmene podataka pica:", error);
        }
    };
    
    

    // useEffect(()=>{
    //     let ignore = false;
    //     const ff = async()=>{
    //         let r = await fetch(`http://localhost:8080/discoBracelet/drinks`);
    //         let rr = await r.json();
    //         if(!ignore){
    //             setDr
    //         }
    //     }
    // })

    useEffect(() => {
        if (drink) {
            setName(drink.name);
            setPrice(drink.price);
            setManufacturer(drink.manufacturer);
            // Obično se password ne bi inicijalno postavljao zbog sigurnosti, ali ako je to potrebno:
            setVolume(drink.volume);
        }
    }, [drink]); // Ovaj useEffect će se pokrenuti kada se `waiter` promeni

    // return <div className="form_container">
    // <div className="input_container">
    //  <div className="input_label">Drink Name</div>
    //  <input className="input_field" type="text" value={name} onChange={((e) => setName(e.target.value))}/>
    //  <div className="input_label">Drink price</div>
    //  <input className="input_field" type="number" step="0.01" value={price} onChange={((e) => setPrice(e.target.value))}/>
    //  <div className="input_label">Drink manufacturer</div>
    //  <input  className="input_field" type="text" value={manufacturer} onChange={((e) => setManufacturer(e.target.value))}/>
    //  <div className="input_label">Drink volume</div>
    //  <input className="input_field" type="number" step="0.01" value={volume} onChange={((e) => setVolume(e.target.value))}/>
    //  <div>Drink image</div>
    //  <input className="input_field" type="file" onChange={handleImageChange} />
    // </div>
    {/* <select value={subject}  onChange={((e)=>setSubject(e.target.value))}>
            {subjects.map((s)=><option value={s.name}>{s.name}</option>)}
    </select> */}
    return <Container sx={{ justifyContent:"start", alignContent:"center", flexWrap:"wrap", width:"80%"}}>
    <Box sx={{display:"flex", width:"100%", flexDirection:"column", alignItems:"center"}}>
        <Typography>Drink name:</Typography>
        <TextField  id="outlined-basic" label="Drink name" variant="outlined" value={name}
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

        <Typography>Drink price:</Typography>
        <TextField  id="outlined-basic" label="Price" variant="outlined" type="number" step="0.01" value={price}
       onChange={
        (e)=>{
              //da bude vece od 0
    if(e.target.value <= 0){
        setShowError(true);
        setHelperText2("Polje ne moze biti manje od 0");
        setPrice(e.target.value);
    }else{
        setShowError(false);
        setHelperText2("");
        setPrice(e.target.value);
    }
}
        }
        required 
  error={showError}
     helperText={helperText2}/>
        <Typography>Drink manufacturer:</Typography>
        <TextField  id="outlined-basic" label="Manufacturer" variant="outlined" value={manufacturer}
        onChange={
            (e)=>{
                  //da bude vece od 0
        if(e.target.value === ""){
            setShowError(true);
            setHelperText3("Polje ne moze biti prazno");
            setManufacturer(e.target.value);
        }else{
            setShowError(false);
            setHelperText3("");
            setManufacturer(e.target.value);
        }
    }
            }
            required 
      error={showError}
         helperText={helperText3}/>
        <Typography>Drink volume:</Typography>
        <TextField  id="outlined-basic" label="Volume" variant="outlined" type="number" step="0.01" value={volume}
       onChange={
        (e)=>{
              //da bude vece od 0
    if(e.target.value <= 0){
        setShowError(true);
        setHelperText4("Polje ne moze biti manje od 0");
        setVolume(e.target.value);
    }else{
        setShowError(false);
        setHelperText4("");
        setVolume(e.target.value);
    }
}
        }
        required 
  error={showError}
     helperText={helperText4}/>
        <Typography>Drink Image URL:</Typography>
        <TextField  id="outlined-basic" variant="outlined" type="file" value={drinkImage}
       onChange={
        (e)=>{
              //da bude vece od 0
    if(e.target.value === ""){
        setShowError(true);
        setHelperText5("Slika mora biti izabrana");
        setDrinkImage(e.target.value);
    }else{
        setShowError(false);
        setHelperText5("");
        setDrinkImage(e.target.value);
    }
}
        }
        required 
  error={showError}
     helperText={helperText5}/>
        
   
    
    {showAlert &&<Alert sx={{width:"100%", marginBottom:4}} onClose={() => {setShowAlert(false)}}>Uspesno izmenjeno pice</Alert>}
    <Button variant="contained" onClick={submitForm}>Update</Button>
</Box>
</Container>
}

export default DrinkEdit;