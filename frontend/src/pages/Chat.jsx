import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Input,
  Button,
  Text,
  Container,
  Divider,
  useToast
} from '@chakra-ui/react';
import { getChatResponse, extractReservationDetails } from '../services/openai';

function Chat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I can help you make a restaurant reservation. Which restaurant would you like to book?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const [currentReservation, setCurrentReservation] = useState({
    restaurant_name: '',
    customer_name: '',
    date: '',
    time: '',
    guests: 0
  });

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Get response from OpenAI
      const aiResponse = await getChatResponse(messages.concat(userMessage));
      
      // Add AI response to chat
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: aiResponse.content 
      }]);

      // Try to extract reservation details
      const updatedReservation = extractReservationDetails([...messages, userMessage, aiResponse]);
      if (updatedReservation) {
        setCurrentReservation(prev => ({
          ...prev,
          ...updatedReservation
        }));

        // If we have all necessary details, make the reservation
        if (isReservationComplete(updatedReservation)) {
          await makeReservation(updatedReservation);
        }
      }

    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process your message. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isReservationComplete = (reservation) => {
    return reservation.restaurant_name && 
           reservation.customer_name && 
           reservation.date && 
           reservation.time && 
           reservation.guests > 0;
  };

  const makeReservation = async (reservationDetails) => {
    try {
      const response = await fetch('http://localhost:3000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationDetails),
      });

      if (!response.ok) throw new Error('Failed to make reservation');

      toast({
        title: 'Success!',
        description: 'Your reservation has been confirmed.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to make reservation. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Container maxW="container.md" h="calc(100vh - 200px)">
      <VStack h="100%" spacing={4}>
        <Box
          flex="1"
          w="100%"
          overflowY="auto"
          bg="white"
          p={4}
          borderRadius="md"
          boxShadow="sm"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              bg={message.role === 'user' ? 'blue.50' : 'gray.50'}
              p={3}
              borderRadius="md"
              mb={2}
              alignSelf={message.role === 'user' ? 'flex-end' : 'flex-start'}
            >
              <Text>{message.content}</Text>
            </Box>
          ))}
        </Box>
        
        <Divider />
        
        <HStack w="100%">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            disabled={isLoading}
          />
          <Button
            colorScheme="blue"
            onClick={handleSendMessage}
            isLoading={isLoading}
            loadingText="Sending"
          >
            Send
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
}

export default Chat;