const express = require("express");
const taskRouter = express.Router();
const Task = require("../../../database/models/Task");

taskRouter.post("/", (req, res) => {
  console.log(req.body);
  const { user_id, list_id, position, description } = req.body;
  let newCard = {
    list_id: list_id,
    position: position,
    description: description
  };
  return new Task(newCard)
    .save()
    .then(() => {
      console.log(user_id);
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
          console.log(results);
          res.status(200).json(results);
        });
    })
    .catch(() => {
      res.status(400);
    });
});

taskRouter.put("/", (req, res) => {
  const description = req.body.taskDescription;
  const id = req.body.taskId;
  const user_id = req.body.userId;
  const list_id = req.body.listId;
  return new Task({ list_id: list_id, id: id })
    .fetch()
    .then(newTaskDescription => {
      newTaskDescription.set({ description: description }).save();
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

module.exports = taskRouter;
