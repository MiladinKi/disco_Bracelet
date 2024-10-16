import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import ShowBracelet from './ShowBracelet';

const ShowBracelets = () => {
  const [bracelets, setBracelets] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBracelets = async () => {
      try {
        const response = await fetch("http://localhost:8080/discoBracelet/bracelets");
        if (response.ok) {
          const data = await response.json();
          setBracelets(data);
        } else {
          console.error('Failed to fetch bracelets');
        }
      } catch (error) {
        console.error('Error fetching bracelets:', error);
      }
    };

    fetchBracelets();
  }, []);

  const filteredBracelet = bracelets.filter((d) =>
    d.manufacturer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "end", marginBottom: 3 }}>
        <TextField
          size="small"
          id="outlined-search"
          label="Pretraga po proizvođaču"
          type="search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained" className="search_button">
          Search
        </Button>
        <Button variant="contained" className="add_button">
          <NavLink to="add_new_bracelet">Add bracelet</NavLink>
        </Button>
      </Box>
      <Box>
        {filteredBracelet.map((d) => (
          <Box key={d.id} sx={{ marginBottom: 2 }}>
            <ShowBracelet bracelet={d} />
            <Button
              variant="outlined"
              component={NavLink}
              to={`/overviewBracelets/${d.id}`}
              sx={{ marginTop: 1 }}
            >
              View Details
            </Button>
          </Box>
        ))}
      </Box>
      <Box>
      <Button variant="contained" className="available_button">
    <NavLink to="/availableBracelets">Available Bracelets</NavLink>
</Button>

      </Box>
    </Container>
  );
};

export default ShowBracelets;
