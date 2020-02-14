const express = require("express");
const cors = require("cors");
const decorator = require("./database/decorator");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const methodOverride = require("method-override");
const bcrypt = require("bcryptjs");

const PORT = process.env.EXPRESS_HOST_PORT;

//Routers
const userRouter = require("./routes/api/users");
const boardRouter = require("./routes/api/boards");
const listRouter = require("./routes/api/lists");
const taskRouter = require("./routes/api/tasks");

require("dotenv").config();
require("./configPassport/passport")(passport);

const app = express();

//Middleware
app.use(express.static("./server/public"));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(decorator);

app.use("/api/users", userRouter);
app.use("/api/boards", boardRouter);
app.use("/api/lists", listRouter);
app.use("/api/tasks", taskRouter);

app.listen(PORT, () => {
  console.log(`Server started on PORTss: ${PORT}`);
});
