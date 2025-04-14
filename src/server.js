const express = require("express");
const morgan = require("morgan");
const path = require("path")


const app = express();

//Middleware

app.use(morgan("dev"));
app.use(express.json());

//----------------------
const products = [
  {
    id: 1,
    name: "laptop",
    price: 1000,
  },
];

//Routes

app.get("/products", (req, res) => {
  res.json(products);
  // res.send("Obteniendo productos")
});

app.post("/products", (req, res) => {
  const newProduct = { ...req.body, id: products.length + 1 };
  products.push(newProduct);
  res.send("Enviando productos");
});

app.put("/products/:id", (req, res) => {
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

app.delete("/products/:id", (req, res) => {
  const productIndex = products.findIndex(
    (product) => product.id === parseInt(req.params.id)
  );

  if (productIndex === -1) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  products.splice(productIndex, 1);

  res.send("El producto ha sido eliminado correctamente");
});

app.get("/products/:id", (req, res) => {
  const productFound = products.find(function (product) {
    return product.id === parseInt(req.params.id);
  });

  if (!productFound)
    return res.status(404).json({
      message: "Producto no encontrado",
    });

  res.json(productFound);
});

//Static

app.use("/static", express.static(path.join(__dirname, "static")));

//Settings
app.set("appName", "Express RestAPI");
app.set("port", 3000);

app.listen(3000);
console.log(
  `Server ${app.get("appName")} is listening on port http://localhost:${app.get(
    "port"
  )}`
);
