const express = require("express");
const cardRouter = express.Router();

cardRouter.get("/", (req, res) => {
  res.send({ Message: "Boards here" });
});

module.exports = cardRouter;
