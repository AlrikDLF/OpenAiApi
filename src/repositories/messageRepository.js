import { query } from '../config/database';
import Message from '../entities/Message';

class MessageRepository {
  getAllMessages() {
    return query('SELECT * FROM message')
      .then(rows => rows.map(row => new Message(row.id, row.content, row.timestamp)));
  }

  getMessageById(id) {
    return query('SELECT * FROM message WHERE id = ?', [id])
      .then(rows => {
        if (rows.length > 0) {
          const { id, content, timestamp } = rows[0];
          return new Message(id, content, timestamp);
        }
        return null;
      });
  }

  addMessage(message) {
    return query('INSERT INTO message (content, timestamp) VALUES (?, ?)', [message.content, message.timestamp])
      .then(result => {
        const { insertId } = result;
        return new Message(insertId, message.content, message.timestamp);
      });
  }

  updateMessage(message) {
    return query('UPDATE message SET content = ?, timestamp = ? WHERE id = ?', [message.content, message.timestamp, message.id])
      .then(result => {
        if (result.affectedRows > 0) {
          return message;
        }
        return null;
      });
  }

  deleteMessage(id) {
    return query('DELETE FROM message WHERE id = ?', [id])
      .then(result => {
        if (result.affectedRows > 0) {
          return id;
        }
        return null;
      });
  }
}

export default MessageRepository;
