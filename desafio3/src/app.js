import express from 'express';
import { ProductManager } from './ProductManager.js';

const PORT = 8080;
const app = express();
app.use(express.urlencoded({extended: true}));

const productManager = new ProductManager('./products.json');

app.get('/products', async (req, res) => {
    let {limit} = req.query;
    let products = await productManager.getProducts();
    if(!limit){
        return res.send(products);
    }
    let limitedProducts = products.slice(0, limit)
    res.send(limitedProducts);
});

app.get('/products/:pid', async (req,res) => {
    let { pid } = req.params;
    let products = await productManager.getProductById(parseInt(pid));
    res.send(products);
})



app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`)
});