const bookshelf = require("../bookshelf");
require("../models/List");

class Card extends bookshelf.Model {
  get tableName() {
    return "cards";
  }

  get timestamps() {
    return true;
  }

  list() {
    return this.belongsTo("List");
  }

  list_id() {
    return this.hasOne("List", "id", "list_id");
  }
}

module.exports = bookshelf.model("Card", Card);
