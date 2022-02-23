const express = require("express");
const app = express();
const PORT = process.env.PORT || 8081;
app.set("views", process.cwd() + "/src/views");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views"));
const userRoute = require("./routes/userRoute");

app.use("/user", userRoute);

const server = app.listen(PORT, () => {
  console.log(
    `Servidor http escuchando en el puerto: ${server.address().port}`
  );
});
