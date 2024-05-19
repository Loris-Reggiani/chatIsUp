const express = require('express');
const router = express.Router();
const Mission = require('../models/Mission');

// Route to create a new mission
router.post('/missions', async (req, res) => {
    const { title, description, email } = req.body; // Include email in your request
    try {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const newMission = await Mission.create({
            title,
            description,
            UserId: user.id
        });
        res.status(201).json(newMission);
    } catch (error) {
        console.error('Error creating mission:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to get all missions
router.get('/missions', async (req, res) => {
    try {
        const missions = await Mission.findAll({
            // include: [{ model: Team }] // Include the team information with each mission
        });
        res.status(200).json(missions);
    } catch (error) {
        console.error('Failed to retrieve missions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
