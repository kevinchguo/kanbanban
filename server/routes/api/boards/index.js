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
      console.log("updated title");
      newTitle.set({ title: title }).save();
      return req.db.User.where({ id: user_id })
        .fetchAll({
          withRelated: [
            "board",
            {
              "board.list": qb => {
                qb.orderBy("position", "asc");
              }
            },
            {
              "board.list.task": qb => {
                qb.orderBy("position", "asc");
              }
            }
          ]
        })
        .then(results => {
          console.log("returned user info");

          res.status(200).json(results);
        });
    })
    .catch(() => {
      res.status(400);
    });
});

module.exports = boardRouter;
