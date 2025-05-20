import { Message } from '../models/index.js';

export default (io) => {
  io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado:', socket.id);

    // Unirse a una sala
    socket.on('join_room', async (roomId) => {
      if (socket.roomId) {
        socket.leave(socket.roomId);
      }
      socket.join(roomId);
      socket.roomId = roomId;
      console.log(`Cliente ${socket.id} se unió a la sala ${roomId}`);
    });

    // Enviar mensaje
    socket.on('send_message', async (messageData) => {
      try {
        const { room, author, content } = messageData;
        const newMessage = new Message({ room, author, content });
        await newMessage.save();
        console.log('Mensaje guardado y emitido:', newMessage);
        io.to(room).emit('new_message', newMessage);
      } catch (error) {
        console.error('Error al guardar mensaje:', error);
        socket.emit('error', { message: 'Error al enviar mensaje' });
      }
    });

    // Manejar desconexión
    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
    });
  });
}; 