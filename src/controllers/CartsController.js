const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoStore = require("connect-mongo");
const session = require("express-session");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views"));
const { carts } = require("../models/cart");

const getCarrito = async (req, res) => {
  try {
    await carts.findOne(
      { username: req.user.username, estado: "abierto" },
      async (err, cart) => {
        if (err) {
          logger.log("error", err.message);
        }
        if (!cart) {
          const newCart = {
            username: req.user.username,
            products: [],
            estado: "abierto",
          };
          await new carts(newCart).save();
        }
        res.json(cart);
      }
    );
  } catch (error) {
    logger.log("error", new Error("Error al acceder al carrito"));
  }
};

const getCloseCarrito = async (req, res) => {
  try {
    await carts.findOne(
      { username: req.user.username, estado: "abierto" },
      { $set: { estado: "comprado" } },
      async (err, cart) => {
        if (err) {
          logger.log("error", err.message);
        }
        try {
          let info = await transporter.sendMail({
            ...mailOrder,
            html: `<h3>Nuevo pedido de ${cart.username}</h3><p>${cart.products
              .map(
                (product) =>
                  `${product.title} - Precio: ${product.price} - Unidades: ${product.items}`
              )
              .join("<br>")}</p>`,
          });
          let message = await client.messages.create({
            ...twNewOrder,
            html: `<h3>Nuevo pedido de ${cart.username}</h3><p>${cart.products
              .map(
                (product) =>
                  `${product.title} - Precio: ${product.price} - Unidades: ${product.items}`
              )
              .join("<br>")}</p>`,
          });
          res.send("Pedido finalizado");
        } catch (error) {
          logger.log("error", new Error("Error al enviar las comunicaciones"));
        }
      }
    );
  } catch (error) {
    logger.log("error", new Error("Error al finalizar el pedido"));
  }
};

module.exports = { getCarrito, getCloseCarrito };
