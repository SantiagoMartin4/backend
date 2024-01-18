import mongoose from "mongoose";

const cartCollection = 'carts';

const cartSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    products: [
        {
            _id: {
                type: String,
            },
            quantity: {
                type: Number,
            },
        },
    ],
});

export const cartModel = mongoose.model(cartCollection, cartSchema);

