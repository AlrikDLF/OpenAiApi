class Conversation {
    constructor(id, character_id, user_id, createdAt, updatedAt) {
      this.id = id;
      this.character_id = character_id;
      this.user_id = user_id;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  
  module.exports = Conversation;
  