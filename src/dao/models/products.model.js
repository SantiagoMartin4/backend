import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = 'products';

const productSchema = mongoose.Schema({
  "title": String,
  "description": String,
  "price": Number,
  "code": {
    type: String,
    unique: true
  },
  "stock": Number,
  "status": Boolean,
  "category": {
    type: String,
    enum: ["Cat 1", "Cat 2", "Cat 3", "Cat 4"],
    default: "Cat 4"
  },
  "thunbnail": String,
  "owner": {
    type: String,
    default: "admin"
  }
})

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productsCollection, productSchema);