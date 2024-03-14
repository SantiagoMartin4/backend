import mongoose from "mongoose";

const ticketCollection = 'tickets';

const ticketSchema = mongoose.Schema({
    "code": {
        type: String,
        required: true
    },
    "purchaseDateTime": {
        type: Date,
        required: true
    },
    "amount": {
        type: Number,
        required: true
    },
    "purchaser": {
/*         type: mongoose.Schema,
        ref: "users"
 */
            type: String,
            required: true
    ,
    }
});


export const ticketModel = mongoose.model(ticketCollection, ticketSchema);
