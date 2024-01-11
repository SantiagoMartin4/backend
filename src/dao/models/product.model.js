import mongoose from "mongoose";

const productCollection = 'products';

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String
    },
    code: {
        type: String
    },
    stock: {
        type: Number,
        required: true
    },
});

export const productModel = mongoose.model(productCollection, productSchema);