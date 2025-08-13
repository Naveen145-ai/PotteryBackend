const express = require('express');
const http = require('http'); // Needed for Socket.IO
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

const connectDataBase = require('./config/connectDataBase');
const authRoute = require('./routes/authRoute');
const potRoute = require('./routes/potRoute');
const orderRoute = require('./routes/orderRoutes');

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

const app = express();
const server = http.createServer(app); // Create server for Socket.IO

// Create Socket.IO instance
const io = new Server(server, {
  cors: {
    origin: '*', // you can set to your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

connectDataBase();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Attach io so controllers can access it
app.set('io', io);

// Routes
app.use('/api/v1', authRoute);
app.use('/api/v1', potRoute);
app.use('/api/v1', orderRoute);
// Socket.IO connection
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
