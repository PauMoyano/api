const server = require("express").Router();
const {createProduct, addCategoryToProduct } = require("../../controllers/products/post.products");

//const {protectorUser} = require("../../middlewares/protector.middleware");

var nJwt = require('njwt');

server.post("/", (req, res, next) => {
  console.log(req.body);
  let { name, description, marca, price,stock} = req.body;

  let files = req.files;
  console.log(files)
  let imgToDb = files[0].filename;

  let product = {
    name: name,
    description: description,
    marca: marca,
    price: price,
    stock:stock,
    image: imgToDb,
  };

  return createProduct(product).then((product) => {
      res.status(200).json(product);
    }).catch((error) => {
      res.status(400).json(error);
    });
});

// AGREGAR CATEGORIAS A PRODUCTOS
server.post("/:idProducto/category/:idCategoria", async (req, res) => {
  let { idProducto, idCategoria } = req.params;

  return addCategoryToProduct(idProducto, idCategoria ).then((data)=>{
    return res.status(201).send("Category added!");
  }).catch(error => {
    return res.status(400).send({ data: error });
  });   
});

module.exports = server;