import { useState } from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import ShowWaiter from "./ShowWaiter";
import './show_waiters.css';
import { Box, Button, Container, TextField } from "@mui/material";

const ShowWaiters = () => {
    const waiters = useLoaderData();
    console.log(waiters);

    let [search, setSearch] = useState("");
    const filteredWaiter = waiters.filter((d) => d.username.toLowerCase().includes(search.toLowerCase()));

    return (
        <Container>
            <Box sx={{ display: "flex", justifyContent: "end", marginBottom: 3 }}>
                <TextField 
                    size="small" 
                    id="outlined-search" 
                    label="Pretraga po username" 
                    type="search" 
                    onChange={(e) => setSearch(e.target.value)} 
                />
                <Button variant="contained" className="search_button">Search</Button>
                <Button variant="contained" className="add_button">
                    <NavLink to="add_new_waiter">Add waiter</NavLink>
                </Button>
            </Box>
            <Box>
                {filteredWaiter.map((d) => (
                    <div key={d.id}>
                        <ShowWaiter waiter={d} />
                        <Box sx={{ marginBottom: 2 }}>
                            <NavLink to={`/assign_drinks/${d.id}`}>
                                <Button variant="contained">Assign Drinks</Button>
                            </NavLink>
                            <NavLink to={`/drinksByWaiter/${d.id}`}>
                                <Button variant="contained" sx={{ marginLeft: 1 }}>View Drinks</Button>
                            </NavLink>
                        </Box>
                    </div>
                ))}
                <Box sx={{ marginTop: 2 }}>
                    <NavLink to="/drinksByWaiters">
                        <Button variant="contained">All Drinks</Button>
                    </NavLink>
                </Box>
            </Box>
        </Container>
    );
}

export default ShowWaiters;
