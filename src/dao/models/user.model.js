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
        enum: ["admin", "user"],
        default: "user"
    },
    cart: {
        type: mongoose.Schema.ObjectId,
        ref: 'carts'
    }
});

export const userModel = mongoose.model(userCollection, userSchema);