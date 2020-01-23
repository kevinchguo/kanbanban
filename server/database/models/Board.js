const bookshelf = require("../bookshelf");
require("../models/User");
require("../models/List");

class Board extends bookshelf.Model {
  get tableName() {
    return "boards";
  }

  get timestamps() {
    return true;
  }

  user_id() {
    return this.hasOne("User", "id", "user_id");
  }

  list() {
    return this.hasMany("List");
  }
}

module.exports = bookshelf.model("Board", Board);
