import { Router } from 'express';
import { cartModel } from '../dao/models/cart.model.js';
// imports de la lógica con file system
/* import  Carts from '../dao/CartManager.js'; */
/* const carts = new Carts('./src/cart.json'); */

const cartsRoutes = Router();



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
            // If cart doesn't exist, create a new one
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
});




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