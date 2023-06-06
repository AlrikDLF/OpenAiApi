const mysql = require('mysql');

// Configuration de la connexion à la base de données
const connection = mysql.createConnection({
  host: 'localhost',     // L'hôte de la base de données
  port: '8889',  // Le port de votre base de données
  user: 'root', // Votre nom d'utilisateur MySQL
  password: 'S(uhv1d[VbUpWjei', // Votre mot de passe MySQL
  database: 'api_project'  // Le nom de votre base de données
});

// Établir la connexion à la base de données
connection.connect((error) => {
  if (error) {
    console.error('Erreur lors de la connexion à la base de données :', error);
  } else {
    console.log('Connexion à la base de données établie.');
  }
});

// Exporter la connexion pour pouvoir l'utiliser dans d'autres fichiers
module.exports = connection;