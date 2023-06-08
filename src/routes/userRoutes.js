const UserRepository = require('../repositories/userRepository');
userRepository = new UserRepository();
const { Router } = require('express');
const router = Router();

// Récupération de l'ensemble des utilisateurs
router.get('/', (req, res) => {

  // Appel de la fonction getAllUsers du userRepository
  userRepository.getAllUsers()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      // Gestion des erreurs lors de la récupération des utilisateurs
      res.status(500).json({ error: 'Failed to get users' });
    }); 
});


// Récupération d'un utilisateur
router.get('/:id', (req, res) => {
  const userId = req.params.id;

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

// Création d'un nouvel utilisateur
router.post('/', (req, res) => {

  console.log(res.data);

  const newUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  userRepository.addUser(newUser)
    .then(userId => {
      // Récupération de l'utilisateur créé en utilisant l'ID retourné
      return userRepository.getUserById(userId);
    })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      console.error('Error pour créer l\'utilisateur:', error);
      res.status(500).json({ error: 'Erreur dans la création de l\'utilisateur' });
    });
});


// Modification d'un utilisateur | Vérification du token
router.put('/:id', (req, res) => {
  
  const updateData = {
    id: req.params.id,
    username: req.body.username,
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname
  };

  userRepository.getUserById(req.params.id) // Vérifier si l'utilisateur existe avant la mise à jour
    .then(existingUser => {
      if (existingUser) {
        return userRepository.updateUser(updateData);
      } else {
        throw new Error('Utilisateur non trouvé'); // Lancer une erreur personnalisée
      }
    })
    .then(updatedUser => {
      res.json(updatedUser);
    })
    .catch(error => {
      console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
      if (error.message === 'Utilisateur non trouvé') {
        res.status(404).json({ error: 'Utilisateur non trouvé' });
      } else {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
      }
    });
});

// Suppression d'un utilisateur
router.delete('/:x', (req, res) => {
  const userId = req.params.x;
  console.log(userId);
  userRepository.deleteUser(userId)
    .then(result => {
      if (result) {
        res.json({ message: 'Utilisateur supprimé avec succès' });
      } else {
        res.status(404).json({ error: 'Utilisateur non trouvé'});
      }
    })
    .catch(error => {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
    });
});


module.exports = router;