import { Router } from 'express';
const router = Router();
import { Room, Message } from '../models/index.js';

// Rutas API
router.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: 1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/rooms', async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    await newRoom.save();
    console.log('Nueva sala creada:', newRoom);
    req.app.get('io').emit('room_created', newRoom); // Notificar a todos los clientes
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/rooms/:roomId/messages', async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.roomId })
      .sort({ date: 1 })
      .limit(50); // Limitar cantidad de mensajes
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router; 