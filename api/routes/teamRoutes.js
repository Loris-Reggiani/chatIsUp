const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize'); // Add this line
const Team = require('../models/Team');
const User = require('../models/User');

router.post('/teams', async (req, res) => {
    const { name, emails } = req.body; // Expect a list of emails
    try {
        // Ensure emails is an array and not undefined or empty
        if (!Array.isArray(emails) || emails.length === 0) {
            return res.status(400).json({ message: "Invalid or missing email list" });
        }
        const users = await User.findAll({
            where: { email: { [Sequelize.Op.in]: emails } }
        });

        if (!users.length) {
            return res.status(404).json({ message: "No users found with these emails" });
        }

        const newTeam = await Team.create({ name });
        console.log(Object.getOwnPropertyNames(newTeam.__proto__)); // For debugging
        if (!newTeam) {
            return res.status(400).json({ message: "Failed to create a new team" });
        }

        // Using addMember instead of addUser
        for (const user of users) {
            await newTeam.addMember(user);
        }

        res.status(201).json({
            message: 'Team created successfully',
            team: {
                id: newTeam.id,
                name: newTeam.name,
                members: users.map(user => ({
                    id: user.id,
                    username: user.username,
                    email: user.email
                }))  // Returning user details
            }
        });
    } catch (error) {
        console.error('Error creating team:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// GET route to fetch all teams with their members
router.get('/teams', async (req, res) => {
    try {
        const teams = await Team.findAll({
            include: [{
                model: User,
                as: 'members', // Correct alias as per association definition
                attributes: ['id', 'username', 'email'],
                through: {
                    attributes: [] // Do not return join table attributes
                }
            }]
        });

        res.status(200).json(teams);
    } catch (error) {
        console.error('Failed to retrieve teams:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
