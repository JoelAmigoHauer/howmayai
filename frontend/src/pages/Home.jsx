import React, { useEffect, useState } from "react";
import { Box, Heading, SimpleGrid, Text, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function Home() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/restaurants")
      .then(res => res.json())
      .then(data => setRestaurants(data))
      .catch(error => console.error("Error fetching restaurants:", error));
  }, []);

  return (
    <Box>
      <Heading mb={6}>Welcome to HOWMAYAI Restaurant Reservations</Heading>
      <Text fontSize="lg" mb={8}>
        Choose from our select restaurants and make a reservation through our AI-powered chat interface.
      </Text>
      
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {restaurants.map(restaurant => (
          <Box 
            key={restaurant.id} 
            p={6} 
            bg="white" 
            shadow="md" 
            borderRadius="lg"
          >
            <Heading size="md" mb={3}>{restaurant.name}</Heading>
            <Text mb={2}>Hours: {restaurant.openingHours}</Text>
            <Text mb={2}>Location: {restaurant.location}</Text>
            <Text mb={4}>
              Specialties: {JSON.parse(restaurant.specialties).join(", ")}
            </Text>
            <Button
              as={RouterLink}
              to="/chat"
              colorScheme="blue"
              width="full"
            >
              Make Reservation
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default Home;