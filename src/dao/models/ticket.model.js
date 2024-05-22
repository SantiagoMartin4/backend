import mongoose from "mongoose";

const ticketCollection = 'tickets';

const ticketSchema = mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    purchaseDateTime: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ]
});

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);
