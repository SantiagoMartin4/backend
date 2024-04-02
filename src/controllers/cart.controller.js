import { CartMongoManager } from '../dao/managerDB/CartMongoManager.js'
import { ProductMongoManager } from '../dao/managerDB/ProductMongoManager.js';
import { TicketMongoManager } from '../dao/managerDB/TicketMongoManager.js';

const cartController = new CartMongoManager()
const productController = new ProductMongoManager();
const ticketController = new TicketMongoManager();

export const getCarts = async (req, res) => {
    const carts = await cartController.getCarts();
    try {
        const { limit } = req.query;
        if (!limit) {
            req.logger.info('found Carts')
            return res.status(200).send(carts);
        }
        const productsLimit = carts.slice(0, limit)
        return res.status(200).send(productsLimit)
    } catch (error) {
        req.logger.error('Carts not found')
        res.status(400).send({ message: 'cannot get Carts' })
    }
}


export const getCartById = async (req, res) => {
    let { cId } = req.params;
    try {
        const cartData = await cartController.getCartById({ _id: cId });
        req.logger.info('found Carts')
        res.status(200).send({ cartData });
    } catch (error) {
        req.logger.error('Carts not found')
        res.status(400).json({ message: 'something went wrong' })
    }
};

//------------------ LÓGICA DE CART MANAGER CON MONGOOSE SEPARADO EN CART MONGO MANAGER:

//--------- POST  -  Añadir carrito Vacío

export const addCart = async (req, res) => {

    try {
        const addCart = await cartController.addCart({ products: [] })
        if (addCart) {
            req.logger.info('Cart added')
            return res.status(200).json(addCart)
        }
        res.status(400).json(resultado)
    }
    catch (err) {
        req.logger.error('Cart not added')
        res.status(400).json({ message: err })
    }
};

// --------------- 

export const addProductsInCart = async (req, res) => {
    try {
        const { cId, pId } = req.params;
        const newQuantity = req.body.quantity;
        const addProdInCart = await cartController.addProductsInCart(cId, pId, newQuantity);
        if (addProdInCart) {
            req.logger.info('Product added to Cart')
            return res.status(200).json({ message: 'Product added' });
        }
        req.logger.error('Product not added to Cart')
        res.status(400).json({ message: 'could not add product' });
    }
    catch (err) {
        req.logger.error('Product not added to cart')
        res.status(400).send({ err });
    }
};

//--- DELETE   -  Eliminar todos los productos del carrito

export const deleteAllProductsInCart = async (req, res) => {
    try {
        const { cId } = req.params

        const deleted = await cartController.deleteAllProductsInCart(cId);

        if (deleted) {
            req.logger.info('All Products in Cart deleted')
            return res.status(200).json({ message: 'Products deleted' });
        }
        req.logger.error('Produts in Cart NOT deleted')
        return res.status(404).json({ menssage: 'could not delete products' });
    }
    catch (err) {
        req.logger.error('Products in Cart NOT deleted')
        res.status(400).json({ menssage: err })
    }
}

//--- DELETE   -  Eliminar producto de carrito

export const deleteProductInCart = async (req, res) => {
    const { cId, pId } = req.params;
    try {
        const deleted = await cartController.deleteProdInCart(cId, pId);
        if (deleted) {
            req.logger.info('Product in Cart deleted')
            res.send({ message: 'Product deleted' });
        }
        else {
            req.logger.error('Product in Cart NOT deleted')
            res.status(400).json({ message: 'could not delete product' });
        }
    } catch (error) {
        req.logger.error('Product in Cart NOT deleted')
        res.status(400).json({ message: 'could not delete product' });
    }
};

//- --------- PUT para agregar productos a carritos

export const updateCart = async (req, res) => {
    const { cId } = req.params;
    const cart = req.body;
    try {
        const result = await cartController.updateCart(cId, cart);
        if (result.modifiedCount > 0) {
            req.logger.info('Cart updated')
            res.send({ message: 'Cart updated' });
        }
        else {
            req.logger.error('Cart not updated')
            res.status(400).send({ message: 'Could not update cart' });
        }
    } catch (error) {
        req.logger.error('Cart not updated')
        res.status(400).send({ message: 'Could not update cart' });
    }
};

export const updateProductInCart = async (req, res) => {
    const { cId, pId } = req.params;
    const { quantity } = req.body;
    const result = await cartController.updateProductInCart(cId, pId, quantity);
    if (result) {
        req.logger.info('Product in Cart updated')
        res.send({ message: 'Product updated' });
    }
    else {
        req.logger.error('Product in Cart NOT updated')
        res.status(400).send({ message: 'could not update product' });
    }
};

export const purchaseCart = async (req, res) => {
    const { cId } = req.params;
    console.log(cId)
    try {
        const cartData = await cartController.getCartById(cId);
        console.log({ cartData })
        const updatedProducts = cartData.products.filter(product => {
            const availableStock = product.product.stock >= product.quantity;
            if (!availableStock) {
                // esta línea ajusta la compra al máximo posible según el stock
                product.quantity = Math.min(product.quantity, product.product.stock);
            }
            return availableStock;
        });
        cartData.products = updatedProducts;
        const totalPrice = cartData.products.reduce((acc, product) => {
            return acc + (product.product.price * product.quantity);
        }, 0);

        await cartController.updateCart(cId, cartData);

        for (const product of updatedProducts) {
            const remainingStock = product.product.stock - product.quantity;
            const newStock = {
                stock: remainingStock
            };
            await productController.updateProduct(product.product._id, newStock);
        }
        const { email } = req.body;
        const ticketData = {
            code: Math.floor(Math.random() * 900000) + 100000,
            purchaseDateTime: new Date(),
            amount: totalPrice,
            /* purchaser : req.user.email */
            purchaser: email
        }
        await ticketController.addTicket(ticketData);
        req.logger.info('Ticket created')
        return res.status(200).json({ message: 'Ticket created', ticketData });
    } catch (error) {
        req.logger.error('Cart not purchased, Ticket not created')
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

