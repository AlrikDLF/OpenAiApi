// Identification afin de récupérer un token JWT
const jwt = require('jsonwebtoken');
const { sign } = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

router.use(express.json());

router.post('/auth', (req, res) => {
  // Récupérer les informations d'identification depuis le corps de la requête
  const { username, password } = req.body;

  // Vérifier les informations d'identification (exemple simplifié)
  if (username === 'admin' && password === 'password') {
    // Créer un payload pour le token JWT
    const payload = {
      username: username
    };

    function generateSecretKey(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let secretKey = '';
      
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        secretKey += characters.charAt(randomIndex);
      }
      
      return secretKey;
    }
    
    secretKey = generateSecretKey(32); // Génère une clé secrète de 32 caractères aléatoires

    // Générer le token JWT avec une clé secrète
    const secretKey = 'your_secret_key';
    const token = jwt.sign(payload, secretKey);

    // Retourner le token JWT dans la réponse
    res.json({ token: token });
  } else {
    // Les informations d'identification sont invalides
    res.status(401).json({ error: 'Identifiants invalides' });
  }
});

module.exports = router;