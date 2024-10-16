import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';

const AvailableBracelets = () => {
    const [availableBracelets, setAvailableBracelets] = useState([]);
    const [availableCount, setAvailableCount] = useState(0);

    // Fetch available bracelets
    useEffect(() => {
        const fetchAvailableBracelets = async () => {
            try {
                const response = await fetch('http://localhost:8080/discoBracelet/bracelets/availableBracelets');
                if (response.ok) {
                    const data = await response.json();
                    setAvailableBracelets(data);
                } else {
                    console.error('Failed to fetch available bracelets');
                }
            } catch (error) {
                console.error('Error fetching available bracelets:', error);
            }
        };

        const fetchAvailableBraceletsCount = async () => {
            try {
                const response = await fetch('http://localhost:8080/discoBracelet/bracelets/availableBracelets/count');
                if (response.ok) {
                    const count = await response.json();
                    setAvailableCount(count);
                } else {
                    console.error('Failed to fetch available bracelets count');
                }
            } catch (error) {
                console.error('Error fetching available bracelets count:', error);
            }
        };

        fetchAvailableBracelets();
        fetchAvailableBraceletsCount();
    }, []);

    return (
        <Container>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
                Available Bracelets
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: 3 }}>
                Number of available bracelets: {availableCount}
            </Typography>

            {availableBracelets.length === 0 ? (
                <Typography>No available bracelets</Typography>
            ) : (
                availableBracelets.map((bracelet) => (
                    <Box key={bracelet.id} sx={{ marginBottom: 2 }}>
                        <Typography>Bracelet ID: {bracelet.id}</Typography>
                        <Typography>Manufacturer: {bracelet.manufacturer}</Typography>
                        {/* Add more bracelet details here if needed */}
                    </Box>
                ))
            )}
        </Container>
    );
};

export default AvailableBracelets;
