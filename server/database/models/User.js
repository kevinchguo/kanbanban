const bookshelf = require("../bookshelf");
require("../models/Board");
require("../models/List");
require("../models/Task");

class User extends bookshelf.Model {
  get tableName() {
    return "users";
  }

  get timestamps() {
    return true;
  }

  board() {
    return this.hasMany("Board");
  }
}

module.exports = bookshelf.model("User", User);
