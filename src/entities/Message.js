class Message {
    constructor(id, content, is_sent_by_human, conversation_id, createdAt) {
      this.id = id;
      this.content = content;
      this.is_sent_by_human = is_sent_by_human;
      this.createdAt = createdAt;
    }
  }
  
  export default Message;
  