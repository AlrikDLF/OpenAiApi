const ConversationRepository = require('../repositories/conversationRepository');
const UniverseRepository = require('../repositories/universeRepository');
universeRepository = new UniverseRepository();
const { Router } = require('express');
const router = Router();

// Récupération de l'ensemble des univers
router.get('/', (req, res) => {
  // Appel de la fonction getAllUniverses du universeRepository
  universeRepository.getAllUniverses()
    .then(universes => {
      res.json(universes);
    })
    .catch(error => {
      // Gestion des erreurs lors de la récupération des univers
      res.status(500).json({ error: 'Erreur lors de la récupération des univers' });
    });
});


// Récupération d'un univers avec l'Id
router.get('/:x', (req, res) => {
  const universeId = req.params.x;
  
  // Appeler la fonction getUniverseById du service univers
  universeRepository.getUniverseById(universeId)
  .then((universe) => {
    // Envoyer la réponse avec l'univers récupéré
    res.json(universe);
  })
  .catch((error) => {
    // Gérer les erreurs
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de l\'univers.' });
  });
});

// Création d'un univers
router.post('/', (req, res) => {
  
  const newUniverse = {
    name: req.body.name,
    description: req.body.description,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  universeRepository.addUniverse(newUniverse)
    .then(universeId => {
      // Récupération de l'univers créé en utilisant l'ID retourné
      return universeRepository.getUniverseById(universeId);
    })
    .then(universe => {
      res.status(201).json(universe);
    })
    .catch(error => {
      console.error('Error pour créer l\'univers:', error);
      res.status(500).json({ error: 'Erreur dans la création de l\'univers' });
    });
});

// Modification d'un univers
router.put('/:id', (req, res) => {
  
  const updateData = {
    id: req.params.id,
    name: req.body.name,
    description: req.body.description
  };

  universeRepository.getUniverseById(req.params.id) // Vérifier si l'univers existe avant la mise à jour
    .then(existingUniverse => {
      if (existingUniverse) {
        return universeRepository.updateUniverse(updateData);
      } else {
        throw new Error('Univers non trouvé'); // Lancer une erreur personnalisée
      }
    })
    .then(updatedUniverse => {
      res.json(updatedUniverse);
    })
    .catch(error => {
      console.error('Erreur lors de la mise à jour de l\'univers :', error);
      if (error.message === 'Univers non trouvé') {
        res.status(404).json({ error: 'Univers non trouvé' });
      } else {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'univers' });
      }
    });
});

  //Suppression d'un univers
  router.delete('/:x', (req, res) => {
    const universeId = req.params.x;
  
    // Appeler la fonction deleteUniverse du service univers
    universeRepository.deleteUniverse(universeId)
      .then(() => {
        // Envoyer la réponse de succès
        res.json({ message: 'L\'univers et tous les personnages associés ont été supprimés avec succès.' });
      })
      .catch((error) => {
        // Gérer les erreurs
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de l\'univers.' });
      });
  });
  
  // Récupération de l'ensemble des personnages d'un univers
  router.get('/:x/characters', (req, res) => {
    const universeId = req.params.x;
  
    universeRepository.getCharactersByUniverse(universeId)
      .then(characters => {
        res.json(characters);
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des personnages.' });
      });
  });
  
  // Création d'un personnage dans un univers
  router.post('/:x/characters', (req, res) => {
    const universeId = req.params.x;
    const character = req.body;
  
    universeRepository.addCharacter(character, universeId)
      .then(createdCharacter => {
        res.json(createdCharacter);
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la création du personnage.' });
      });
  });
  
  // Modification d'un personnage dans un univers
  router.put('/:x/characters/:characterId', (req, res) => {
    const universeId = req.params.x;
    const characterId = req.params.characterId;
    const updatedCharacter = req.body;
  
    universeRepository.updateCharacter(updatedCharacter, universeId, characterId)
      .then(updatedCharacter => {
        res.json(updatedCharacter);
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la modification du personnage.' });
      });
  });  
  
  // Suppression d'un personnage dans un univers
  router.delete('/:x/characters/:characterId', (req, res) => {
    const universeId = req.params.x;
    const characterId = req.params.characterId;
  
    universeRepository.deleteCharacter(characterId)
      .then(() => {
        res.sendStatus(204);
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du personnage.' });
      });
  });
  
  module.exports = router;