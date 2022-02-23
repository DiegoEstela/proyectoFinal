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

const userSchema = new Schema(
  {
    username: {
      type: String,
      allowNull: false,
      unique: true,
    },
    password: {
      type: String,
      allowNull: false,
    },
    nombre: {
      type: String,
      required: true,
      allowNull: false,
    },
    edad: {
      type: Number,
      required: true,
      allowNull: false,
    },
    direccion: {
      type: String,
      required: true,
      allowNull: false,
    },
    tel: {
      type: Number,
      required: true,
      allowNull: false,
    },
    avatar: {
      data: Buffer,
      contentType: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    cart: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const userModel = model("user", userSchema);

module.exports = { userModel };
