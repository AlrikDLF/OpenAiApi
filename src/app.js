const app = require('express')();
const mysql = require('mysql');
const db = require('./db');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware/authentification');
const { Configuration, OpenAIApi } = require("openai");


// Middleware global d'authentification pour toutes les routes
//app.use(authMiddleware);

// Importer les fichiers des routes des utilisateurs
const userRepository = require('./repositories/userRepository');
const conversationRepository = require('./repositories/conversationRepository');
const messageRepository = require('./repositories/messageRepository');
const universeRepository = require('./repositories/universeRepository');
const userRoutes = require('./routes/userRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const universeRoutes = require('./routes/universeRoutes');
const characterRoutes = require('./routes/characterRoutes');

// Config openai
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Middleware global pour parser les requêtes en JSON
const express = require('express');


// Charger les routes 
app.use(express.json());
app.use('/users', userRoutes);
app.use('/characters', characterRoutes);
app.use('/universes', universeRoutes);
app.use('/conversations', conversationRoutes);

// Envoi d'un message à OpenAi©©
/* function sendMessage(message){
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: message,
    temperature: 0,
    max_tokens: 150,
    top_p: 1.0,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
    stop: ["You:"],
  });
  return response.data.choices[0].text;
} */


// Démarrer le serveur sur le port 3000
app.listen(3000, () => {
  console.log('Le serveur écoute sur le port 3000...');
});