class Message {
    constructor(id, content, is_sent_by_human, conversation_id, createdAt) {
      this.id = id;
      this.content = content;
      this.is_sent_by_human = is_sent_by_human;
      this.conversation_id = conversation_id;
      this.createdAt = createdAt;
    }
  }
  
  module.exports = Message;
  