import { query } from '../config/database';
import Conversation from '../entities/Conversation';

class ConversationRepository {
  getAllConversations() {
    return query('SELECT * FROM conversation')
      .then(rows => rows.map(row => new Conversation(row.id, row.title, row.description)));
  }

  getConversationById(id) {
    return query('SELECT * FROM conversation WHERE id = ?', [id])
      .then(rows => {
        if (rows.length > 0) {
          const { id, title, description } = rows[0];
          return new Conversation(id, title, description);
        }
        return null;
      });
  }

  addConversation(conversation) {
    return query('INSERT INTO conversation (title, description) VALUES (?, ?)', [conversation.title, conversation.description])
      .then(result => {
        const { insertId } = result;
        return new Conversation(insertId, conversation.title, conversation.description);
      });
  }

  updateConversation(conversation) {
    return query('UPDATE conversation SET title = ?, description = ? WHERE id = ?', [conversation.title, conversation.description, conversation.id])
      .then(result => {
        if (result.affectedRows > 0) {
          return conversation;
        }
        return null;
      });
  }

  deleteConversation(id) {
    return query('DELETE FROM conversation WHERE id = ?', [id])
      .then(result => {
        if (result.affectedRows > 0) {
          return id;
        }
        return null;
      });
  }
}

export default ConversationRepository;