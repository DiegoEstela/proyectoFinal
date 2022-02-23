const express = require("express");
const app = express();
const dotenv = require("dotenv");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const { passport } = require("../passport");
const bodyParser = require("body-parser");
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views"));

app.use(
  session({
    store: mongoStore.create({
      mongoUrl: process.env.MONGO_DB,
    }),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const getHome = (req, res) => {
  res.render("home");
};

const getLogin = (req, res) => {
  res.render("login");
};

const getSignup = (req, res) => {
  res.render("signup");
};

const getLogOut = (req, res) => {
  req.logOut();
  res.redirect("/login");
};

const PostSignup = passport.authenticate("local-signup", {
  successRedirect: "/login",
  failureRedirect: "/signup",
});

const postLogin = passport.authenticate("local-login", {
  successRedirect: "/",
  failureRedirect: "/login",
});

module.exports = {
  getLogin,
  getSignup,
  PostSignup,
  getLogOut,
  getHome,
  postLogin,
};
