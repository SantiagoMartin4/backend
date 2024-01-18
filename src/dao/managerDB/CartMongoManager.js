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

    async getCarts() {
        try {
            const parseCarts = await CartModel.find().lean()
            return { message: "OK", rdo: parseCarts }
        }
        catch (e) {
            return { message: "ERROR", rdo: "No hay carritos" }
        }
    }
}
