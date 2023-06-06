// Identification afin de récupérer un token JWT
import { sign } from 'jsonwebtoken';

app.post('/auth', (req, res) => {
  // Récupérer les informations d'identification depuis le corps de la requête
  const { username, password } = req.body;

  // Vérifier les informations d'identification (exemple simplifié)
  if (username === 'admin' && password === 'password') {
    // Créer un payload pour le token JWT
    const payload = {
      username: username
    };

    // Générer le token JWT avec une clé secrète
    const token = sign(payload, 'your_secret_key');

    // Retourner le token JWT dans la réponse
    res.json({ token: token });
  } else {
    // Les informations d'identification sont invalides
    res.status(401).json({ error: 'Identifiants invalides' });
  }
});
