const express = require("express");
const listRouter = express.Router();

listRouter.get("/", (req, res) => {
  res.send({ Message: "Boards here" });
});

module.exports = listRouter;
