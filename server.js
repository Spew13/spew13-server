const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.get('/', (req, res) => {
  res.send('Spew13 Socket.IO Server running');
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('adminCommand', (data) => {
    io.emit('executeCommand', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
