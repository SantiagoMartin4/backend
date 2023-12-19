import { Router } from 'express';
import { Products } from '../ProductManager.js';


const productsRoutes = Router();


let productsData = new Products('./src/products.json');

productsRoutes.get('/', async (req, res) => {
    let { limit } = req.query;
    let products = await productsData.products();
    if (!limit) {
        return res.send(products);
    }
    let limitedProducts = products.slice(0, limit)
    res.send(limitedProducts);
});

productsRoutes.get('/:pid', async (req, res) => {
    let { pid } = req.params;
    try {
        let products = await productsData.productById(parseInt(pid));
        res.send(products);
        
    } catch (error) {
        res.status(404).send({message: 'cannot find product'})
    }
});

productsRoutes.post('/', (req, res) => {
    const product = req.body;
    productsData.addProduct(product);
    res.send({ message: 'product added' });
});

productsRoutes.put('/:pid', async (req, res) => {
    let { pid } = req.params;
    const updateProduct = req.body;
    await productsData.productById(parseInt(pid));
    await productsData.updateProduct(parseInt(pid), updateProduct);
    res.send({message: 'updated successfully'})
});

productsRoutes.delete('/:pid', async (req, res) => {
    let { pid } = req.params;
    const deleteSuccess = await productsData.deleteById(parseInt(pid));
    if(deleteSuccess){
        res.send({message: 'product deleted'})
    }
    else{
        res.status(404).send({message: 'invalid product id, cannot delete'})
    }
});

export default productsRoutes;


