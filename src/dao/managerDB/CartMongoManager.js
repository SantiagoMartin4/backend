import mongoose from 'mongoose';
import { cartModel } from '../models/carts.model.js'


export class CartMongoManager {
    constructor() {
        this.carts = [];
    }

    // ------------  GET CARTS


    async getCarts() {
        try {
            const cartsData = await cartModel.find();
            return cartsData;
        } catch (error) {
            console.error(error);
            return null
        }
    }

    async getCartById(cId) {
        try {
            const cartData = await cartModel.findOne({ _id: cId }).populate('products.product')
            if (cartData)
                return cartData
            else
                return null
        }
        catch (e) {
            return { message: 'Unable to get cart by id'}
        }
    }

    async getProductsCartById(id) {
        try {
            const cart = await cartModel.findOne({ _id: id }).populate('products.product');
            if (cart)
                return cart.products
            else
                return {message: 'Cannot get cart by id or empty cart' }
        }
        catch (e) {
            return { message: 'ERROR', rdo: 'Error al obtener los productos del carrito - ' + e.message }
        }
    }

    // ------------  ADD CART & ADD PRODUCTS TO CART


    async addCart(products) {
        try {
            const added = await cartModel.create(products);
            return added;
        } catch (e) {
            console.error("Error al agregar el carrito:", e);
            throw new Error("Error al agregar el carrito: " + e.message);
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


