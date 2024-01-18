import { productModel } from "../models/products.model.js";

export class Producto {
    constructor(title, description, price, code, stock, status, category, thumbnail) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.code = code;
        this.stock = stock;
        this.status = status;
        this.category = category;
        this.thumbnail = thumbnail;
    }
}


export class ProductMongoManager {
    async getProducts(limit = 10, page = 1, query = '', sort = ''){
        try {
            const [code, value] = query.split(':');

            const productsParse = await productModel.paginate({[code] : value}, {
                limit, 
                page,
                sort : sort ? { price: sort} : {}
            });
            productsParse.payload = productsParse.docs;
            delete productsParse.docs;
            return {message: "ok", ...productsParse}
        } catch (error) {
            return {message: "error", rdo: "No se encontraron productos"}
        }
    }
}