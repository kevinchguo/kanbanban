const User = require("./models/User");
const Board = require("./models/Board");
const List = require("./models/List");
const Card = require("./models/Card");

module.exports = function(req, res, next) {
  req.db = {
    User: User,
    Board: Board,
    List: List,
    Card: Card
  };
  next();
};
