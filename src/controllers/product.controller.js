import { ProductMongoManager } from '../dao/managerDB/ProductMongoManager.js';
/* import { productModel } from '../dao/models/products.model.js'; */
import ProductDTO from '../dao/dtos/product.dto.js';
import customErrors from '../services/errors/customErrors.js';
import errorEnum from '../services/errors/error.enum.js';
import { generateProductErrorInfo, productNotFound } from '../services/errors/info.js';
import { generateProduct } from '../utils/faker.js';


const productController = new ProductMongoManager();

export const getProducts = async (req, res) => {
    try {
        const { limit = 10, page = 1, query = '', sort = '' } = req.query;
        const resultado = await productController.getProducts(limit, page, query, sort);
        if (resultado) {
            req.logger.info('Products found')
            res.send(resultado);
        }
        else {
            req.logger.error('Products NOT found')
            res.status(400).json({ message: 'could not get products' })
        }
    } catch (error) {
        req.logger.error('Products NOT found')
        res.status(400).json({ message: 'Something went terribly wrong' });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { pId } = req.params
        const resultado = await productController.getProductById(pId)
/*         if (resultado.message === "OK") {
            req.logger.info('Products found')
            return res.status(200).json(resultado)
        } */
        req.logger.info('Products found')
        res.status(200).json(resultado)
    }
    catch (err) {
        req.logger.error('Products NOT found')
        res.status(400).json({ message: "El producto no existe" })
    }
};

export const addProduct = async (req, res) => {
    const newProduct = new ProductDTO(req.body);
    if (!newProduct.title || !newProduct.description || !newProduct.category || !newProduct.code || !newProduct.stock || !newProduct.thumbnail || !newProduct.price) {
        customErrors.createError({
            name: 'Attempt to create product failed',
            cause: generateProductErrorInfo(newProduct),
            message: 'Error ocurred while trying to create product',
            code: errorEnum.INVALID_TYPE_ERROR
        });
    }
    const addedProduct = await productController.addProduct(newProduct);
    if (!addedProduct) {
        req.logger.error('Products NOT added')
        return res.status(400).send({message: "Error adding product"});
    }
    req.logger.info('Products added')
    return res.status(201).send({message: 'Product added'})
};

export const updateProduct = async (req, res) => {
    try {
        const { pId } = req.params
        const updateProd = req.body
        const resultado = await productController.updateProduct(pId, updateProd)

        if (resultado.message === "OK") {
            req.logger.info('Products updated')
            return res.status(200).json(resultado)
        }
/*         res.status(200).json(resultado) */
    }
    catch (err) {
        req.logger.error('Product not updated')
        res.status(400).json({ menssage: 'err' })
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { pId } = req.params
        const deleted = await productController.deleteProduct(pId)

/*         if (deleted.message === "OK")
            return res.status(200).json(deleted.rdo)
 */
        req.logger.info('Product deleted')
        return res.status(200).json(deleted)
    }
    catch (err) {
        req.logger.error('Product NOT deleted')
        res.status(400).json({ menssage: err })
    }
};

export const productsMock = (req, res) => {
    const users = [];
    for(let i=0; i<100; i++){
        users.push(generateProduct())
    }
    req.logger.info('products MOCK')
    res.send({status: 'success', payload: users})
}