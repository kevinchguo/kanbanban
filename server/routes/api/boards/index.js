const express = require("express");
const boardRouter = express.Router();
const Board = require("../../../database/models/Board");

boardRouter.put("/", (req, res) => {
  const title = req.body.title;
  const id = req.body.boardId;
  const username = req.body.username;
  const user_id = req.body.userId;
  return new Board({ user_id: user_id, id: id })
    .fetch()
    .then(newTitle => {
      newTitle.set({ title: title }).save();
      return req.db.User.where({ id: user_id })
        .fetchAll({
          withRelated: ["board", "board.list", "board.list.task"]
        })
        .then(results => {
          res.status(200).json(results);
        });
    })
    .catch(() => {
      res.status(400).json(newTitle);
    });
});

module.exports = boardRouter;
