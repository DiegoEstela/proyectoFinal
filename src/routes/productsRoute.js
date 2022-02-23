const { Router } = require("express");
const router = new Router();
const {
  postProductAdmin,
  getProducts,
  getProductsbyId,
} = require("../controllers/ProductController");

router.get("/productos", getProducts);
router.post("/productosAdmin", postProductAdmin);
router.get("/productos/:id", getProductsbyId);

module.exports = router;
