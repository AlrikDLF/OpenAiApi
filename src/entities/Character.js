class Character {
    constructor(id, name, description, user_id, universe_id, createdAt, updatedAt) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.user_id = user_id;
      this.universe_id = universe_id;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  
  module.exports = Character;
  