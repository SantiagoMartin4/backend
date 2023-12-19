import { Router } from 'express';
import { Products } from '../ProductManager.js';

const viewsRoutes = Router();

let productsData = new Products('./src/products.json');

viewsRoutes.get('/', async (req, res) => {
    let products = await productsData.products();
    res.render('home', {products});
});

viewsRoutes.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {});
});


export default viewsRoutes;