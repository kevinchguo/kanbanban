const express = require("express");
const listRouter = express.Router();
const List = require("../../../database/models/List");

listRouter.put("/", (req, res) => {
  const title = req.body.listName;
  const id = req.body.listId;
  const user_id = req.body.userId;
  const board_id = req.body.boardId;
  return new List({ board_id: board_id, id: id })
    .fetch()
    .then(newListName => {
      newListName.set({ title: title }).save();
      return req.db.User.where({ id: user_id })
        .fetchAll({
          withRelated: ["board", "board.list", "board.list.task"]
        })
        .then(results => {
          res.status(200).json(results);
        });
    })
    .catch(() => {
      res.status(400);
    });
});

module.exports = listRouter;
