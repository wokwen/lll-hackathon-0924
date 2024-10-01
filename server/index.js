const prompt = require('./prompt');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();
const OpenAIApi = require('openai');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAIApi({
    apiKey: OPENAI_API_KEY
});

async function getResponse(user_input) {

    if (!OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY is not defined in .env');
    }

    try {
        const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{
                    role: 'user',
                    content: `${prompt} \n\n Here's what the user has chosen: ${user_input}`
                }],
                max_tokens: 100,
                temperature: 0.7,
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data.choices[0].message.content;

    } catch (error) {
        console.error('Error fetching OpenAI API response:', error.response ? error.response.data : error.message);
        throw new Error('Failed to get response from OpenAI API');
    }
}

app.post('/api', async (req, res) => {
    const { concern } = "Hey there";

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
