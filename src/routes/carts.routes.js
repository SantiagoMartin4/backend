import { Router } from 'express';

// +++++ DE MONGO SIN SEPARAR EN MONGO MANAGER:
import { cartModel } from '../dao/models/carts.model.js';

// +++++ IMPORTS DE LA LOGICA ANTIGUA CON FILE SYSTEM:
/* import  Carts from '../dao/CartManager.js'; */
/* const carts = new Carts('./src/cart.json'); */

import { CartMongoManager } from '../dao/managerDB/CartMongoManager.js'

const cartsRoutes = Router();

// -------------------- GET CART CON LÓGICA SIN SEPARAR EN CARTMONGOMANAGER:
cartsRoutes.get('/', async (req, res) => {
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
})

cartsRoutes.get('/:cid', async (req, res) => {
    let { cid } = req.params;
    try {
        const cartData = await cartModel.findOne({ _id: cid });
        res.status(200).send({ cartData });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'something went wrong' })
    }
});

//------------------ LÓGICA DE CART MANAGER CON MONGOOSE SEPARADO EN CART MONGO MANAGER:

//--------- POST  -  Añadir carrito Vacío

cartsRoutes.post('/', async (req, res) => {

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
});


// --------------- 

cartsRoutes.post("/:cId/product/:pId", async (req, res) => {
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
});


//--- DELETE   -  Eliminar todos los productos del carrito

cartsRoutes.delete('/:cId', async (req, res) => {
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
})



//--- DELETE   -  Eliminar producto de carrito

cartsRoutes.delete('/:cId/products/:pId', async (req, res) => {
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
});

//- --------- PUT para agregar productos a carritos

cartsRoutes.put('/:cId', async (req, res) => {
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
});

cartsRoutes.put('/:cId/products/:pId', async (req, res) => {
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
});



//  --------------------------- SIN SEPARAR EN MONGO MANAGER -------------------

/* 
cartsRoutes.get('/', async (req,res) => {
    const cartData = await cartModel.find();
    res.send(cartData);
});

cartsRoutes.get('/:cid', async (req,res) => {
    let { cid } = req.params;
    try {
    const cartData = await cartModel.findOne({_id : cid});
    res.send({cartData}); 
    } catch (error) {
        console.log(error);
        res.status(400).json({message: 'something went wrong'})
}});

cartsRoutes.post('/', async (req, res) => {
    try {
        const newCart = req.body;
        const added = await cartModel.create(newCart);
        res.status(201).json({message: 'Cart added'})
    } catch (error) {
        console.error({error});
        res.status(400).json({error})
    }
});



cartsRoutes.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    
    try {
        let cart = await cartModel.findOne({_id: cid });
        
        if (!cart) {
            // Si no existe el carrito, creo uno vacío
            cart = new cartModel({products: [] });
        }

        const previousProduct = cart.products.find(prod => prod._id == pid);

        if (previousProduct) {
            previousProduct.quantity++;
        } else {
            cart.products.push({_id: pid, quantity: 1 });
        }

        await cart.save();
        res.send({ message: 'product added to cart' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
}); */




// ---------------------------   FILE SYSTEM ---------------------------------

// Mis antiguos métodos para manejar los carts con File System:

/* 
cartsRoutes.get('/', async (req, res) => {
    const cartsData = await carts.getCarts();
    res.send(cartsData);
});

cartsRoutes.post('/', async (req, res) => {
    const addCart = await carts.addCart();
    if(!addCart){
        return res.status(400).send({message: 'cannot add cart'})
    }
    res.send({message: 'added cart'});
});

cartsRoutes.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    const findedCart = await carts.getCartById(cid);
    if(!findedCart){
        return res.status(404).send({message: 'cannot find cart'})
    }
    res.send(findedCart);
}); */

/* cartsRoutes.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const prodAddedToCart = await carts.addProdToCart(pid, cid);
    if(!prodAddedToCart){
        return res.status(400).send({message: 'cannot add product to cart'});
    }
    res.send({message: 'product added to cart'})
}) */


export default cartsRoutes;