import { getAllUniverses } from './repositories/universeRepository';

// Récupération de l'ensemble des univers
app.get('/universes', (req, res) => {
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

  // Création d'un univers
  app.post('/universes', (req, res) => {
    const { name, description } = req.body;
  
    // Appel de la fonction addUniverse du universeRepository
    universeRepository.addUniverse(name, description)
      .then(createdUniverse => {
        res.status(201).json(createdUniverse);
      })
      .catch(error => {
        // Gestion des erreurs lors de la création de l'univers
        res.status(500).json({ error: 'Erreur lors de la création de l\'univers' });
      });
  });
  
  // Récupération d'un univers
  app.get('/universes/:x', (req, res) => {
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
  
  // Modification d'un univers
  app.put('/universes/:x', (req, res) => {
    const universeId = req.params.x;
    const updatedUniverse = req.body;
  
    // Appeler la fonction updateUniverse du service univers
    universeRepository.updateUniverse(universeId, updatedUniverse)
      .then((updatedUniverse) => {
        // Envoyer la réponse avec l'univers modifié
        res.json(updatedUniverse);
      })
      .catch((error) => {
        // Gérer les erreurs
        res.status(500).json({ error: 'Une erreur est survenue lors de la modification de l\'univers.' });
      });
  });

  //Suppression d'un univers
  app.delete('/universes/:x', (req, res) => {
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
  
  // Suppression d'un univers et de tous les personnages associés
  app.delete('/universes/:x', (req, res) => {
    const universeId = req.params.x;
  
    universeRepository.deleteUniverseAndCharacters(universeId)
      .then(success => {
        if (success) {
          res.status(200).json({ message: 'Univers et personnages supprimés avec succès' });
        } else {
          res.status(404).json({ error: 'Aucun univers trouvé avec cet identifiant' });
        }
      })
      .catch(error => {
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'univers et des personnages' });
      });
  });
  
  // Récupération de l'ensemble des personnages d'un univers
  app.get('/universes/:x/characters', (req, res) => {
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
  app.post('/universes/:x/characters', (req, res) => {
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
  app.put('/universes/:x/characters/:characterId', (req, res) => {
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
  app.delete('/universes/:x/characters/:characterId', (req, res) => {
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
  