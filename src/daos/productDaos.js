let productosDao;
let carritoDao;
let usuarioDao;

const pers = "MongoDB";

switch (pers) {
  case "file":
    const { ProductoFile, CarritoFile } = await import(
      "../containers/ContainerFs"
    );

    productosDao = new ProductoFile("./db/productos.json");
    carritoDao = new CarritoFile("./db/carrito.json");
    break;

  case "MongoDB":
    const { ProductoMongo, CarritoMongo } = await import(
      "../containers/ContainerMongo"
    );
    productosDao = new ProductoMongo("productos");
    carritoDao = new CarritoMongo("carritos");

    break;
}

export { productosDao, carritoDao, usuarioDao, pers };
