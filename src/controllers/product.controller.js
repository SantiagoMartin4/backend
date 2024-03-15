import { ProductMongoManager } from '../dao/managerDB/ProductMongoManager.js';
import { productModel } from '../dao/models/products.model.js';
import ProductDTO from '../dao/dtos/product.dto.js';

const productController = new ProductMongoManager();

export const getProducts = async (req, res) => {
    try {
        const { limit = 10, page = 1, query = '', sort = '' } = req.query;
        const resultado = await productController.getProducts(limit, page, query, sort);
        if (resultado) {
            res.send(resultado);
        }
        else {
            res.status(400).json({ message: 'could not found product' })
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Something went terribly wrong' });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { pId } = req.params
        const resultado = await productController.getProductById(pId)
        if (resultado.message === "OK") {
            return res.status(200).json(resultado)
        }
        res.status(400).json(resultado)
    }
    catch (err) {
        res.status(400).json({ message: "El producto no existe" })
    }
};

export const addProduct = async (req, res) => {
    const newProduct = new ProductDTO(req.body);
    const addedProduct = await productModel.create(newProduct);
    if (!addedProduct) {
        return res.status(400).send({message: "Error adding product"});
    }
    return res.status(201).send({message: 'Product added'})
/*     try {
        //se puede implementar aca el DTO, para cuando se verifica que venga con un formato en el body
        const newProduct = req.body;
        const added = await productModel.create(newProduct);
        res.status(201).json({message: 'Product added'});
    } catch (error) {
        console.error({error});
        res.status(400).json({error})
    } */
};

export const updateProduct = async (req, res) => {
    try {
        const { pId } = req.params
        const updateProd = req.body
        const resultado = await productController.updateProduct(pId, updateProd)

        if (resultado.message === "OK") {
            return res.status(200).json(resultado)
        }
        res.status(400).json(resultado)
    }
    catch (err) {
        res.status(400).json({ menssage: 'err' })
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { pId } = req.params
        const deleted = await productController.deleteProduct(pId)

        if (deleted.message === "OK")
            return res.status(200).json(deleted.rdo)

        return res.status(404).json(deleted.rdo)
    }
    catch (err) {
        res.status(400).json({ menssage: err })
    }
};
