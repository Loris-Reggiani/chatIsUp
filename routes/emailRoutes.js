const express = require('express');
const router = express.Router();
const { sendEmail } = require('../models/sendEmail');
const User = require('../models/User');  // Import the User model to access user data

router.post('/send-survey-email', async (req, res) => {
    const { subject, text, html } = req.body;

    try {
        const users = await User.findAll(); // Fetch all users from the database

        // Loop through all users and send an email to each one
        const emailPromises = users.map(user => 
            sendEmail({
                to: user.email,
                from: 'reggi002@cougars.csusm.edu',
                subject: subject,
                text: text,
                html: html,
                templateId: 'd-9e7c66a0eca8416c84018012de0e61a3',
                dynamicTemplateData: {
                    username: user.username,
                    email: user.email,
                    text: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.",
                }
            })
        );

        // Await all the sendEmail promises
        await Promise.all(emailPromises);
        res.status(200).send({ message: 'Emails sent successfully' });
    } catch (error) {
        console.error('Failed to send emails:', error);
        res.status(500).send({ error: 'Failed to send email' });
    }
});

module.exports = router;
