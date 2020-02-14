const express = require("express");
const taskRouter = express.Router();

taskRouter.get("/", (req, res) => {
  res.send({ Message: "Boards here" });
});

module.exports = taskRouter;
