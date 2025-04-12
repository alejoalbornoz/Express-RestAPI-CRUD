const express = require("express");
const morgan = require("morgan")


const app = express()
app.use(morgan("dev"))
app.use(express.json())


const products = [{
    id:1,
    name:"laptop",
    price: 1000
}]








app.get("/products", (req, res)=>{
    res.json(products)
    // res.send("Obteniendo productos")
})

app.post("/products", (req, res)=>{
    const newProduct = {...req.body, id: products.length + 1}
    products.push(newProduct)
    res.send("Enviando productos")
})

app.put("/products", (req, res)=>{
    res.send("Actualizando productos")
})

app.delete("/products", (req, res)=>{
    res.send("Eliminando productos")
})

app.get("/products/:id", (req, res)=>{

    const productFound = products.find(function (product){
        return product.id === parseInt(req.params.id)
    })

    if (!productFound) return res.json({
        message:"Producto no encontrado"
    })


    console.log(productFound)
    res.json(productFound)

})








app.listen(3000);
console.log(`Server is listening on port http://localhost:3000`);