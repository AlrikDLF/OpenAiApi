const app = require('express')();
const mysql = require('mysql');
const db = require('./db');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware/authentification');

// Middleware global d'authentification pour toutes les routes
app.use(authMiddleware);

// Importer les fichiers des routes des utilisateurs
const userRepository = require('./repositories/userRepository');
const conversationRepository = require('./repositories/conversationRepository');
const messageRepository = require('./repositories/messageRepository');
const universeRepository = require('./repositories/universeRepository');
const userRoutes = require('./routes/userRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const universeRoutes = require('./routes/universeRoutes');

// Charger les routes 
app.use('/users', userRoutes);
app.use('/conversations', conversationRoutes);
app.use('/universes', universeRoutes);

// Démarrer le serveur sur le port 3000
app.listen(3000, () => {
  console.log('Le serveur écoute sur le port 3000...');
});