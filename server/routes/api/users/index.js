const express = require("express");
const userRouter = express.Router();
const User = require("../../../database/models/User");

userRouter.get("/", (req, res) => {
  return req.db.User.where({ id: 1 })
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
});

module.exports = userRouter;
