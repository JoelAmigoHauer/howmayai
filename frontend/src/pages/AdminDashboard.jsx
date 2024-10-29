import React, { useState, useEffect } from 'react';
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Button,
  useToast,
  SimpleGrid,
  Text,
  Badge
} from '@chakra-ui/react';

function AdminDashboard() {
  const [restaurants, setRestaurants] = useState([]);
  const [reservations, setReservations] = useState([]);
  const toast = useToast();

  useEffect(() => {
    // Fetch restaurants
    fetch('http://localhost:3000/api/restaurants')
      .then(res => res.json())
      .then(data => setRestaurants(data))
      .catch(error => {
        console.error('Error fetching restaurants:', error);
        toast({
          title: 'Error',
          description: 'Failed to load restaurants',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });

    // TODO: Add API endpoint and fetch reservations
    // For now, using sample data
    setReservations([
      {
        id: 1,
        restaurant_name: "Pizza Paradise",
        customer_name: "John Doe",
        date: "2024-10-30",
        time: "18:00",
        guests: 2
      }
    ]);
  }, []);

  return (
    <Box>
      <Heading mb={6}>Admin Dashboard</Heading>
      
      <Tabs>
        <TabList>
          <Tab>Restaurants</Tab>
          <Tab>Reservations</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {restaurants.map(restaurant => (
                <Box 
                  key={restaurant.id}
                  p={5}
                  shadow="md"
                  borderWidth="1px"
                  borderRadius="lg"
                >
                  <Heading size="md" mb={2}>{restaurant.name}</Heading>
                  <Text>Hours: {restaurant.openingHours}</Text>
                  <Text>Location: {restaurant.location}</Text>
                  <Text mb={3}>
                    Specialties: {JSON.parse(restaurant.specialties).join(', ')}
                  </Text>
                  <Button size="sm" colorScheme="blue">Edit</Button>
                </Box>
              ))}
            </SimpleGrid>
          </TabPanel>

          <TabPanel>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Restaurant</Th>
                  <Th>Customer</Th>
                  <Th>Date</Th>
                  <Th>Time</Th>
                  <Th>Guests</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {reservations.map(reservation => (
                  <Tr key={reservation.id}>
                    <Td>{reservation.id}</Td>
                    <Td>{reservation.restaurant_name}</Td>
                    <Td>{reservation.customer_name}</Td>
                    <Td>{reservation.date}</Td>
                    <Td>{reservation.time}</Td>
                    <Td>{reservation.guests}</Td>
                    <Td>
                      <Badge colorScheme="green">Confirmed</Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default AdminDashboard;