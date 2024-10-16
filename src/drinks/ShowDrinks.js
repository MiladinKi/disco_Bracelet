import { useState } from "react";
import { NavLink, useLoaderData } from "react-router-dom"
import ShowDrink from "./ShowDrink";
import './show_drinks.css'
import { Box, Button, Container, TextField } from "@mui/material";

const ShowDrinks = () =>{
    const drinks = useLoaderData();
    console.log(drinks);

    let [search, setSearch] = useState("");
    const filteredDrink = drinks.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()));

    return <Container>
        <Box sx={{display:"flex", justifyContent:"end", marginBottom:3, }}>
           
                <TextField size="small" id="outlined-search" label="Pretraga po nazivu" type="search" onChange={(e) => setSearch(e.target.value)}/>
                <Button variant="contained" className="search_button">Search</Button>
          
            <Button variant="contained" className="add_button"><NavLink to="add_new_drink">Add drink</NavLink></Button>
        </Box>
        <Box>
            {filteredDrink.map((d) =><ShowDrink drink={d}/>)}
        </Box>
    </Container>
}

export default ShowDrinks;