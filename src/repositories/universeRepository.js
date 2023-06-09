const db = require('../db');
const Universe = require('../entities/Universe');


class UniverseRepository {

  //getAllUnivers
  async getAllUniverses() {
    try {
      const rows = await new Promise((resolve, reject) => {
        db.query('SELECT * FROM universe', (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        });
      });
  
      if (rows.length > 0) {
        const universes = rows.map(row => new Universe(row.id, row.name, row.description, row.createdAt, row.updatedAt));
        return universes;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des utilisateurs :', error);
      return null;
    }
  }

  //getUniverseById
  async getUniverseById(id) {
    try {
      const rows = await new Promise((resolve, reject) => {
        db.query('SELECT * FROM universe WHERE id = ?', [id], (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        });
      });
  
      if (rows.length > 0) {
        const { id, name, description, createdAt, updatedAt } = rows[0];
        return new Universe(id, name, description, createdAt, updatedAt);
      } else {
        return null;
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération de l\'univers :', error);
      return null;
    }
  }

  //TO CHECK :

  getCharactersByUniverse(universeId) {
    return db.query('SELECT * FROM character WHERE universe_id = ?', [universeId])
      .then(rows => {
        return rows;
      })
      .catch(error => {
        throw error;
      });
  }

  //addUniverse
  async addUniverse(universe) {
    try {
      const result = await new Promise((resolve, reject) => {
        db.query('INSERT INTO universe (name, description, createdAt, updatedAt) VALUES (?, ?, ?, ?)',
          [universe.name, universe.description, universe.createdAt, universe.updatedAt],
          (err, result) => {
            if (err) reject(err);
            resolve(result);
            console.log(universe);
          }
          );
        });
        if (result.insertId > 0) {
        return result.insertId;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de l\'ajout de l\'univers :', error);
      return null;
    }
  }  

  //updateUniverse
  async updateUniverse(universe) {
    try {
      const result = await new Promise((resolve, reject) => {
        db.query('UPDATE universe SET name = ?, description = ?, updatedAt = NOW() WHERE id = ?',
          [universe.name, universe.description, universe.id],
          (err, result) => {
            if (err) reject(err);
            resolve(result);
          }
        );
      });
      if (result.affectedRows > 0) {
        return universe;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la mise à jour de l\'univers :', error);
      return null;
    }
  }  

  //deleteUniverse
  async deleteUniverse(universe) {
    try {
      const result = await new Promise((resolve, reject) => {
        db.query('DELETE FROM universe WHERE id = ?',
          [universe],
          (err, result) => {
            if (err) reject(err);
            resolve(result);
          }
        );
      });
      if (result.affectedRows > 0) {
        return true; // La suppression a réussi
      } else {
        return false; // Aucun univers trouvé avec cet ID
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la suppression de l\'univers :', error);
      return false; // Erreur lors de la suppression
    }
  }  

  // TO CHECK AND MODIFY [IN PROGRESS] :

  async deleteUniverseAndCharacters(universeId) {
    try {
      await new Promise((resolve, reject) => {
        // Supprimer les personnages associés à l'univers
        db.query('DELETE FROM character WHERE universeId = ?', [universeId], (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
  
      const result = await new Promise((resolve, reject) => {
        // Supprimer l'univers lui-même
        db.query('DELETE FROM universe WHERE id = ?', [universeId], (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });

      if (result.affectedRows > 0) {
        return true; // La suppression a réussi
      } else {
        return false; // Aucun univers n'a été supprimé
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la suppression de l\'univers et des personnages :', error);
      return null;
    }
  }  
}

module.exports = UniverseRepository;
