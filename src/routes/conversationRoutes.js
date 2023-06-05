// Récupération des conversations en cours qui renvoie aussi l'ID du personnage et de l'univers
app.get('/conversations', (req, res) => {
    // Logique pour la récupération des conversations en cours
  });
  
  // Création d'une nouvelle conversation avec un personnage
  app.post('/conversations', (req, res) => {
    // Logique pour la création d'une nouvelle conversation avec un personnage
  });
  
  // Récupération d'une conversation avec le personnage et l'univers complet
  app.get('/conversations/:x', (req, res) => {
    // Logique pour la récupération d'une conversation avec le personnage et l'univers complet
  });
  
  // Suppression d'une conversation avec un personnage
  app.delete('/conversations/:x', (req, res) => {
    // Logique pour la suppression d'une conversation avec un personnage
  });
  
  // Récupération de l'historique des messages d'une conversation
  app.get('/conversations/:x/messages', (req, res) => {
    // Logique pour la récupération de l'historique des messages d'une conversation
  });
  
  // Envoi d'un nouveau message dans la conversation
  app.post('/conversations/:x/messages', (req, res) => {
    // Logique pour l'envoi d'un nouveau message dans la conversation
  });
  
  // Regénération du dernier message d'une conversation
  app.put('/conversations/:x', (req, res) => {
    // Logique pour la régénération du dernier message d'une conversation
  });