const CharacterRepository = require('../repositories/characterRepository');
characterRepository = new CharacterRepository();
const { Router } = require('express');
const router = Router();

// Récupération de l'ensemble des characters
router.get('/', (req, res) => {

  // Appel de la fonction getAllCharacters du characterRepository
  characterRepository.getAllCharacters()
    .then(Characters => {
      res.json(Characters);
    })
    .catch(error => {
      // Gestion des erreurs lors de la récupération des characters
      res.status(500).json({ error: 'Failed to get Characters' });
    }); 
});


// Récupération d'un character
router.get('/:id', (req, res) => {
  const CharacterId = req.params.id;

  // Appel de la fonction getCharacterById du CharacterRepository
  characterRepository.getCharacterById(CharacterId)
    .then(Character => {
      if (Character) {
        // Character trouvé avec succès
        res.status(200).json(Character);
      } else {
        // Character non trouvé
        res.status(404).json({ error: 'Character non trouvé' });
      }
    })
    .catch(error => {
      // Gestion des erreurs lors de la récupération du character
      res.status(500).json({ error: 'Erreur lors de la récupération du character' });
    });
});

// Création d'un nouveau character
router.post('/', (req, res) => {

  console.log(res.data);

  const newCharacter = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  characterRepository.addCharacter(newCharacter)
    .then(CharacterId => {
      // Récupération du character créé en utilisant l'ID retourné
      return CharacterRepository.getCharacterById(CharacterId);
    })
    .then(Character => {
      res.status(201).json(Character);
    })
    .catch(error => {
      console.error('Error pour créer le character:', error);
      res.status(500).json({ error: 'Erreur dans la création du character' });
    });
});


// Modification d'un character | Vérification du token
router.put('/:id', (req, res) => {
  
  const updateData = {
    id: req.params.id,
    name: req.body.name,
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname
  };

  characterRepository.getCharacterById(req.params.id) // Vérifier si le character existe avant la mise à jour
    .then(existingCharacter => {
      if (existingCharacter) {
        return characterRepository.updateCharacter(updateData);
      } else {
        throw new Error('Character non trouvé'); // Lancer une erreur personnalisée
      }
    })
    .then(updatedCharacter => {
      res.json(updatedCharacter);
    })
    .catch(error => {
      console.error('Erreur lors de la mise à jour du character :', error);
      if (error.message === 'Character non trouvé') {
        res.status(404).json({ error: 'Character non trouvé' });
      } else {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du character' });
      }
    });
});

// Suppression d'un character
router.delete('/:x', (req, res) => {
  const CharacterId = req.params.x;
  console.log(CharacterId);
  characterRepository.deleteCharacter(CharacterId)
    .then(result => {
      if (result) {
        res.json({ message: 'Character supprimé avec succès' });
      } else {
        res.status(404).json({ error: 'Character non trouvé'});
      }
    })
    .catch(error => {
      console.error('Erreur lors de la suppression du character:', error);
      res.status(500).json({ error: 'Erreur lors de la suppression du character' });
    });
});


module.exports = router;