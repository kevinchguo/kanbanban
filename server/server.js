require("dotenv").config();

const express = require("express");

const PORT = process.env.EXPRESS_HOST_PORT;

const app = express();

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
