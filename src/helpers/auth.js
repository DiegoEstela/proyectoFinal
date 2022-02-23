const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const configPassport = require("../passport");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const auth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
};

module.exports = auth;
