const express = require("express");
const taskRouter = express.Router();
const Task = require("../../../database/models/Task");
const List = require("../../../database/models/List");

taskRouter.get("/", (req, res) => {
  res.json({ Message: "Task router works" });
});

taskRouter.post("/", (req, res) => {
  console.log("Posting new task");
  const { user_id, list_id, position, description } = req.body;
  console.log("task router user id: ", user_id);
  let newTask = {
    list_id: list_id,
    position: position,
    description: description
  };
  return new Task(newTask)
    .save()
    .then(() => {
      console.log("Task added to database");
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
          console.log("Return from adding tasks");
          console.log("hello");
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
          res.status(200).json(results);
        });
    })
    .catch(() => {
      res.status(400);
    });
});

taskRouter.put("/reorder", (req, res) => {
  const {
    toListId,
    toTaskIndex,
    fromListId,
    fromTaskId,
    movedTaskId,
    user_id,
    currentBoard
  } = req.body;

  // only change position number of task
  return req.db.Task.where({ list_id: toListId })
    .orderBy("position", "asc")
    .fetchAll()
    .then(results => {
      if (!results.models[toTaskIndex]) {
        // Last item in list
        const { id, position } = results.models[toTaskIndex - 1].attributes;
        return new Task({ id: movedTaskId }).fetch().then(results => {
          if (fromListId === toListId) {
            // Same list
            console.log(position);
            results.set({ position: position + 1000 }).save();
          } else {
            // Different  list
            results
              .set({ position: position + 1000, list_id: toListId })
              .save();
          }
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
              res.status(200).json(results);
            })
            .catch(() => {
              res.status(400);
            });
        });
      } else {
        const { id, position } = results.models[toTaskIndex].attributes;
        return new Task({ id: movedTaskId }).fetch().then(results => {
          if (fromListId === toListId) {
            // Same list
            results.set({ position: position - 1 }).save();
          } else {
            //Different list
            results.set({ position: position - 1, list_id: toListId }).save();
          }
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
              res.status(200).json(results);
            })
            .catch(() => {
              res.status(400);
            });
        });
      }
    });
});

module.exports = taskRouter;
