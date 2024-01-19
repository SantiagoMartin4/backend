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
    async getProducts(limit = 10, page = 1, query = '', sort = '') {
        try {
            const [code, value] = query.split(':');

            const productsParse = await productModel.paginate({[code]: value }, {
                limit,
                page,
                sort: sort ? { price: sort } : {}
            });
            productsParse.payload = productsParse.docs;
            delete productsParse.docs;
            return { message: "OK", ...productsParse }
        } catch (error) {
            return { message: "error", rdo: "No se encontraron productos" }
        }
    }

    async getProductById(id) {
        try {
            const prod = await productModel.findOne({ _id: id })
            if (prod)
                return { message: "OK", rdo: prod }
            else
                return { message: "ERROR", rdo: "El productos no existe" }
        }
        catch (e) {
            return { message: "ERROR", rdo: "Error al obtener el producto - " + e.message }
        }
    }

/*     async addProduct(producto) {
        try {
            let prod = []  
            const validacion = !producto.title || !producto.description || !producto.price || !producto.code || !producto.stock || !producto.status || !producto.category ? false : true;

            if (!validacion)
                return { message: "ERROR", rdo: 'Data missing on product' }

            const resultado = await this.getProducts();
            if (resultado.message === "OK")
                prod = resultado.rdo.find((e) => e.code === producto.code);
            else
                return { message: "ERROR", rdo: "No se pudieron obtener los productos" }

            if (prod)
                return { message: "ERROR", rdo: "Producto con código existente!" }
            const added = await productModel.create(producto)
            return { message: "OK", rdo: "Producto dado de alta correctamente" }
        }
        catch (e) {
            return { message: "ERROR", rdo: "Error al agregar el producto - " + e.message }
        }
    } */

    async updateProduct(id, updateProduct) {
        try {
            const update = await productModel.updateOne({ _id: id }, updateProduct)

            if (update.modifiedCount > 0)
                return { message: "OK", rdo: `Producto con ID ${id} actualizado exitosamente.` }
            return { message: "ERROR", rdo: `No se encontró un producto con el ID ${id}. No se pudo actualizar.` }
        }
        catch (e) {
            return { message: "ERROR", rdo: "Error al momento de actualizar el producto - " + e.message }
        }
    }

    async deleteProduct(id) {
        try {
            const deleted = await productModel.deleteOne({ _id: id })

            if (deleted.deletedCount === 0) {
                return { message: "ERROR", rdo: `No se encontró un producto con el ID ${id}. No se pudo eliminar.` }
            }

            return { message: "OK", rdo: `Producto con ID ${id} eliminado exitosamente.` }
        }
        catch (e) {
            return { message: "ERROR", rdo: "Error al momento de eliminar el producto - " + e.message }
        }
    }
}
