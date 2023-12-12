import { Router } from 'express';
import  Carts from '../CartManager.js';
/* import { Products } from '../products.js'; */

const carts = new Carts('./src/cart.json');

const cartsRoutes = Router();

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
});

cartsRoutes.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const prodAddedToCart = await carts.addProdToCart(pid, cid);
    if(!prodAddedToCart){
        return res.status(400).send({message: 'cannot add product to cart'});
    }
    res.send({message: 'product added to cart'})
})



export default cartsRoutes;