const express = require("express");
const listRouter = express.Router();
const List = require("../../../database/models/List");

listRouter.post("/", (req, res) => {
  console.log("Posting new list");
  const { user_id, board_id, position, title } = req.body;
  let newList = {
    board_id: board_id,
    position: position,
    title: title
  };
  return new List(newList)
    .save()
    .then(() => {
      console.log("List added to database");
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
          console.log("Returned list results");
          res.status(200).json(results);
        });
    })
    .catch(() => {
      res.status(400);
    });
});

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
          console.log(results);
          res.status(200).json(results);
        });
    })
    .catch(() => {
      res.status(400);
    });
});

module.exports = listRouter;
