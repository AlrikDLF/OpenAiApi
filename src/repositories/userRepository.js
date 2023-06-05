import { query } from '../config/database';
import User from '../entities/User';

class UserRepository {
  getAllUsers() {
    return query('SELECT * FROM user')
      .then(rows => rows.map(row => new User(row.id, row.name, row.email, row.password)));
  }

  getUserById(id) {
    return query('SELECT * FROM user WHERE id = ?', [id])
      .then(rows => {
        if (rows.length > 0) {
          const { id, name, email, password } = rows[0];
          return new User(id, name, email, password);
        }
        return null;
      });
  }

  getUserByEmail(email) {
    return query('SELECT * FROM user WHERE email = ?', [email])
      .then(rows => {
        if (rows.length > 0) {
          const { id, name, email, password } = rows[0];
          return new User(id, name, email, password);
        }
        return null;
      });
  }

  addUser(user) {
    return query('INSERT INTO user (name, email, password) VALUES (?, ?, ?)', [user.name, user.email, user.password])
      .then(result => {
        const { insertId } = result;
        return new User(insertId, user.name, user.email, user.password);
      });
  }

  updateUser(user) {
    return query('UPDATE user SET name = ?, email = ?, password = ? WHERE id = ?', [user.name, user.email, user.password, user.id])
      .then(result => {
        if (result.affectedRows > 0) {
          return user;
        }
        return null;
      });
  }

  deleteUser(id) {
    return query('DELETE FROM user WHERE id = ?', [id])
      .then(result => {
        if (result.affectedRows > 0) {
          return id;
        }
        return null;
      });
  }
}

export default UserRepository;