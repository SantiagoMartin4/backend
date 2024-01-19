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




//------ BROKEN:

/* const cartSchema = mongoose.Schema({
id: {
    type: String,
    unique: true,
},
products: [
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        },
        quantity: Number,
    },
],
});
export const cartModel = mongoose.model(cartCollection, cartSchema);
 */



// ------------  SCHEMA VIEJO QUE USABA SIN mongoose.Schema.ObjectId
/*          id: {
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
 */



