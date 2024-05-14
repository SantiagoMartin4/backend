import { Router } from 'express';
import { ProductMongoManager } from '../dao/managerDB/ProductMongoManager.js';
import { checkAuth, checkExistingUser } from '../middlewares/auth.js';
import { getUserCart } from '../controllers/cart.controller.js';
/* import { cartModel }  from '../dao/models/carts.model.js' */

const viewsRoutes = Router();

const productManager = new ProductMongoManager();

viewsRoutes.get('/', checkAuth, (req, res) => {
});

viewsRoutes.get('/login', checkExistingUser, (req, res) => {
    res.render('login');
});

viewsRoutes.get('/register', checkExistingUser, (req, res) => {
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
        productsData.userCart = user.cart;
        res.render('products', { ...productsData, userCart: user.cart })
    } catch (error) {
        console.log(error)
    }
});


viewsRoutes.get('/cart', checkAuth, async (req, res) => {
        const { user } = req.session;
        const cartData = await getUserCart(user.cart);
        res.render('cart', { cartData });
});



viewsRoutes.get('/restore-password', checkExistingUser, (req, res) => {
    res.render('restore-password');
});

viewsRoutes.get('/forgot-password', (req, res) => {
    res.render('forgot-password');
})

viewsRoutes.get('/faillogin', (req, res) => {
    res.render('faillogin');
});

viewsRoutes.get('/failregister', (req, res) => {
    res.render('failregister');
});

export default viewsRoutes;