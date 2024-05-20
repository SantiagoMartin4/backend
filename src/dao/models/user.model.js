import mongoose from "mongoose";

const userCollection = 'users';

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    fullName : {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "user", "premium"],
        default: "user"
    },
    cart: {
        type: mongoose.Schema.ObjectId,
        ref: 'carts'
    },
    tokenRestore: {
        type: Object,
    },
    documents: {
        type: [
            {
                name: {
                    type: String
                },
                reference: {
                    type: String,
                    default: null,
                },
                field: {
                    type: String,
                    default: null,
                }
            }
        ]
    },
    lastConnection: {
        type: Date
    }
});

export const userModel = mongoose.model(userCollection, userSchema);