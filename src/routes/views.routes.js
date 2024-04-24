import { Router } from 'express';

import { productModel } from '../dao/models/products.model.js'

import { ProductMongoManager } from '../dao/managerDB/ProductMongoManager.js';
import { checkAuth, checkExistingUser } from '../middlewares/auth.js';


const viewsRoutes = Router();

const productManager = new ProductMongoManager();

viewsRoutes.get('/', checkAuth, (req, res) => {
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

// TO DO : SACAR LOGICA DE /PRODUCTS DE ESTE ROUTER. VER BIEN DONDE VA

viewsRoutes.get('/products', checkAuth, async (req, res) => {
    try {
            const { page } = req.query;
    const { user } = req.session;
    const productsData = await productManager.getProducts(10, page);
    productsData.firstName = user.firstName;
    productsData.lastName = user.lastName;
    res.render('products', productsData)
    } catch (error) {
        console.log(error)
    }
});


viewsRoutes.get('/restore-password', checkExistingUser, (req, res) =>{
    res.render('restore-password');
});

viewsRoutes.get('/forgot-password', (req, res) => {
    res.render('forgot-password');
})

viewsRoutes.get('/faillogin', (req,res) => {
    res.render('faillogin');
});

viewsRoutes.get('/failregister', (req,res) => {
    res.render('failregister');
});

export default viewsRoutes;