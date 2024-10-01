const prompt = require('./prompt');  // Ensure this exports a valid string
const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Initialize OpenAI client
const openai = new OpenAI({
    // apiKey: process.env.OPENAI_API_KEY, 
});

app.use(bodyParser.json());

app.use(cors());

// Function to get response from OpenAI
async function getResponse(user_input) {
    
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{
                role: 'user',
                content: `${prompt} \n\n Here's what the user has chosen: ${user_input}`,
            }],
            max_tokens: 100,
            temperature: 0.7,
        });

        return response.choices[0].message.content;

    } catch (error) {
        console.error('Error fetching OpenAI API response:', error.response ? error.response.data : error.message);
        throw new Error('Failed to get response from OpenAI API');
    }
}

async function generatePhrases() {
    try {
        const phrases = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{
                role: 'user',
                content: "Please provide exactly 8 concise phrases that describe symptoms of psychological distress. Do not include any explanations, definitions, or additional information. Format the output as a simple numbered list. Additionally, do not number or bullet them.",
            }],
            max_tokens: 5,
            temperature: 0.8,
        });
        return phrases.choices[0].message.content;
    } catch (error) {
        console.error('Error fetching OpenAI API response:', error.response ? error.response.data : error.message);
        throw new Error('Failed to get response from OpenAI API');
    }
}

app.get('/api', (req, res) => {
    return res.json("Hey there");
});

app.get('/api/phrases', (req, res) => {
    return res.json("here's the phrases api")
})

// POST route to retrieve phrases and return AI response
app.post('/api/phrases', async (req, res) => {
    // const concern = req.body;
    // if (!concern) {
    //     return res.status(400).json({ error: 'User concern is required' });
    // }
    try {
        const aiResponse = await generatePhrases();

        res.json({
            success: true,
            response: aiResponse
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// POST route to handle user input and return AI response
app.post('/api', async (req, res) => {
    const { concern } = req.body;

    if (!concern) {
        return res.status(400).json({ error: 'User concern is required' });
    }

    try {
        const aiResponse = await getResponse(concern);

        res.json({
            success: true,
            response: aiResponse
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Listening on the defined port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
