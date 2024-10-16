import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const WaiterWork = () => {
    const { waiterId } = useParams();
    const [selectedDrinks, setSelectedDrinks] = useState([]);
    const [drinks, setDrinks] = useState([]);
    const [availableBracelets, setAvailableBracelets] = useState([]);
    const [bracelets, setBracelets] = useState([]);
    const [waiterUsername, setWaiterUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDrinks = async () => {
            try {
                const response = await fetch('http://localhost:8080/discoBracelet/drinks');
                const data = await response.json();
                setDrinks(data);
            } catch (error) {
                console.error("Error fetching drinks:", error);
            }
        };

        const fetchAvailableBracelets = async () => {
            try {
                const response = await fetch('http://localhost:8080/discoBracelet/bracelets');
                const data = await response.json();
                setBracelets(data);
            } catch (error) {
                console.error("Error fetching bracelets:", error);
            }
        };

        fetchDrinks();
        fetchAvailableBracelets();
    }, []);

    const handleAddDrinkField = () => {
        setSelectedDrinks([...selectedDrinks, { drinkId: '', quantity: 1, braceletId: '' }]);
    };
    
    const handleDrinkSelection = (event, index) => {
        const updatedDrinks = [...selectedDrinks];
        updatedDrinks[index] = { ...updatedDrinks[index], drinkId: event.target.value };
        setSelectedDrinks(updatedDrinks);
    };
    
    const handleQuantityChange = (event, index) => {
        const updatedDrinks = [...selectedDrinks];
        updatedDrinks[index] = { ...updatedDrinks[index], quantity: event.target.value };
        setSelectedDrinks(updatedDrinks);
    };
    
    const handleBraceletSelection = (event, index) => {
        const updatedDrinks = [...selectedDrinks];
        updatedDrinks[index] = { ...updatedDrinks[index], braceletId: event.target.value };
        setSelectedDrinks(updatedDrinks);
    };
    

    const handleAssignDrinksToWaiter = async () => {
        try {
            const response = await fetch(`http://localhost:8080/discoBracelet/bracelets/assignDrinksToWaiter/${waiterId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(selectedDrinks),
            });
            if (response.ok) {
                alert("Drinks assigned to waiter successfully!");
                navigate("/waiters");
            } else {
                alert("Failed to assign drinks to waiter.");
            }
        } catch (error) {
            console.error("Error assigning drinks to waiter:", error);
        }
    };

    const handleAssignDrinksToBracelet = async () => {
        try {
            const response = await fetch(`http://localhost:8080/discoBracelet/bracelets/assignDrinksToBracelets/${waiterId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(selectedDrinks),
            });
            if (response.ok) {
                alert("Drinks assigned to bracelets successfully!");
                navigate("/waiters");
            } else {
                alert("Failed to assign drinks to bracelets.");
            }
        } catch (error) {
            console.error("Error assigning drinks to bracelets:", error);
        }
    };

    const handleClearWaiterStock = async () => {
        try {
            const response = await fetch(`http://localhost:8080/discoBracelet/waiters/clearWaiterStock/${waiterId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                alert("Waiter stock cleared successfully!");
                const updatedDrinksResponse = await fetch('http://localhost:8080/discoBracelet/drinks');
                const updatedDrinksData = await updatedDrinksResponse.json();
                setDrinks(updatedDrinksData);
            } else {
                alert("Failed to clear waiter stock.");
            }
        } catch (error) {
            console.error("Error clearing waiter stock:", error);
        }
    };

    const handleClearBracelet = async (braceletId) => {
        try {
            const response = await fetch(`http://localhost:8080/discoBracelet/guests/clearGuest/${braceletId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                alert("Bracelet cleared successfully!");
                const updatedBraceletsResponse = await fetch('http://localhost:8080/discoBracelet/bracelets/availableBracelets');
                const updatedBraceletsData = await updatedBraceletsResponse.json();
                setAvailableBracelets(updatedBraceletsData);
            } else {
                alert("Failed to clear bracelet.");
            }
        } catch (error) {
            console.error("Error clearing bracelet:", error);
        }
    };

    useEffect(() => {
        const fetchWaiterUsername = async () => {
            try {
                const response = await fetch(`http://localhost:8080/discoBracelet/waiters/${waiterId}`);
                const data = await response.json();
                setWaiterUsername(data.username);
            } catch (error) {
                console.error("Error fetching waiter username:", error);
            }
        };

        fetchWaiterUsername();
    }, [waiterId]);

    return (
        <Container>
            <Box>
                <h2>Assign Drinks to Waiter {waiterUsername}</h2>
                {selectedDrinks.map((drink, index) => (
                    <Box key={index} sx={{ marginBottom: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id={`drink-label-${index}`}>Select Drink</InputLabel>
                            <Select
                                labelId={`drink-label-${index}`}
                                value={drink.drinkId}
                                label="Select Drink"
                                onChange={(e) => handleDrinkSelection(e, index)}
                            >
                                {drinks.map((d) => (
                                    <MenuItem key={d.id} value={d.id}>
                                        {d.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            label="Quantity"
                            type="number"
                            value={drink.quantity}
                            onChange={(e) => handleQuantityChange(e, index)}
                            sx={{ marginLeft: 2 }}
                        />


                        <FormControl fullWidth sx={{ marginLeft: 2 }}>
    <InputLabel id={`bracelet-label-${index}`}>Select Bracelet</InputLabel>
    <Select
        labelId={`bracelet-label-${index}`}
        value={drink.braceletId}
        label="Select Bracelet"
        onChange={(e) => handleBraceletSelection(e, index)}
    >
        {bracelets.map((b) => (
            <MenuItem key={b.id} value={b.id}>
                {b.id}
            </MenuItem>
        ))}
    </Select>
</FormControl>

                    </Box>
                ))}
                <Button variant="outlined" onClick={handleAddDrinkField}>
                    Add Another Drink
                </Button>

                <Button variant="contained" onClick={handleAssignDrinksToWaiter} sx={{ marginLeft: 2 }}>
                    Assign Drinks to Waiter
                </Button>

                <Button variant="contained" onClick={handleAssignDrinksToBracelet} sx={{ marginLeft: 2 }}>
                    Assign Drinks to Bracelet
                </Button>

                <Button variant="contained" color="error" onClick={handleClearWaiterStock} sx={{ marginTop: 2 }}>
                    Clear Waiter Stock
                </Button>

                {bracelets.length > 0 && (
    <Box sx={{ marginTop: 2 }}>
        <h3>Clear Bracelet State</h3>
        {bracelets.map((bracelet) => (
            <Button
                key={bracelet.id}
                variant="outlined"
                color="error"
                onClick={() => handleClearBracelet(bracelet.id)}
                sx={{ marginRight: 2 }}
            >
                Clear {bracelet.id}
            </Button>
        ))}
    </Box>
)}

            </Box>
        </Container>
    );
}

export default WaiterWork;
