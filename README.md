# Sellia Chat API

Este proyecto es una API de chat construida con Node.js, Express, Socket.IO y MongoDB.

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm (gestor de paquetes de Node.js)
- Una instancia de MongoDB (puedes usar MongoDB Atlas para una base de datos en la nube)

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd sellia-chat-api
   ```

2. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto y añade tu URI de conexión a MongoDB (la URI que se utilizó en el proyecto es de MongoDB Atlas y está adjunta en el correo electrónico enviado a Luis):

   ```env
   MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/?retryWrites=true&w=majority
   ```

2. Asegúrate de que el archivo `index.js` esté configurado para usar tu URI de MongoDB desde el archivo `.env`.

## Ejecución

1. Inicia el servidor:

   ```bash
   npm run start
   ```

2. El servidor debería estar corriendo en `http://localhost:5000`.

## Uso

- Puedes interactuar con la API usando herramientas como Postman o cURL.
- Las rutas principales son:
  - `GET /api/rooms`: Obtiene todas las salas de chat.
  - `POST /api/rooms`: Crea una nueva sala de chat.
  - `GET /api/rooms/:roomId/messages`: Obtiene los mensajes de una sala específica.
