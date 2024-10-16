import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const OverviewBracelets = () => {
  const { braceletId } = useParams();
  const [drinks, setDrinks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBraceletDrinks = async () => {
      try {
        const response = await fetch(`http://localhost:8080/discoBracelet/bracelets/bracelet/${braceletId}/drinks`);
        if (response.ok) {
          const data = await response.json();
          setDrinks(data);
        } else {
          throw new Error('Failed to fetch drinks for this bracelet');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      }
    };

    fetchBraceletDrinks();
  }, [braceletId]);

  if (error) return <div>Error: {error}</div>;
  if (!drinks || drinks.length === 0) return <div>No drinks ordered for this bracelet.</div>;


const totalPrice = drinks.reduce((total, drink) => total + (drink.quantity || 0) * (drink.drinkPrice || 0), 0).toFixed(2);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Overview for Bracelet {braceletId}
      </Typography>
      <Box>
        <Typography variant="h6">Ordered Drinks</Typography>
        <List>
        {drinks.map(drink => (
  <ListItem key={drink.drinkId}>
    <ListItemText
      primary={`Drink ID: ${drink.drinkId} - ${drink.drinkName}`}
      secondary={`Quantity: ${drink.quantity}, Price per unit: $${drink.drinkPrice.toFixed(2)}`}
    />
  </ListItem>
))}
          {/* {drinks.map(drink => (
            <ListItem key={drink.id}>
              <ListItemText
                primary={`Drink ID: ${drink.id} - ${drink.name}`}
                secondary={`Quantity: ${drink.quantity || 0}, Price per unit: $${(drink.price || 0).toFixed(2)}`}
              />
            </ListItem>
          ))} */}
        </List>
        <Typography variant="h6">Total Price: ${totalPrice}</Typography>
      </Box>
    </Container>
  );
};

export default OverviewBracelets;
