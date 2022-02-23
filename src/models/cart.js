const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      allowNull: false,
    },
    products: {
      type: Array,
    },
    estado: {
      type: String,
    },
  },
  { timestamps: true }
);

const carts = model("carts", cartSchema);
module.exports = { carts };
