const app = require('express')();

// Importer les fichiers des routes des utilisateurs
const userRoutes = require('./routes/userRoutes');
const conversationRoutes = require('./repositories/conversationRepository');
const messageRoutes = require('./repositories/messageRepository');

// Charger les routes des utilisateurs
app.use('/users', userRoutes);
app.use('/conversations', conversationRoutes);
app.use('/messages', messageRoutes);

// Démarrer le serveur sur le port 3000
app.listen(3000, () => {
  console.log('Le serveur écoute sur le port 3000...');
});


