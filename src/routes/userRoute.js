const { Router } = require("express");
const router = new Router();
const {
  getLogin,
  getSignup,
  PostSignup,
  getLogOut,
  getHome,
  postLogin,
} = require("../controllers/UserController");

router.get("/", getHome);
router.get("/login", getLogin);
router.post("/login", postLogin);
router.get("/signup", getSignup);
router.post("/signup", PostSignup);
router.get("/logout", getLogOut);

module.exports = router;
