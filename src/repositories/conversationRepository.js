const db = require('../db');
const Conversation = require('../entities/Conversation');

class ConversationRepository {
  getAllConversations() {
    return db.query('SELECT * FROM conversation')
      .then(rows => rows.map(row => new Conversation(row.id, row.title, row.description)));
  }

  getConversationById(id) {
    return db.query('SELECT * FROM conversation WHERE id = ?', [id])
      .then(rows => {
        if (rows.length > 0) {
          const { id, title, description } = rows[0];
          return new Conversation(id, title, description);
        }
        return null;
      });
  }

    getMessagesByConversation(conversationId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM message WHERE conversation_id = ?';
  
            db.query(query, [conversationId], (error, results) => {
                if (error) {
                reject(error);
                } else {
                resolve(results);
                }
            });
        });
    }
  

    getConversationWithCharacterAndUniverse(conversationId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT conversation.*, character.*, universe.* FROM conversation ' +
                    'JOIN character ON conversation.character_id = character.id ' +
                    'JOIN universe ON character.universe_id = universe.id ' +
                    'WHERE conversation.id = ?';
  
                    db.query(query, [conversationId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            const conversation = {
              id: results[0].id,
              character: {
                id: results[0].character_id,
              },
              universe: {
                id: results[0].universe_id,
              }
            };
  
            resolve(conversation);
          } else {
            resolve(null); // La conversation n'a pas été trouvée
          }
        }
      });
    });
  }

  addConversation(conversation) {
    return db.query('INSERT INTO conversation (title, description) VALUES (?, ?)', [conversation.title, conversation.description])
      .then(result => {
        const { insertId } = result;
        return new Conversation(insertId, conversation.title, conversation.description);
      });
  }

  updateConversation(conversation) {
    return db.query('UPDATE conversation SET title = ?, description = ? WHERE id = ?', [conversation.title, conversation.description, conversation.id])
      .then(result => {
        if (result.affectedRows > 0) {
          return conversation;
        }
        return null;
      });
  }

  deleteConversation(id) {
    return db.query('DELETE FROM conversation WHERE id = ?', [id])
      .then(result => {
        if (result.affectedRows > 0) {
          return id;
        }
        return null;
      });
  }
}

module.exports = ConversationRepository;