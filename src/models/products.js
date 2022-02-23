const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      allowNull: false,
    },
    price: {
      type: Number,
      required: true,
    },
    items: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const products = model("products", productSchema);
module.exports = { products };
