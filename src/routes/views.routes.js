import { Router } from 'express';

import { productModel } from '../dao/models/products.model.js'

import { ProductMongoManager } from '../dao/managerDB/ProductMongoManager.js';
import { checkAuth, checkExistingUser } from '../middlewares/auth.js';


const viewsRoutes = Router();

const productManager = new ProductMongoManager();

viewsRoutes.get('/', checkAuth, async (req, res) => {
    const user = req.session.user;
    const products = await productModel.find().lean();
    res.render('products', {products, user});
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

export default viewsRoutes;