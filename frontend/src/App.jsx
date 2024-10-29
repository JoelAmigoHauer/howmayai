import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Box, Container } from '@chakra-ui/react';

// Pages
import Home from './pages/Home';
import Chat from './pages/Chat';
import AdminDashboard from './pages/AdminDashboard';

// Components
import NavBar from './components/NavBar';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Box minH="100vh" bg="gray.50">
          <NavBar />
          <Container maxW="container.xl" py={8}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;