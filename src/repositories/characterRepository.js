const db = require('../db');
const Character = require('../entities/Character');

class CharacterRepository {
  getAllCharacters() {
    return query('SELECT * FROM character')
      .then(rows => rows.map(row => new Character(row.id, row.name, row.description)));
  }

  getCharacterById(id) {
    return query('SELECT * FROM character WHERE id = ?', [id])
      .then(rows => {
        if (rows.length > 0) {
          const { id, name, description } = rows[0];
          return new Character(id, name, description);
        }
        return null;
      });
  }

  addCharacter(character) {
    return query('INSERT INTO character (name, description, universe_id) VALUES (?, ?)', [character.name, character.description, character.universe_id])
      .then(result => {
        const { insertId } = result;
        return new Character(insertId, character.name, character.description, character.universe_id);
      });
  }

  updateCharacter(character) {
    return query('UPDATE character SET name = ?, description = ? WHERE id = ?', [character.name, character.description, character.id])
      .then(result => {
        if (result.affectedRows > 0) {
          return character;
        }
        return null;
      });
  }

  deleteCharacter(id) {
    return query('DELETE FROM character WHERE id = ?', [id])
      .then(result => {
        if (result.affectedRows > 0) {
          return id;
        }
        return null;
      });
  }
}

module.exports = CharacterRepository;
