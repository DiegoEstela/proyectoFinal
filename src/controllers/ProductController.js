const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoStore = require("connect-mongo");
const session = require("express-session");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views"));
const { products } = require("../models/products");
const { carts } = require("../models/cart");

app.use(
  session({
    store: mongoStore.create({
      mongoUrl: process.env.MONGO_DB_PRODUCTOS,
    }),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
  })
);

const getProducts = async (req, res) => {
  try {
    await products.find({}, (err, products) => {
      if (err) {
        logger.log("error", err.message);
      }
      res.json(products);
    });
  } catch (error) {
    console.log(error);
  }
};

const postProductAdmin = async (req, res) => {
  try {
    const newProd = {
      title: req.body.title,
      price: req.body.price,
      items: req.body.items,
    };
    await new products(newProd).save();
    res.send("Producto guardado");
  } catch (error) {
    res.send(error);
  }
};

const getProductsbyId = async (req, res) => {
  try {
    await products.findOne({ _id: req.params.id }, async (err, product) => {
      if (err) {
        console.log("error", err.message);
      }
      await carts.findOneAndUpdate(
        { username: req.user.username, estado: "abierto" },
        { $push: { products: product } },
        (err, cart) => {
          if (err) {
            console.log("error", err.message);
          }
          res.send(cart);
        }
      );
    });
  } catch (error) {
    logger.log("error", new Error("Error al obtener informacion del producto"));
    res.send(error);
  }
};

module.exports = { postProductAdmin, getProducts, getProductsbyId };
