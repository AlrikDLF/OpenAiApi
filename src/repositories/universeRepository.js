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
}

export default UniverseRepository;
