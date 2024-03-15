import { Router } from 'express';
import { getCarts, getCartById, addCart, addProductsInCart, deleteAllProductsInCart, deleteProductInCart, updateCart, updateProductInCart, purchaseCart } from '../controllers/cart.controller.js';

const cartsRoutes = Router();


cartsRoutes.get('/', getCarts)
cartsRoutes.get('/:cId', getCartById)
cartsRoutes.post('/', addCart)
cartsRoutes.post("/:cId/product/:pId", addProductsInCart)
cartsRoutes.delete('/:cId', deleteAllProductsInCart)
cartsRoutes.delete('/:cId/products/:pId', deleteProductInCart)
cartsRoutes.put('/:cId', updateCart)
cartsRoutes.put('/:cId/products/:pId', updateProductInCart)
cartsRoutes.post('/:cId/purchase', purchaseCart)


export default cartsRoutes;