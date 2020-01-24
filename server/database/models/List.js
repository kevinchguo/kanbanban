const bookshelf = require("../bookshelf");
require("../models/Board");
require("../models/Card");

class List extends bookshelf.Model {
  get tableName() {
    return "lists";
  }

  get timestamps() {
    return true;
  }

  board() {
    return this.belongsTo("Board");
  }

  board_id() {
    return this.hasOne("Board", "id", "board_id");
  }

  card() {
    return this.hasMany("Card");
  }
}

module.exports = bookshelf.model("List", List);
