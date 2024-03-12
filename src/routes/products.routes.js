import { Router } from 'express';
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/product.controller.js';
import { authorization } from '../middlewares/auth.js';




const productsRoutes = Router();

productsRoutes.get('/', authorization('user'), getProducts)
productsRoutes.get('/:pId', authorization('user'), getProductById)
productsRoutes.post('/', authorization('admin') ,addProduct)
productsRoutes.put('/:pId', authorization('admin'), updateProduct)
productsRoutes.delete('/:pId', authorization('admin'), deleteProduct)


export default productsRoutes;