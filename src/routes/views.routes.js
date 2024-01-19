import { Router } from 'express';

import {productModel} from '../dao/models/products.model.js'

import { ProductMongoManager } from '../dao/managerDB/ProductMongoManager.js';

/* import { Products } from '../dao/ProductManager.js'; */


const viewsRoutes = Router();

const productManager = new ProductMongoManager();

viewsRoutes.get('/', async (req, res) => {
    const products = await productModel.find().lean();
    res.render('home', {products});
});

viewsRoutes.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {});
});

viewsRoutes.get('/products', async (req, res) => {
    const { page } = req.query;
    const productsData = await productManager.getProducts(10, page);
    res.render('products', productsData)
});







/* viewsRoutes.get('/chat', (req, res) => {
    res.render('chat', {});
}); */
// Código antiguo de la lógica que funcionaba con fs

/* let productsData = new Products('./src/products.json');

viewsRoutes.get('/', async (req, res) => {
    let products = await productsData.products();
    res.render('home', {products});
}); */



export default viewsRoutes;