const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

mongoose.connect(process.env.MONGO_DB);

mongoose.connection.on("open", () => {
  console.log("Base de datos conectada con exito");
});

mongoose.connection.on("error", () => {
  console.log("Error al conectarse a la base de datos");
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = model("user", userSchema);

module.exports = { userModel };
