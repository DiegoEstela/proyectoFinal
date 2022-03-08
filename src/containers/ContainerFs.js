const fs = require("fs");

export class ProductoFile {
  constructor(fileName) {
    this.fileName = fileName;
  }
  async getAll() {
    try {
      const data = await fs.promises.readFile(this.fileName, "utf-8");
      const products = await JSON.parse(data, null, 2);
      console.log("file content: ", products);
      return products;
    } catch (err) {
      console.log("Error :", err);
    }
  }

  async getById(id) {
    try {
      const data = await fs.promises.readFile(this.fileName, "utf-8");
      const products = await JSON.parse(data, null, 2);
      let Inquired = products.find((book) => book.id === id);
      if (Inquired != null) {
        return Inquired;
      }
      return { error: "producto no encontrado" };
    } catch (err) {
      console.log("Error :", err);
    }
  }

  async save(obj) {
    try {
      const data = await fs.promises.readFile(this.fileName, "utf-8");
      console.log("File read.");
      const products = await JSON.parse(data, null, 2);
      if (products.length != 0) {
        //If the file is not empty
        const idsList = [];
        for (let product of products) {
          //Create a list of ids
          idsList.push(product.id);
        }
        let top = Math.max.apply(Math, idsList) + 1;
        products.push({
          ...obj,
          id: top,
          timestamp: new Date().toLocaleString(),
        });
        await fs.promises.writeFile(
          this.fileName,
          JSON.stringify(products, null, 2)
        );
        return products[products.length - 1];
      }
      console.log("File empty.");
      products.push({ ...obj, id: 1 });
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(products, null, 2)
      );
      return "Id ingresado: 1";
    } catch (err) {
      console.log("Error :", err);
    }
  }

  async deleteById(id) {
    try {
      const data = await fs.promises.readFile(this.fileName, "utf-8");
      let products = await JSON.parse(data, null, 2);
      let Inquired = products.find((book) => book.id === id);
      let idToDelete = products.indexOf(Inquired);

      if (idToDelete == -1) {
        return { error: "prod no encontrado" };
      }
      products.splice(idToDelete, 1);
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(products, null, 2)
      );
    } catch (err) {
      console.log("Error :", err);
    }
  }

  async deleteAll() {
    await fs.promises.writeFile(this.fileName, JSON.stringify([], null, 2));
  }
  catch(err) {
    console.log("Error :", err);
  }

  async updateById(idNumber, newValue) {
    try {
      const data = await fs.promises.readFile(this.fileName, "utf-8");
      let products = await JSON.parse(data, null, 2);
      let bookInquired = products.find((book) => book.id === idNumber);
      let idToUpdate = products.indexOf(bookInquired);
      if (idToUpdate == -1) {
        return { error: "producto no encontrado" };
      } else {
        products.splice(idToUpdate, 1);
        products.push({ ...bookInquired, ...newValue });
        await fs.promises.writeFile(
          this.fileName,
          JSON.stringify(products, null, 2)
        );
        return products[products.length - 1];
      }
    } catch (err) {
      console.log("Error :", err);
    }
  }
}

export class CarritoFile {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async saveCart() {
    try {
      const cartData = await fs.promises.readFile(this.fileName, "utf-8");
      console.log("File carrito.json read.");
      const cart = await JSON.parse(cartData, null, 2);
      if (cart.length != 0) {
        //If the file is not empty
        cart.push({
          id: uuidv4(),
          timestamp: new Date().toLocaleString(),
          productos: [],
        });
        await fs.promises.writeFile(
          this.fileName,
          JSON.stringify(cart, null, 2)
        );
        console.log("New cart: ", cart[cart.length - 1]);
        return cart[cart.length - 1].id;
      }
      cart.push({ id: uuidv4(), timestamp: Date.now(), productos: [] });
      await fs.promises.writeFile(this.fileName, JSON.stringify(cart, null, 2));
      console.log("New cart: ", cart[cart.length - 1]);
      return cart[cart.length - 1].id;
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  async deleteCartById(cartId) {
    try {
      const cartData = await fs.promises.readFile(this.fileName, "utf-8");
      console.log("File carrito.json read.");
      const cart = await JSON.parse(cartData, null, 2);
      let cartToDelete = cart.find((cart) => cart.id == cartId);
      console.log("Cart to delete: ", cartToDelete);
      if (cartToDelete != undefined) {
        cart.splice(cart.indexOf(cartToDelete), 1);
        await fs.promises.writeFile(
          this.fileName,
          JSON.stringify(cart, null, 2)
        );
        console.log("Cart deleted: ", cart);
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  async getCartById(cartId) {
    try {
      const cartData = await fs.promises.readFile(this.fileName, "utf-8");
      const cart = await JSON.parse(cartData, null, 2);
      console.log("file content: ", cart);
      let cartToGet = cart.find((cart) => cart.id == cartId);
      console.log("Cart to get: ", cartToGet);
      if (cartToGet != undefined) {
        return cartToGet;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async updateCart(cart) {
    try {
      const cartData = await fs.promises.readFile(this.fileName, "utf-8");
      const cartAll = await JSON.parse(cartData, null, 2);
      const cartId = cart.id;
      let cartToAdd = cartAll.find((cart) => cart.id == cartId);
      if (cartToAdd != undefined) {
        const index = cartAll.indexOf(cartToAdd);
        cartAll[index] = cart;
        await fs.promises.writeFile(
          this.fileName,
          JSON.stringify(cartAll, null, 2)
        );
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  }
}
