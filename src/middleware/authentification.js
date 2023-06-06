const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  // Récupérer le token JWT depuis les en-têtes de la requête
  const token = req.headers.authorization;

  // Vérifier si le token est présent
  if (token) {
    try {
      // Vérifier et décoder le token JWT avec la clé secrète
      const decoded = jwt.verify(token, 'your_secret_key');

      // Ajouter les informations d'identification du token à l'objet de requête (req)
      req.user = decoded;

      // Appeler la fonction next() pour passer au middleware suivant
      next();
    } catch (error) {
      // Le token est invalide ou a expiré
      res.status(401).json({ error: 'Token invalide' });
    }
  } else {
    // Aucun token n'est présent
    res.status(401).json({ error: 'Token manquant' });
  }
}

module.exports = authMiddleware;
