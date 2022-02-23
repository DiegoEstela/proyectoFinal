const { Router } = require("express");
const router = new Router();

const {
  getCarrito,
  getCloseCarrito,
} = require("../controllers/CartsController");

router.get("/carrito", getCarrito);
router.post("/finalizar", getCloseCarrito);

module.exports = router;
