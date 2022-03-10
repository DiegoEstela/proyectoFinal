const axios = require("axios");

const url = "https://jsonplaceholder.typicode.com/todos/1";

axios
  .get(url)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
