const User = require("./models/User");
const Board = require("./models/Board");
const List = require("./models/List");
const Task = require("./models/Task");

module.exports = function(req, res, next) {
  req.db = {
    User: User,
    Board: Board,
    List: List,
    Task: Task
  };
  next();
};
