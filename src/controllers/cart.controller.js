import { cartModel } from '../dao/models/carts.model.js';
import { CartMongoManager } from '../dao/managerDB/CartMongoManager.js'

const cartController = new CartMongoManager()

export const getCarts = async (req, res) => {
    const carts = await cartController.getCarts();
    try {
        const { limit } = req.query;
        const cartData = await cartModel.find().lean();
        if (!limit) {
            return res.status(200).send(cartData);
        }
        const productsLimit = cartData.slice(0, limit)
        return res.status(200).send(productsLimit)
    } catch (error) {
        res.status(400).send({ message: 'cannot get carts' })
    }
}

export const getCartById = async (req, res) => {
    let { cid } = req.params;
    try {
        const cartData = await cartModel.findOne({ _id: cid }).populate('products.product');
        res.status(200).send({ cartData });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'something went wrong' })
    }
};

//------------------ LÓGICA DE CART MANAGER CON MONGOOSE SEPARADO EN CART MONGO MANAGER:

//--------- POST  -  Añadir carrito Vacío

export const addCart = async (req, res) => {

    try {
        const carts = new CartMongoManager()
        const resultado = await carts.addCart({ products: [] })
        if (resultado.message === "OK") {
            return res.status(200).json(resultado)
        }
        res.status(400).json(resultado)
    }
    catch (err) {
        res.status(400).json({ message: err })
    }
};

// --------------- 

export const addProductsInCart = async (req, res) => {
    try {
        const { cId, pId } = req.params
        const newQuantity = req.body.quantity
        const carts = new CartMongoManager()
        console.log({ cId, pId, newQuantity });
        const result = await carts.addProductsInCart(cId, pId, newQuantity)

        if (result) {
            return res.status(200).json({ message: 'Product added' });
        }
        res.status(400).json({ message: 'could not add product' });
    }
    catch (err) {
        res.status(400).send({ err });
    }
};

//--- DELETE   -  Eliminar todos los productos del carrito

export const deleteAllProductsInCart = async (req, res) => {
    try {
        const { cId } = req.params
        const carts = new CartMongoManager()

        const deleted = await carts.deleteAllProductsInCart(cId);

        if (deleted)
            return res.status(200).json({ message: 'Products deleted' });

        return res.status(404).json({ menssage: 'could not delete products' });
    }
    catch (err) {
        res.status(400).json({ menssage: err })
    }
}

//--- DELETE   -  Eliminar producto de carrito

export const deleteProductInCart = async (req, res) => {
    const { cId, pId } = req.params;
    const cartManager = new CartMongoManager();
    try {
        const deleted = await cartManager.deleteProdInCart(cId, pId);
        if (deleted) {
            res.send({ message: 'Product deleted' });
        }
        else {
            res.status(400).json({ message: 'could not delete product' });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'could not delete product' });
    }
};

//- --------- PUT para agregar productos a carritos

export const updateCart = async (req, res) => {
    const cartManager = new CartMongoManager();
    const { cId } = req.params;
    const cart = req.body;
    try {
        const result = await cartManager.updateCart(cId, cart);
        if (result.modifiedCount > 0) {
            res.send({ message: 'Cart updated' });
        }
        else {
            res.status(400).send({ message: 'Could not update cart' });
        }
    } catch (error) {
        console.error(error);
        res.status(400).send({ message: 'Could not update cart' });
    }
};

export const updateProductInCart = async (req, res) => {
    const { cId, pId } = req.params;
    const { quantity } = req.body;
    const cartManager = new CartMongoManager();
    const result = await cartManager.updateProductInCart(cId, pId, quantity);
    if (result) {
        res.send({ message: 'Product updated' });
    }
    else {
        res.status(400).send({ message: 'could not update product' });
    }
};
