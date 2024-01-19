import { Router } from 'express';
/* import { Products } from '../dao/ProductManager.js'; */
/* import { productModel } from '../dao/models/products.model.js' */
import { ProductMongoManager } from '../dao/managerDB/ProductMongoManager.js';

import { productModel } from '../dao/models/products.model.js';


const productsRoutes = Router();


/* let productsData = new Products('./src/products.json'); */


productsRoutes.get('/', async (req, res) => {
    try {
        const { limit = 10, page = 1, query = '', sort = '' } = req.query;
        const products = new ProductMongoManager();
        const resultado = await products.getProducts(limit, page, query, sort);
        if (resultado) {
            res.send(resultado);
        }
        else {
            res.status(400).json({ message: 'could not found product' })
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Something went terribly wrong' });
    }
});

productsRoutes.get("/:pId", async (req, res) => {
    try {
        const { pId } = req.params
        const products = new ProductMongoManager()

        const resultado = await products.getProductById(pId)
        if (resultado.message === "OK") {
            return res.status(200).json(resultado)
        }
        res.status(400).json(resultado)
    }
    catch (err) {
        res.status(400).json({ message: "El producto no existe" })
    }
})

productsRoutes.post('/', async (req, res) => {
    try {
        const newProduct = req.body;
        const added = await productModel.create(newProduct);
        res.status(201).json({message: 'Product added'});
    } catch (error) {
        console.error({error});
        res.status(400).json({error})
    }
});

productsRoutes.put('/:pId', async (req, res) => {
    try {
        const { pId } = req.params
        const updateProd = req.body
        const products = new ProductMongoManager()

        const resultado = await products.updateProduct(pId, updateProd)

        if (resultado.message === "OK") {
            return res.status(200).json(resultado)
        }
        res.status(400).json(resultado)
    }
    catch (err) {
        res.status(400).json({ menssage: 'err' })
    }
})

productsRoutes.delete('/:pId', async (req, res) => {
    try {
        const { pId } = req.params
        const products = new ProductMongoManager()

        const deleted = await products.deleteProduct(pId)

        if (deleted.message === "OK")
            return res.status(200).json(deleted.rdo)

        return res.status(404).json(deleted.rdo)
    }
    catch (err) {
        res.status(400).json({ menssage: err })
    }
})







// -------------- Métodos anteriores que funcionaban con la lógica sin separar en ProductMongoManager.js

// get product by Id con mongoose
/* 
productsRoutes.get('/:pid', async (req, res) => {
    let { pid } = req.params;
    try {
        const products = await productModel.findOne({_id: pid});
        if(!products){
            return res.status(404).json({message: 'Cannot find product'});
        }
        res.send({products});
    } catch (error) {
        console.error(error)
        res.status(400).send({error})
    }
}) */

// post product con mongoose

/* productsRoutes.post('/', async (req, res) => {
    try {
        const newProduct = req.body;
        const added = await productModel.create(newProduct);
        res.status(201).json({message: 'Product added'});
    } catch (error) {
        console.error({error});
        res.status(400).json({error})
    }
});
 */

// delete product con mongoose

/* productsRoutes.delete('/:pid', async (req, res) =>{
    const { pid } = req.params;
    try {
        const productDeleted = await productModel.deleteOne({_id: pid});
        if(productDeleted.deletedCount > 0){
            return res.send({message: 'product deleted'})
        } 
        res.status(404).json({messsage: 'product not found'})
    } catch (error) {
        console.log(error);
        res.status(400).send({error});
    }
}); */


// put para actualizar un producto con mongoose

/* productsRoutes.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    const productToUpdate = req.body;
    try {
        const update = await productModel.updateOne({_id : pid}, productToUpdate);
        if(update.modifiedCount > 0){
            return res.send({message: 'product updated successfully'})
        }
        res.status(404).json({message: 'product not found'})
    } catch (error) {
        console.error(error);
        res.status(400).send({error});        
    }
})
 */


// Métodos anteriores de products.routes que funcionaban con File System

/* 
productsRoutes.get('/', async (req, res) => {
    let { limit } = req.query;
    let products = await productsData.products();
    if (!limit) {
        return res.send(products);
    }
    let limitedProducts = products.slice(0, limit)
    res.send(limitedProducts);
}); */


/* productsRoutes.get('/:pid', async (req, res) => {
    let { pid } = req.params;
    try {
        let products = await productsData.productById(parseInt(pid));
        res.send(products);
        
    } catch (error) {
        res.status(404).send({message: 'cannot find product'})
    }
}); */


/* productsRoutes.post('/', (req, res) => {
    const product = req.body;
    productsData.addProduct(product);
    res.send({ message: 'product added' });
}); */

/* productsRoutes.put('/:pid', async (req, res) => {
    let { pid } = req.params;
    const updateProduct = req.body;
    await productsData.productById(parseInt(pid));
    await productsData.updateProduct(parseInt(pid), updateProduct);
    res.send({message: 'updated successfully'})
}); */

/* productsRoutes.delete('/:pid', async (req, res) => {
    let { pid } = req.params;
    const deleteSuccess = await productsData.deleteById(parseInt(pid));
    if(deleteSuccess){
        res.send({message: 'product deleted'})
    }
    else{
        res.status(404).send({message: 'invalid product id, cannot delete'})
    }
}); */

export default productsRoutes;


