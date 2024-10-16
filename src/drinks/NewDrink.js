import { useState } from "react";
import './show_drinks.css';
import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material";

const NewDrink = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [volume, setVolume] = useState("");
    const [drinkImage, setDrinkImage] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [helperText, setHelperText] = useState("");
    const [helperText2, setHelperText2] = useState("");
    const [helperText3, setHelperText3] = useState("");
    const [helperText4, setHelperText4] = useState("");
    const [helperText5, setHelperText5] = useState("");
    const [showError, setShowError] = useState({
        name: false,
        price: false,
        manufacturer: false,
        volume: false,
        image: false,
    });

    const addNewDrink = async (event) => {
        event.preventDefault();

        if (name === "") {
            setShowError((prev) => ({ ...prev, name: true }));
            setHelperText("Polje ne može biti prazno");
            return;
        }
        if (price <= 0) {
            setShowError((prev) => ({ ...prev, price: true }));
            setHelperText2("Cena mora biti veća od 0");
            return;
        }
        if (manufacturer === "") {
            setShowError((prev) => ({ ...prev, manufacturer: true }));
            setHelperText3("Proizvođač ne može biti prazan");
            return;
        }
        if (volume <= 0) {
            setShowError((prev) => ({ ...prev, volume: true }));
            setHelperText4("Količina mora biti veća od 0");
            return;
        }
        if (!drinkImage) {
            setShowError((prev) => ({ ...prev, image: true }));
            setHelperText5("Slika mora biti izabrana");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("manufacturer", manufacturer);
        formData.append("volume", volume);
        formData.append("drinkImage", drinkImage);

        let response = await fetch('http://localhost:8080/discoBracelet/drinks', {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            let d = await response.json();
            console.log(JSON.stringify(d, null, 4));
            setShowAlert(true);
        } else {
            console.log("Neuspeh slanja");
        }
    }

    return (
        <Container sx={{ justifyContent: "start", alignContent: "center", flexWrap: "wrap", width: "80%" }}>
            <Box sx={{ display: "flex", width: "100%", flexDirection: "column", alignItems: "center" }}>
                <Typography>Drink name:</Typography>
                <TextField label="Drink name" variant="outlined"
                    onChange={(e) => {
                        setName(e.target.value);
                        setShowError((prev) => ({ ...prev, name: e.target.value === "" }));
                        setHelperText(e.target.value === "" ? "Polje ne može biti prazno" : "");
                    }}
                    error={showError.name}
                    helperText={helperText} />

                <Typography>Drink price:</Typography>
                <TextField label="Price" variant="outlined" type="number" step="0.01"
                    onChange={(e) => {
                        setPrice(e.target.value);
                        setShowError((prev) => ({ ...prev, price: e.target.value <= 0 }));
                        setHelperText2(e.target.value <= 0 ? "Cena mora biti veća od 0" : "");
                    }}
                    error={showError.price}
                    helperText={helperText2} />

                <Typography>Drink manufacturer:</Typography>
                <TextField label="Manufacturer" variant="outlined"
                    onChange={(e) => {
                        setManufacturer(e.target.value);
                        setShowError((prev) => ({ ...prev, manufacturer: e.target.value === "" }));
                        setHelperText3(e.target.value === "" ? "Proizvođač ne može biti prazan" : "");
                    }}
                    error={showError.manufacturer}
                    helperText={helperText3} />

                <Typography>Drink volume:</Typography>
                <TextField label="Volume" variant="outlined" type="number" step="0.01"
                    onChange={(e) => {
                        setVolume(e.target.value);
                        setShowError((prev) => ({ ...prev, volume: e.target.value <= 0 }));
                        setHelperText4(e.target.value <= 0 ? "Količina mora biti veća od 0" : "");
                    }}
                    error={showError.volume}
                    helperText={helperText4} />

                <Typography>Drink Image:</Typography>
                <input type="file" onChange={(e) => {
                    setDrinkImage(e.target.files[0]); // Pravilno postavljanje fajla
                    setShowError((prev) => ({ ...prev, image: e.target.files.length === 0 }));
                    setHelperText5(e.target.files.length === 0 ? "Slika mora biti izabrana" : "");
                }}
                    required
                    error={showError.image}
                    helperText={helperText5} />
            </Box>

            {showAlert && <Alert sx={{ width: "100%", marginBottom: 4 }} onClose={() => { setShowAlert(false) }}>Uspešno kreirano novo piće</Alert>}
            <Button variant="contained" onClick={addNewDrink}>Save drink</Button>
        </Container>
    )
}

export default NewDrink;


// import { useState } from "react";
// import './show_drinks.css'
// import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material";

// const NewDrink = () =>{

//     const[drink, setDrink] = useState("");
//     const[name, setName] = useState("");
//     const[price, setPrice] = useState("");
//     const[manufacturer, setManufacturer] = useState("");
//     const[volume, setVolume] = useState("");
//     const[drinkImage, setDrinkImage] = useState(null);
//     const[showAlert, setShowAlert] = useState(false);
//     const[helperText, setHelperText] = useState("");
//     const[helperText2, setHelperText2] = useState("");
//     const[helperText3, setHelperText3] = useState("");
//     const[helperText4, setHelperText4] = useState("");
//     const[helperText5, setHelperText5] = useState("");
//     const[showError, setShowError] = useState(false);
//     // const addNewDrink = async()=>{
//     //     let response = await fetch('http://localhost:8080/discoBracelet/drinks', {
//     //         method: "POST",
//     //         headers: {
//     //             "Content-Type":"application/json",
//     //         },
//     //         body: JSON.stringify({
//     //             name: name,
//     //             price: price,
//     //             manufacturer: manufacturer,
//     //             volume: volume,
//     //             drinkImage: drinkImage
//     //         }),
//     //     });
//     //     if(response.ok){
//     //         let d = await response.json();
//     //         console.log(JSON.stringify(d, null, 4));
//     //         setDrink(d);
//     //     } else {
//     //         console.log("Neuspeh slanja")
//     //     }
//     // }

//     const addNewDrink = async (event) => {
//         if (name === "") {
//             setShowError(true);
//             setHelperText("Polje ne moze biti prazno");
//             return; // Prekinite izvršavanje ako je polje prazno
//         }
//         if (price <= 0) {
//             setShowError(true);
//             setHelperText2("Cena mora biti veca od 0");
//             return; // Prekinite izvršavanje ako je polje prazno
//         }
//         if (manufacturer === "") {
//             setShowError(true);
//             setHelperText3("Polje ne moze biti prazno");
//             return; // Prekinite izvršavanje ako je polje prazno
//         }
//         if (volume <= 0) {
//             setShowError(true);
//             setHelperText("Kolicina mora biti veca od 0");
//             return; // Prekinite izvršavanje ako je polje prazno
//         }
//         if (drinkImage === "") {
//             setShowError(true);
//             setHelperText5("Polje ne moze biti prazno");
//             return; // Prekinite izvršavanje ako je polje prazno
//         }
//         event.preventDefault(); // Sprečava default ponašanje forme
    
//         const formData = new FormData();
//         formData.append("name", name);
//         formData.append("price", price);
//         formData.append("manufacturer", manufacturer);
//         formData.append("volume", volume);
//         if (drinkImage) {
//             formData.append("drinkImage", drinkImage);
//         }
    
//         let response = await fetch('http://localhost:8080/discoBracelet/drinks', {
//             method: "POST",
//             body: formData, // Pošalji formData umesto JSON
//         });
    
//         if (response.ok) {
//             let d = await response.json();
//             console.log(JSON.stringify(d, null, 4));
//             setDrink(d);
//             setShowAlert(true);
//         } else {
//             console.log("Neuspeh slanja");
//         }
//     }
    

//     return <Container sx={{ justifyContent:"start", alignContent:"center", flexWrap:"wrap", width:"80%"}}>
//         <Box sx={{display:"flex", width:"100%", flexDirection:"column", alignItems:"center"}}>
//             <Typography>Drink name:</Typography>
//             <TextField  id="outlined-basic" label="Drink name" variant="outlined" 
//             onChange={
//                 (e)=>{
//                       //da bude vece od 0
//             if(e.target.value === ""){
//                 setShowError(true);
//                 setHelperText("Polje ne moze biti prazno");
//                 setName(e.target.value);
//             }else{
//                 setShowError(false);
//                 setHelperText("");
//                 setName(e.target.value);
//             }
//         }
//                 }
//                 required 
//           error={showError}
//              helperText={helperText}/>

//             <Typography>Drink price:</Typography>
//             <TextField  id="outlined-basic" label="Price" variant="outlined" type="number" step="0.01" 
//            onChange={
//             (e)=>{
//                   //da bude vece od 0
//         if(e.target.value <= 0){
//             setShowError(true);
//             setHelperText2("Polje ne moze biti manje od 0");
//             setPrice(e.target.value);
//         }else{
//             setShowError(false);
//             setHelperText2("");
//             setPrice(e.target.value);
//         }
//     }
//             }
//             required 
//       error={showError}
//          helperText={helperText2}/>
//             <Typography>Drink manufacturer:</Typography>
//             <TextField  id="outlined-basic" label="Manufacturer" variant="outlined" 
//             onChange={
//                 (e)=>{
//                       //da bude vece od 0
//             if(e.target.value === ""){
//                 setShowError(true);
//                 setHelperText3("Polje ne moze biti prazno");
//                 setManufacturer(e.target.value);
//             }else{
//                 setShowError(false);
//                 setHelperText3("");
//                 setManufacturer(e.target.value);
//             }
//         }
//                 }
//                 required 
//           error={showError}
//              helperText={helperText3}/>
//             <Typography>Drink volume:</Typography>
//             <TextField  id="outlined-basic" label="Volume" variant="outlined" type="number" step="0.01" 
//            onChange={
//             (e)=>{
//                   //da bude vece od 0
//         if(e.target.value <= 0){
//             setShowError(true);
//             setHelperText4("Polje ne moze biti manje od 0");
//             setVolume(e.target.value);
//         }else{
//             setShowError(false);
//             setHelperText4("");
//             setVolume(e.target.value);
//         }
//     }
//             }
//             required 
//       error={showError}
//          helperText={helperText4}/>
//             <Typography>Drink Image URL:</Typography>
//             <TextField  id="outlined-basic" variant="outlined" type="file" 
//            onChange={
//             (e)=>{
//                   //da bude vece od 0
//         if(e.target.value === ""){
//             setShowError(true);
//             setHelperText5("Slika mora biti izabrana");
//             setDrinkImage(e.target.files[0]);
//         }else{
//             setShowError(false);
//             setHelperText5("");
//             setDrinkImage(e.target.files[0]);
//         }
//     }
//             }
//             required 
//       error={showError}
//          helperText={helperText5}/>
            
//         </Box>
        
//         {showAlert &&<Alert sx={{width:"100%", marginBottom:4}} onClose={() => {setShowAlert(false)}}>Uspesno kreirana novo pice</Alert>}
//         <Button variant="contained" onClick={addNewDrink}>Save drink</Button>
//     </Container>
// }

// export default NewDrink;