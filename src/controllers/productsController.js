import { ProductMongoManager } from '../dao/managerDB/ProductMongoManager.js';
import { productModel } from '../dao/models/products.model.js';



export const getProducts = async (req, res) => {
    try {
        const { limit = 10, page = 1, query = '', sort = '' } = req.query;
        const products = new ProductMongoManager();
        const resultado = await products.getProducts(limit, page, query, sort);
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
        const products = new ProductMongoManager()

        const resultado = await products.getProductById(pId)
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
    try {
        const newProduct = req.body;
        const added = await productModel.create(newProduct);
        res.status(201).json({message: 'Product added'});
    } catch (error) {
        console.error({error});
        res.status(400).json({error})
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { pId } = req.params
        const updateProd = req.body
        const products = new ProductMongoManager()

        const resultado = await products.updateProduct(pId, updateProd)

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
        const products = new ProductMongoManager()

        const deleted = await products.deleteProduct(pId)

        if (deleted.message === "OK")
            return res.status(200).json(deleted.rdo)

        return res.status(404).json(deleted.rdo)
    }
    catch (err) {
        res.status(400).json({ menssage: err })
    }
};
