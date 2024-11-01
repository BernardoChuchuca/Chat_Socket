// Importar las dependencias
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
    }
});

// Definir la ruta GET en la raíz del servidor
app.use(express.static('public'));

// Manejar conexiones de Socket.IO
io.on('connection', (socket) => {
    console.log(`Nuevo cliente conectado: ${socket.id}`);

  // Escucha mensajes de los clientes
  socket.on('message', (message) => {
    socket.broadcast.emit('message', message);  // Emite a todos excepto al emisor
  });

  // Detecta cuando un cliente se desconecta
    socket.on('disconnect', () => {
    console.log(`Cliente desconectado: ${socket.id}`);
    });
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});