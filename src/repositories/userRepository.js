const db = require('../db');
const User = require('../entities/User');

class UserRepository {

  //getAllUsers
  async getAllUsers() {
    try {
      const rows = await new Promise((resolve, reject) => {
        db.query('SELECT * FROM user', (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        });
      });
  
      if (rows.length > 0) {
        const users = rows.map(row => new User(row.id, row.username, row.email, row.firstname, row.lastname, row.createdAt, row.updatedAt));
        return users;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des utilisateurs :', error);
      return null;
    }
  }

  //getUserById
  async getUserById(id) {
    try {
      const rows = await new Promise((resolve, reject) => {
        db.query('SELECT * FROM user WHERE id = ?', [id], (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        });
      });
  
      if (rows.length > 0) {
        const { id, username, email, firstname, lastname, createdAt, updatedAt } = rows[0];
        return new User(id, username, email, firstname, lastname, createdAt, updatedAt);
      } else {
        return null;
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération de l\'utilisateur :', error);
      return null;
    }
  }
  
  //getUserByEmail
  async getUserByEmail(email) {
    try {
      const rows = await new Promise((resolve, reject) => {
        db.query('SELECT * FROM user WHERE email = ?', [email], (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        });
      });
  
      if (rows.length > 0) {
        const { id, username, email, firstname, lastname, createdAt, updatedAt } = rows[0];
        return new User(id, username, email, firstname, lastname, createdAt, updatedAt);
      } else {
        return null;
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération de l\'utilisateur :', error);
      return null;
    }
  }
  
  //addUser
  async addUser(user) {
    try {
      const result = await new Promise((resolve, reject) => {
        db.query('INSERT INTO user (username, email, firstname, lastname, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)',
          [user.username, user.email, user.firstname, user.lastname, user.createdAt, user.updatedAt],
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
      console.error('Une erreur s\'est produite lors de l\'ajout de l\'utilisateur :', error);
      return null;
    }
  }  

  //updateUser
  async updateUser(user) {
    try {
      const result = await new Promise((resolve, reject) => {
        db.query('UPDATE user SET username = ?, email = ?, firstname = ?, lastname = ?, updatedAt = NOW() WHERE id = ?',
          [user.username, user.email, user.firstname, user.lastname, user.id],
          (err, result) => {
            if (err) reject(err);
            resolve(result);
          }
        );
      });
      if (result.affectedRows > 0) {
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la mise à jour de l\'utilisateur :', error);
      return null;
    }
  }  

  //deleteUser
  async deleteUser(user) {
    try {
        console.log(user);
      const result = await new Promise((resolve, reject) => {
        db.query('DELETE FROM user WHERE id = ?',
          [user],
          (err, result) => {
            if (err) reject(err);
            resolve(result);
          }
        );
      });
  
      if (result.affectedRows > 0) {
        return true; // La suppression a réussi
      } else {
        return false; // Aucun utilisateur trouvé avec cet ID
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la suppression de l\'utilisateur :', error);
      return false; // Erreur lors de la suppression
    }
  }  
}

module.exports = UserRepository;