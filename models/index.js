import { Schema, model } from 'mongoose';

// Definir esquemas y modelos
const roomSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  createdAt: { type: Date, default: Date.now }
});

const messageSchema = new Schema({
  room: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Room = model('Room', roomSchema);
const Message = model('Message', messageSchema);

export { Room, Message }; 