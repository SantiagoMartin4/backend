import { Router } from 'express';
import { addProduct, deleteProduct, getProductById, getProducts, productsMock, updateProduct } from '../controllers/product.controller.js';
import {roleAuth } from '../middlewares/auth.js';


const productsRoutes = Router();

productsRoutes.get('/', roleAuth(['admin', 'user', 'premium']), getProducts)
productsRoutes.get('/:pId', roleAuth(['admin', 'user', 'premium']), getProductById)
productsRoutes.post('/', roleAuth(['admin', 'premium']), addProduct)
productsRoutes.put('/:pId', roleAuth(['admin']), updateProduct)
productsRoutes.delete('/:pId', roleAuth(['admin', 'premium']), deleteProduct)
productsRoutes.get('/mocking/mockingproducts', productsMock)


export default productsRoutes;