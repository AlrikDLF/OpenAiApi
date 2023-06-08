const db = require('../db');
const Character = require('../entities/Character');

class CharacterRepository {

  //getAllCharacters
  async getAllCharacters() {
    try {
      const rows = await new Promise((resolve, reject) => {
        db.query('SELECT * FROM `character`', (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        });
      });

      console.log(rows);
  
      if (rows.length > 0) {
        const characters = rows.map(row => new Character(row.id, row.name, row.description, row.universe_id, row.createdAt, row.updatedAt));
        return characters;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des characters :', error);
      return null;
    }
  }

  //getCharacterById
  async getCharacterById(id) {
    try {
      const rows = await new Promise((resolve, reject) => {
        db.query('SELECT * FROM `character` WHERE id = ?', [id], (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        });
      });
  
      if (rows.length > 0) {
        const { id, name, description, createdAt, updatedAt } = rows[0];
        return new Character(id, name, description, createdAt, updatedAt);
      } else {
        return null;
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération du character :', error);
      return null;
    }
  }

  //addCharacter
  async addCharacter(character) {
    try {
      const result = await new Promise((resolve, reject) => {
        db.query('INSERT INTO `character` (name, description, universe_id)VALUES (?, ?, ?)',
          [character.name, character.description, character.universe_id, character.createdAt, character.updatedAt],
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
      console.error('Une erreur s\'est produite lors de l\'ajout du character :', error);
      return null;
    }
  }  

  //updateCharacter
  async updateCharacter(character) {
    try {
      const result = await new Promise((resolve, reject) => {
        db.query('UPDATE `character` SET name = ?, description = ?, universe_id = ?, updatedAt = NOW() WHERE id = ?',
        [character.name, character.description, character.universe_id, character.id],
          (err, result) => {
            if (err) reject(err);
            resolve(result);
          }
        );
      });
      if (result.affectedRows > 0) {
        return character;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la mise à jour du character :', error);
      return null;
    }
  }  

  //deleteCharacter
  async deleteCharacter(character) {
    try {
        console.log(character);
      const result = await new Promise((resolve, reject) => {
        db.query('DELETE FROM `character` WHERE id = ?',
          [character],
          (err, result) => {
            if (err) reject(err);
            resolve(result);
          }
        );
      });
  
      if (result.affectedRows > 0) {
        return true; // La suppression du character a réussi
      } else {
        return false; // Aucun character trouvé avec cet ID
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la suppression du character :', error);
      return false; // Erreur lors de la suppression
    }
  }
}

module.exports = CharacterRepository;
