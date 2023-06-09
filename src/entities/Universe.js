class Universe {
    constructor(id, name, creator_id, createdAt, updatedAt) {
      this.id = id;
      this.name = name;
      this.description = name;
      this.creator_id = creator_id;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  
  module.exports = Universe;
  