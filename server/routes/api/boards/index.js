const express = require("express");
const boardRouter = express.Router();

boardRouter.get("/", (req, res) => {
  res.send({ Message: "Boards here" });
});

module.exports = boardRouter;
