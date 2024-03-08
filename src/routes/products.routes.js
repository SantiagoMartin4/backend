import { Router } from 'express';
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/productsController.js';




const productsRoutes = Router();

productsRoutes.get('/', getProducts)
productsRoutes.get('/:pId', getProductById)
productsRoutes.post('/', addProduct)
productsRoutes.put('/:pId', updateProduct)
productsRoutes.delete('/:pId', deleteProduct)


export default productsRoutes;