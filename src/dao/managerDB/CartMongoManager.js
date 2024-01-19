import mongoose from 'mongoose';
import { cartModel } from '../models/carts.model.js'

export class productCart {
    constructor(id, quantity) {
        this.id = id
        this.quantity = quantity
    }
}

export class CartMongoManager {
    constructor() {
        this.carts = [];
    }

    // ------------  GET CARTS


    async getCartById(id) {
        try {
            const cart = await cartModel.findOne({ _id: id })
            if (cart)
                return { message: 'OK', rdo: cart }
            else
                return { message: 'ERROR', rdo: 'cannot found cart' }
        }
        catch (e) {
            return { message: 'ERROR', rdo: 'crash while trying to get cart by id' + e.message }
        }
    }

    async getProductsCartById(id) {
        try {
            const cart = await cartModel.findOne({ _id: id }).populate('products.product');
            if (cart)
                return { message: 'OK', rdo: cart.products }
            else
                return { message: 'ERROR', rdo: 'El carrito no existe o no tiene productos' }
        }
        catch (e) {
            return { message: 'ERROR', rdo: 'Error al obtener los productos del carrito - ' + e.message }
        }
    }

    // ------------  ADD PRODUCTS TO CART

    async addCart(products) {
        try {
            const added = await cartModel.create(products)
            return { message: "OK", rdo: "Carrito dado de alta correctamente" }
        }
        catch (e) {
            return { message: "ERROR", rdo: "Error al agregar el carrito." + e.message }
        }
    }


    async addProductsInCart(cId, pId, quantity) {
        try {
            const cart = await cartModel.findOne({ _id: cId });
            if (cart) {
                const existingProducts = cart.products.find(product => product.product.toString() === pId);
                if (existingProducts) {
                    existingProducts.quantity += quantity;
                }
                else {
                    cart.products.push({ product: pId, quantity });
                }
                await cart.save();
                return true;
            }
            else {
                return false;
            }
        } catch (e) {
            return false;
        }
    }

    // ------------  DELETE PRODUCTS IN CART

    async deleteProdInCart(cId, pId) {
        try {
            const result = await cartModel.updateOne({ _id: cId }, {
                $pull: { products: { product: new mongoose.Types.ObjectId(pId) } }
            });
            if (result.modifiedCount > 0) {
                return true;
            }
            else {
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async deleteAllProductsInCart(id) {
        try {
            const deleted = await cartModel.updateOne({ _id: id }, {
                products: []
            });
            if (deleted.modifiedCount > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (e) {
            console.error(e);
            return false;
        }
    }

    // ------------  UPDATE PRODUCTS IN CART

    async updateCart(cId, cart) {
        try {
            const result = await cartModel.updateOne({ _id: cId }, cart);
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async updateProductInCart(cId, pId, quantity) {
        if (!quantity) {
            return false;
        }
        try {
            const cart = await cartModel.findOne({ _id: cId });
            if (!cart) {
                return false;
            }
            const product = cart.products.find(product => product.product.toString() === pId);
            if (!product) {
                return false;
            }
            product.quantity = quantity;
            await cart.save();
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}


