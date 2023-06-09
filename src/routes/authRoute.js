const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const OPENAI_API_KEY = require('./.env');

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

    const secretKey = OPENAI_API_KEY;

    // Générer le token JWT
    const token = jwt.sign(payload, secretKey);

    res.json({ token });
  } else {
    res.status(401).json({ error: 'Identifiants invalides' });
  }
});

// Middleware pour vérifier le JWT dans les routes protégées
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'JWT manquant' });
  }

  const secretKey = OPENAI_API_KEY;

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'JWT invalide' });
    }

    // Ajoutez les informations du JWT décodé à l'objet de requête pour une utilisation ultérieure
    req.user = decoded;

    next();
  });
}

module.exports = router;