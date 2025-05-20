// Importar módulos
import express, { json } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connect } from 'mongoose';
import cors from 'cors';
import { Room, Message } from './models/index.js';
import dotenv from 'dotenv';

// Importar rutas y sockets
import apiRoutes from './routes/api.js';
import socketHandler from './sockets/socketHandler.js';

dotenv.config();

// Configurar Express
const app = express();
app.use(json());
app.use(cors());

// Usar rutas API
app.use('/api', apiRoutes);

// Crear servidor HTTP y configurar Socket.IO
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // En producción, limitar a tu dominio
    methods: ['GET', 'POST']
  }
});

// Conectar a MongoDB
const connectToMongoDB = async () => {
  try {
    await connect(process.env.MONGODB_URI, {
      dbName: 'sellia-chat',
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conectado a MongoDB');
  } catch (err) {
    console.error('Error al conectar a MongoDB:', err);
  }
};
connectToMongoDB();

// Rutas API
app.get('/api/rooms', async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: 1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/rooms', async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    await newRoom.save();
    console.log('Nueva sala creada:', newRoom);
    io.emit('room_created', newRoom); // Notificar a todos los clientes
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/rooms/:roomId/messages', async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.roomId })
      .sort({ date: 1 })
      .limit(50); // Limitar cantidad de mensajes
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Manejar conexiones de Socket.IO
socketHandler(io);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
