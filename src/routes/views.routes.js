import { Router } from 'express';

/* import { productModel } from '../dao/models/products.model.js' */

import { ProductMongoManager } from '../dao/managerDB/ProductMongoManager.js';
import { checkAuth, checkExistingUser } from '../middlewares/auth.js';

/* import { Products } from '../dao/ProductManager.js'; */


const viewsRoutes = Router();

const productManager = new ProductMongoManager();

viewsRoutes.get('/', checkAuth, (req, res) => {
    return res.redirect('/products')
/*     const products = await productModel.find().lean();
    res.render('home', {products}); */
});

viewsRoutes.get('/login', checkExistingUser, (req,res) => {

    res.render('login');    
});

viewsRoutes.get('/register', checkExistingUser, (req,res) => {
    res.render('register');    
});




viewsRoutes.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {});
});

viewsRoutes.get('/products', checkAuth, async (req, res) => {
    const { page } = req.query;
    const { user } = req.session;
    const productsData = await productManager.getProducts(10, page);
    productsData.firstName = user.firstName;
    productsData.lastName = user.lastName;
    res.render('products', productsData)
});


viewsRoutes.get('/restore-password', checkExistingUser, (req, res) =>{
    res.render('restore-password');
});

viewsRoutes.get('/faillogin', (req,res) => {
    res.render('faillogin');
});

viewsRoutes.get('/failregister', (req,res) => {
    res.render('failregister');
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