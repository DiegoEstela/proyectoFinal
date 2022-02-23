const express = require("express");
const app = express();
const PORT = process.env.PORT || 8081;
const passport = require("passport");
require("./passport");
const auth = require("./helpers/auth");
const parseArgs = require("minimist");
const compression = require("compression");
const logger = require("./loggers/logger");
app.set("views", process.cwd() + "/src/views");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views"));
app.use(compression());

const userRoute = require("./routes/userRoute");
const prodRoute = require("./routes/productsRoute");

app.get("/", (req, res) => {
  res.render("home");
  logger.log("info", "Home page loaded");
});

app.use("/", userRoute);
app.use("/", prodRoute);

const server = app.listen(PORT, () => {
  console.log(
    `Servidor http escuchando en el puerto: ${server.address().port}`
  );
});
