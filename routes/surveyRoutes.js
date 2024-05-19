// routes/surveyRoutes.js
const express = require('express');
const SurveyResponse = require('../models/SurveyResponse');
const router = express.Router();

// Route to submit a new survey response
router.post('/survey-responses', async (req, res) => {
    const { occupation, rating, experience, source, feedback } = req.body;
    try {
        const newResponse = await SurveyResponse.create({
            occupation,
            rating,
            experience,
            source,
            feedback
        });
        res.status(201).json(newResponse);
    } catch (error) {
        console.error('Failed to save survey response:', error);
        res.status(500).json({ error: 'Failed to save survey response' });
    }
});

// Route to get all survey responses
router.get('/survey-responses', async (req, res) => {
    try {
        const responses = await SurveyResponse.findAll();
        res.status(200).json(responses);
    } catch (error) {
        console.error('Failed to retrieve survey responses:', error);
        res.status(500).json({ error: 'Failed to retrieve survey responses' });
    }
});

module.exports = router;
