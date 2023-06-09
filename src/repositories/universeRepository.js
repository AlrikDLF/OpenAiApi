const db = require('../db');
const Universe = require('../entities/Universe');


class UniverseRepository {
  async getAllUniverses() {
    try {
      const rows = await new Promise((resolve, reject) => {
        db.query('SELECT * FROM universe', (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        });
      });
  
      if (rows.length > 0) {
        const universes = rows.map(row => new Universe(row.id, row.name, row.description));
        console.log(universes);
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
        const { id, name, description, creator_id, createdAt, updatedAt } = rows[0];
        return new Universe(id, name, description, creator_id, createdAt, updatedAt);
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
        db.query('INSERT INTO universe (name, description) VALUES (?, ?)',
          [universe.name, universe.description, universe.createdAt, universe.updatedAt],
          (err, result) => {
            if (err) reject(err);
            resolve(result);
          }
        );
      });
  
      if (result.affectedRows > 0) {
        return result.insertId;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de l\'ajout de l\'univers :', error);
      return null;
    }
  }  

  updateUniverse(universe) {
    return db.query('UPDATE universe SET name = ?, description = ? WHERE id = ?', [universe.name, universe.description, universe.id])
      .then(result => {
        if (result.affectedRows > 0) {
          return universe;
        }
        return null;
      });
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
        console.log(user);
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

  //--------------------

  deleteUniverseAndCharacters(universeId) {
    return new Promise((resolve, reject) => {
      // Supprimer les personnages associés à l'univers
      db.query('DELETE FROM character WHERE universeId = ?', [universeId])
        .then(() => {
          // Supprimer l'univers lui-même
          return db.query('DELETE FROM universe WHERE id = ?', [universeId]);
        })
        .then(result => {
          if (result.affectedRows > 0) {
            resolve(true); // La suppression a réussi
          } else {
            resolve(false); // Aucun univers n'a été supprimé
          }
        })
        .catch(error => {
          reject(error); // Une erreur s'est produite lors de la suppression
        });
    });
  }

  //TO CHECK AND MODIFY :

  //deleteUniverseAndCharacters
  async deleteUniverseAndCharacters(universe) {
    try {
        console.log(universe);
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
}

module.exports = UniverseRepository;
