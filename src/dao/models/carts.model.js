import mongoose from "mongoose";

const cartCollection = "carts"

const cartSchema = mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.ObjectId,
                    required: true,
                    ref: 'products'
                },
                quantity: Number
            }
        ],
        default: []
    }
})

export const cartModel = mongoose.model(cartCollection, cartSchema);


