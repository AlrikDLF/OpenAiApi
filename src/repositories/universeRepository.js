import { query } from '../config/database';
import Universe from '../entities/Universe';

class UniverseRepository {
  getAllUniverses() {
    return query('SELECT * FROM universe')
      .then(rows => rows.map(row => new Universe(row.id, row.name, row.description)));
  }

  getUniverseById(id) {
    return query('SELECT * FROM universe WHERE id = ?', [id])
      .then(rows => {
        if (rows.length > 0) {
          const { id, name, description } = rows[0];
          return new Universe(id, name, description);
        }
        return null;
      });
  }

  getCharactersByUniverse(universeId) {
    return query('SELECT * FROM character WHERE universe_id = ?', [universeId])
      .then(rows => {
        return rows;
      })
      .catch(error => {
        throw error;
      });
  }

  addUniverse(universe) {
    return query('INSERT INTO universe (name, description) VALUES (?, ?)', [universe.name, universe.description])
      .then(result => {
        const { insertId } = result;
        return new Universe(insertId, universe.name, universe.description);
      });
  }

  updateUniverse(universe) {
    return query('UPDATE universe SET name = ?, description = ? WHERE id = ?', [universe.name, universe.description, universe.id])
      .then(result => {
        if (result.affectedRows > 0) {
          return universe;
        }
        return null;
      });
  }

  deleteUniverse(id) {
    return query('DELETE FROM universe WHERE id = ?', [id])
      .then(result => {
        if (result.affectedRows > 0) {
          return id;
        }
        return null;
      });
  }

  deleteUniverseAndCharacters(universeId) {
    return new Promise((resolve, reject) => {
      // Supprimer les personnages associés à l'univers
      query('DELETE FROM character WHERE universeId = ?', [universeId])
        .then(() => {
          // Supprimer l'univers lui-même
          return query('DELETE FROM universe WHERE id = ?', [universeId]);
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
  
}

export default UniverseRepository;
