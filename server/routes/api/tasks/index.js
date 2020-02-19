const express = require("express");
const taskRouter = express.Router();
const Task = require("../../../database/models/Task");

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
          console.log("Task description updated");
          console.log(json(results));
          res.status(200).json(results);
        });
    })
    .catch(() => {
      res.status(400);
    });
});

module.exports = taskRouter;
