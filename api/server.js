const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const emailRoutes = require('./routes/emailRoutes');
const surveyRoutes = require('./routes/surveyRoutes');
const teamRoutes = require('./routes/teamRoutes');
const missionRoutes = require('./routes/missionRoutes');
const chatRoutes = require('./routes/chatRoutes'); // Ensure you have chat routes
const setupAssociations = require('./models/relation');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(bodyParser.json());
app.use('/api', authRoutes);
app.use('/api', emailRoutes);
app.use('/api', surveyRoutes);
app.use('/api', teamRoutes);
app.use('/api', missionRoutes);
app.use('/api', chatRoutes);  // Register chat routes

// WebSocket logic
wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (data) => {
        // Broadcast the message to all clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });

    ws.on('close', () => {
        console.log('Connection closed');
    });
});

// Sync all models with the database
sequelize.sync({ force: true }).then(() => {
    console.log('Database synced and associations created');
    server.listen(8000, () => {
        console.log('Server running on http://localhost:8000');
    });
}).catch(err => {
    console.error('Failed to sync database:', err);
});
