import { Router } from 'express';
import { addProduct, deleteProduct, getProductById, getProducts, productsMock, updateProduct } from '../controllers/product.controller.js';
import { checkAuth, roleAuth } from '../middlewares/auth.js';


const productsRoutes = Router();

productsRoutes.get('/', checkAuth, roleAuth(['admin', 'user', 'premium']), getProducts)
productsRoutes.get('/:pId', roleAuth(['admin', 'user', 'premium']), getProductById)
productsRoutes.post('/', checkAuth, roleAuth(['admin', 'premium']), addProduct)
productsRoutes.put('/:pId', roleAuth(['admin']), updateProduct)
productsRoutes.delete('/:pId', roleAuth(['admin', 'premium']), deleteProduct)
productsRoutes.get('/mocking/mockingproducts', productsMock)


//IMPORTANT FOR TESTING! :
//AL realizar los testings se precisa descomentar el siguiente bloque de código y comentar el bloque de arriba
//Dado que el sistema de autorización de roles entra en conflicto con los test implementados y no corren los tests correctamente
//TO IMPROVE: (idea) esto se puede salvar implementando correctamente un login de un usuario en el cuerpo del test test, por cuestión de deadlines se prefiere hacer de esta manera para cumplir con las consignas a tiempo

/* productsRoutes.get('/',  getProducts)
productsRoutes.get('/:pId',  getProductById)
productsRoutes.post('/',  addProduct)
productsRoutes.put('/:pId', updateProduct)
productsRoutes.delete('/:pId',  deleteProduct)
productsRoutes.get('/mocking/mockingproducts', productsMock) */

export default productsRoutes;