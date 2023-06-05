const express = require('express');
const app = express();

// Démarrer le serveur sur le port 3000
app.listen(3000, () => {
  console.log('Le serveur écoute sur le port 3000...');
});


const port = 3000;
app.listen(port, () => {
  console.log(`Le serveur est en écoute sur le port ${port}.`);
});
