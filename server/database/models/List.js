const bookshelf = require("../bookshelf");
require("../models/Board");
require("../models/Task");

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

  task() {
    return this.hasMany("Task");
  }
}

module.exports = bookshelf.model("List", List);
