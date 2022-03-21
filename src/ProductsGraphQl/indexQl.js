const express = require("express");

const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Product {
        id: Int,
        title: String,
        price: Float,
        items: Int
    }

    type Query {
        products: [Product]
        product(id: Int): Product      
    }
    type Mutation {
        createProduct(title: String, price: Float, items: Int): Product
    }
`);

let products = [];
let counter = 0;

const root = {
  products: () => {
    return products;
  },
  product: (args) => {
    return products.find((p) => p.id === args.id);
  },
  createProduct: (args) => {
    const product = {
      id: counter++,
      title: args.title,
      price: args.price,
      items: args.items,
    };
    products.push(product);
    return product;
  },
};

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
