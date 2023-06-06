const UserRepository = require('../repositories/userRepository');
userRepository = new UserRepository();
const { Router } = require('express');
const router = Router();

// Création d'un nouvel utilisateur
router.post('/users', (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };

  userRepository.addUser(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    });
});


// Modification d'un utilisateur | Vérification du token
router.put('/users/:x', (req, res) => {
  const userId = req.params.x;
  const userData = req.body; // Données de l'utilisateur à mettre à jour

  // Appel de la fonction updateUser du userRepository
  userRepository.updateUser(userId, userData)
    .then(updatedUser => {
      // Utilisateur mis à jour avec succès
      res.json(updatedUser);
    })
    .catch(error => {
      // Gestion des erreurs lors de la mise à jour de l'utilisateur
      res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
    });
});

// Récupération d'un utilisateur
router.get('/users/:x', (req, res) => {
  const userId = req.params.x;

  // Appel de la fonction getUserById du userRepository
  userRepository.getUserById(userId)
    .then(user => {
      if (user) {
        // Utilisateur trouvé avec succès
        res.status(200).json(user);
      } else {
        // Utilisateur non trouvé
        res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
    })
    .catch(error => {
      // Gestion des erreurs lors de la récupération de l'utilisateur
      res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
    });
});

// Récupération de l'ensemble des utilisateurs
router.get('/users', (req, res) => {
  // Appel de la fonction getAllUsers du userRepository
  userRepository.getAllUsers()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      // Gestion des erreurs lors de la récupération des utilisateurs
      res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    });
});

module.exports = router;