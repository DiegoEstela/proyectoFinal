const https = require("https");

const url = "http://localhost:8081/productos";

const options = {
  hostname: "http://localhost:8081",
  port: 443,
  path: "/productos",
  method: "GET",
};

const request = https.request(options, (response) => {
  let data = "";
  response.on("data", (chunk) => {
    data += chunk.toString();
  });

  response.on("end", () => {
    console.log(data);
    const body = JSON.parse(data);
    console.log(body);
  });
});
