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

// Manejar conexiones de Socket.IO
socketHandler(io);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
