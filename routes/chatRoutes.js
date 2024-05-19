const express = require('express');
const ChatMessage = require('../models/ChatMessage');
const Team = require('../models/Team'); // Assuming you're exporting directly as in ChatMessage

const router = express.Router();

// api/routes/chatRoutes.js
router.post('/messages', async (req, res) => {
    const { message, teamId, memberId } = req.body;  // Include memberId
    try {
        const newMessage = await ChatMessage.create({
            message,
            sender_info: memberId,  // Save memberId as sender_info or use a separate field
            TeamId: teamId,
            memberId: memberId  // Make sure to save memberId
        });
        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Failed to send message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// api/routes/chatRoutes.js
router.get('/messages/:teamId', async (req, res) => {
    const { teamId } = req.params;
    try {
        const messages = await ChatMessage.findAll({
            where: { TeamId: teamId },
            include: [{
                model: Team,
                as: 'team'  // Use the alias defined in your association
            }]
        });
        res.status(200).json(messages);
    } catch (error) {
        console.error('Failed to retrieve messages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
