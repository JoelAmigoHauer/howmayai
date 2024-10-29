import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Input,
  Button,
  Text,
  Container,
  // Divider is commented out until we verify all imports
  // Divider,
  useToast
} from '@chakra-ui/react';

function Chat() {
  const [messages, setMessages] = useState([
    {
      role: 'system',
      content: 'Hello! I can help you make a restaurant reservation. Which restaurant would you like to book?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Simulate AI response for now
      setTimeout(() => {
        const aiResponse = {
          role: 'assistant',
          content: `I understand you'd like to make a reservation. Let me help you with that.`
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process your message. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
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
        
        <Box w="100%" borderTop="1px" borderColor="gray.200" pt={4}>
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
        </Box>
      </VStack>
    </Container>
  );
}

export default Chat;