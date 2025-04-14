const { Router } = require("express");

const router = Router();

const products = [
  {
    id: 1,
    name: "laptop",
    price: 1000,
  },
];



router.all("/", (req, res) =>{

  const title = "Probando ejs"

  res.render("index", {title})
})



router.get("/products", (req, res) => {
  res.json(products);
  // res.send("Obteniendo productos")
});

router.post("/products", (req, res) => {
  const newProduct = { ...req.body, id: products.length + 1 };
  products.push(newProduct);
  res.send("Enviando productos");
});

router.put("/products/:id", (req, res) => {
  const newData = req.body;
  const productFound = products.find(
    (product) => product.id === parseInt(req.params.id)
  );

  if (!productFound) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  Object.assign(productFound, newData);

  res.json({ message: "Producto actualizado", product: productFound });
});

router.delete("/products/:id", (req, res) => {
  const productIndex = products.findIndex(
    (product) => product.id === parseInt(req.params.id)
  );

  if (productIndex === -1) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  products.splice(productIndex, 1);

  res.send("El producto ha sido eliminado correctamente");
});

router.get("/products/:id", (req, res) => {
  const productFound = products.find(function (product) {
    return product.id === parseInt(req.params.id);
  });

  if (!productFound)
    return res.status(404).json({
      message: "Producto no encontrado",
    });

  res.json(productFound);
});

module.exports = router;
