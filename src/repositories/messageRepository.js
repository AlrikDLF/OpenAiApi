const db = require('../db');
const Message = require('../entities/Message');
const conversationRepositoryclass = require('./conversationRepository');

const conversationRepository = new conversationRepositoryclass();

class MessageRepository {
  getAllMessages() {
    return db.query('SELECT * FROM message')
      .then(rows => rows.map(row => new Message(row.id, row.content, row.timestamp)));
  }

  getMessageById(id) {
    return db.query('SELECT * FROM message WHERE id = ?', [id])
      .then(rows => {
        if (rows.length > 0) {
          const { id, content, timestamp } = rows[0];
          return new Message(id, content, timestamp);
        }
        return null;
      });
  }

  addMessage(message) {
    return db.query('INSERT INTO message (content, timestamp) VALUES (?, ?)', [message.content, message.timestamp])
      .then(result => {
        const { insertId } = result;
        return new Message(insertId, message.content, message.timestamp);
      });
  }

  updateMessage(message) {
    return db.query('UPDATE message SET content = ?, timestamp = ? WHERE id = ?', [message.content, message.timestamp, message.id])
      .then(result => {
        if (result.affectedRows > 0) {
          return message;
        }
        return null;
      });
  }

    regenerateLastMessage(conversationId) {
    // 1. Récupérer la conversation à partir de son ID
    const conversation = conversationRepository.getConversationById(conversationId);
  
    if (!conversation) {
      return null; // La conversation n'existe pas
    }
  
    // 2. Récupérer le dernier message de la conversation
    const lastMessage = messageRepository.getLastMessageByConversation(conversationId);
  
    if (!lastMessage) {
      return null; // Aucun message dans la conversation
    }
  
    // 3. Régénérer le dernier message à l'aide d'OpenAI
    const regeneratedMessage = openAI.generateMessage(lastMessage.text);
  
    // 4. Mettre à jour le texte du dernier message dans la base de données
    messageRepository.updateMessageText(lastMessage.id, regeneratedMessage);
  
    // 5. Retourner le message régénéré
    return regeneratedMessage;
  }
  

  deleteMessage(id) {
    return db.query('DELETE FROM message WHERE id = ?', [id])
      .then(result => {
        if (result.affectedRows > 0) {
          return id;
        }
        return null;
      });
  }
}

module.exports = MessageRepository;
