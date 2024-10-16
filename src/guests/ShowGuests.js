import { NavLink, useLoaderData } from "react-router-dom";
import "./show_guests.css"
import { useState } from "react";
import ShowGuest from "./ShowGuest";
import { Box, Button, Container, TextField } from "@mui/material";

const ShowGuests = () =>{
    const guests = useLoaderData();
    console.log(guests);

    const [search, setSearch] = useState("");
    const filteredGuests = guests.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()));

    return <Container>
    <Box sx={{display:"flex", justifyContent:"end", marginBottom:3, }}>
       
            <TextField size="small" id="outlined-search" label="Pretraga po imenu" type="search" onChange={(e) => setSearch(e.target.value)}/>
            <Button variant="contained" className="search_button">Search</Button>
       
        <Button variant="contained" className="add_button"><NavLink to="add_new_guest">Add guest</NavLink></Button>
  </Box>
    <Box>
        {filteredGuests.map((d) =><ShowGuest guest={d}/>)}
    </Box>
</Container>
}

export default ShowGuests;