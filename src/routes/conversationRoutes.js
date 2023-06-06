const ConversationRepository = require('../repositories/conversationRepository');
const MessageRepository = require('../repositories/messageRepository');
conversationRepository = new ConversationRepository();
const { Router } = require('express');
const router = Router();

// Récupération des conversations en cours qui renvoie aussi l'ID du personnage et de l'univers
router.get('/conversations', (req, res) => {
  conversationRepository.getAllConversations()
    .then(conversations => {
      const formattedConversations = conversations.map(conversation => {
        return {
          id: conversation.id,
          characterId: conversation.characterId,
          universeId: conversation.universeId
        };
      });
      res.json(formattedConversations);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des conversations.' });
    });
});
  
  // Création d'une nouvelle conversation avec un personnage
  router.post('/conversations', (req, res) => {
    const { characterId } = req.body; // ID du personnage
    const conversation = {
      characterId,
      // Autres propriétés de la conversation à partir des données de la requête
    };
  
    conversationRepository.addConversation(conversation)
      .then(newConversation => {
        res.status(201).json(newConversation);
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la création de la conversation.' });
      });
  });
  
  
  // Récupération d'une conversation avec le personnage et l'univers complet
  router.get('/conversations/:id', (req, res) => {
    const conversationId = req.params.id;
  
    conversationRepository.getConversationWithCharacterAndUniverse(conversationId)
      .then(conversation => {
        if (conversation) {
          res.json(conversation);
        } else {
          res.status(404).json({ error: 'Conversation non trouvée.' });
        }
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de la conversation.' });
      });
  });
  
  
  // Suppression d'une conversation avec un personnage
  router.delete('/conversations/:x', (req, res) => {
    const conversationId = req.params.x;
  
    conversationRepository.deleteConversation(conversationId)
      .then(deletedConversationId => {
        if (deletedConversationId) {
          res.json({ success: true, message: `La conversation avec l'ID ${deletedConversationId} a été supprimée.` });
        } else {
          res.status(404).json({ success: false, message: 'La conversation n\'existe pas.' });
        }
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ success: false, error: 'Une erreur est survenue lors de la suppression de la conversation.' });
      });
  });
  
  
  // Récupération de l'historique des messages d'une conversation
  router.get('/conversations/:x/messages', (req, res) => {
    const conversationId = req.params.x;
  
    conversationRepository.getMessagesByConversation(conversationId)
      .then(messages => {
        res.json(messages);
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de l\'historique des messages.' });
      });
  });  
  
  // Envoi d'un nouveau message dans la conversation
  router.post('/conversations/:x/messages', (req, res) => {
    const conversationId = req.params.x;
    const { content, senderId } = req.body;
  
    const message = {
      content,
      senderId,
      conversationId
    };
  
    messageRepository.addMessage(message)
      .then(newMessage => {
        res.json(newMessage);
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de l\'envoi du message.' });
      });
  });  
  
  // Regénération du dernier message d'une conversation
  router.put('/conversations/:conversationId', (req, res) => {
    const conversationId = req.params.conversationId;
  
    // Logique pour la régénération du dernier message d'une conversation
    const regeneratedMessage = regenerateLastMessage(conversationId);
  
    if (regeneratedMessage) {
      res.json(regeneratedMessage);
    } else {
      res.status(404).json({ error: 'Conversation not found' });
    }
  });
  
  module.exports = router;