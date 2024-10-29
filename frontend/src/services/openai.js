import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true // Note: In production, you should route through your backend
});

const SYSTEM_PROMPT = `You are a helpful restaurant reservation assistant. You help customers make reservations at our restaurants. 
Here are the steps you should follow:
1. Greet the customer and ask which restaurant they'd like to book
2. Ask for the number of guests
3. Ask for the preferred date and time
4. Confirm all details before making the reservation
5. Be polite and professional at all times`;

export async function getChatResponse(messages) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                ...messages
            ],
            temperature: 0.7,
            max_tokens: 150
        });

        return response.choices[0].message;
    } catch (error) {
        console.error('OpenAI API Error:', error);
        throw error;
    }
}

export function extractReservationDetails(conversation) {
    // This function will parse the conversation to extract reservation details
    // You might want to use OpenAI for this as well
    // For now, returning a basic structure
    return {
        restaurant_name: '',
        customer_name: '',
        date: '',
        time: '',
        guests: 0
    };
}