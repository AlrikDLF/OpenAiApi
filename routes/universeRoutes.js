// Récupération de l'ensemble des univers
app.get('/universes', (req, res) => {
    // Logique pour la récupération de l'ensemble des univers
  });
  
  // Création d'un univers
  app.post('/universes', (req, res) => {
    // Logique pour la création d'un univers
  });
  
  // Récupération d'un univers
  app.get('/universes/:x', (req, res) => {
    // Logique pour la récupération d'un univers
  });
  
  // Modification d'un univers
  app.put('/universes/:x', (req, res) => {
    // Logique pour la modification d'un univers
  });
  
  // Suppression d'un univers et de tous les personnages associés
  app.delete('/universes/:x', (req, res) => {
    // Logique pour la suppression d'un univers et de tous les personnages associés
  });
  
  // Récupération de l'ensemble des personnages d'un univers
  app.get('/universes/:x/characters', (req, res) => {
    // Logique pour la récupération de l'ensemble des personnages d'un univers
  });
  
  // Création d'un personnage dans un univers
  app.post('/universes/:x/characters', (req, res) => {
    // Logique pour la création d'un personnage dans un univers
  });
  
  // Modification d'un personnage dans un univers
  app.put('/universes/:x/characters', (req, res) => {
    // Logique pour la modification d'un personnage dans un univers
  });
  
  // Suppression d'un personnage dans un univers
  app.delete('/universes/:x/characters', (req, res) => {
    // Logique pour la suppression d'un personnage dans un univers
  });