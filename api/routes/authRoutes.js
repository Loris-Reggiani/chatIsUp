// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Team = require('../models/Team');
const Mission = require('../models/Mission');
const { sendEmail } = require('../models/sendEmail');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role
        });

        // Send welcome email after successful registration
        await sendEmail({
            to: email,
            from: 'reggi002@cougars.csusm.edu', // Your verified sender email address
            templateId: 'd-791209ddcfb545169c2ff33e8c386400',
            dynamicTemplateData: {
                username: username,
                email: email,
                text: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.",
            }
        });

        res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: 'Email already in use. Please use a different email.' });
        }
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
});
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }
        const jwt = require('jsonwebtoken');
        const payload = { userId: user.id, email: user.email };
        const token = jwt.sign(payload, '', { algorithm: 'none' });
                bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                res.status(200).json({ message: 'Authentication successful', token: token });
            } else {
                res.status(401).json({ message: 'Authentication failed. Passwords did not match.' });
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// GET route to fetch all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'email', 'role']  // Select specific fields to return
        });
        res.json(users);
    } catch (error) {
        console.error('Failed to retrieve users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// In routes/authRoutes.js
router.get('/user', async (req, res) => {
    const { email } = req.query; // Now using query params
    if (!email) {
        return res.status(400).json({ message: "Email address is required." });
    }
    try {
        const user = await User.findOne({
            where: { email: email },
            include: [
                {
                    model: Team,
                    as: 'teams',
                    include: [{
                        model: User,
                        as: 'members',
                        attributes: ['id', 'username', 'email'],
                        through: {
                            attributes: []
                        }
                    }]
                }
            ]
        });

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found." });
        }
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({ error: 'Error retrieving user' });
    }
});



router.delete('/user', async (req, res) => {
    const { email } = req.body; // Now taking email from the request body
    if (!email) {
        return res.status(400).json({ message: 'Email address is required.' });
    }

    try {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found with the provided email.' });
        }

        await user.destroy();
        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router;
