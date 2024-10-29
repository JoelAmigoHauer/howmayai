import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Link, Heading } from '@chakra-ui/react';

function NavBar() {
  return (
    <Box bg="blue.500" px={4} py={4}>
      <Flex maxW="container.xl" mx="auto" align="center" justify="space-between">
        <Heading as="h1" size="lg" color="white">
          <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
            HOWMAYAI
          </Link>
        </Heading>
        <Flex gap={6}>
          <Link as={RouterLink} to="/" color="white" fontWeight="medium">
            Home
          </Link>
          <Link as={RouterLink} to="/chat" color="white" fontWeight="medium">
            Make Reservation
          </Link>
          <Link as={RouterLink} to="/admin" color="white" fontWeight="medium">
            Admin
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}

export default NavBar;