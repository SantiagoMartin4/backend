import mongoose from "mongoose";

const messageCollection = 'messages';

const messageSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
});

export const chatModel = mongoose.model(messageCollection, messageSchema);