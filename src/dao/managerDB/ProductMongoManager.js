import { productModel } from "../models/products.model.js";


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


    async addProduct(product) {
        try {
            const createProd = await productModel.create(product)
            return createProd
        } catch (error) {
            console.error(error);
            return null;
        }
    }


    // TODO: REFACTORIZAR ESTO QUE QUEDÓ DEL COMIENZO DEL PROYECTO CON NOMENCLATURA DE CLASES COMO GUIA Y LA COMPLICA DE GUSTO CON EL RDO Y ESO!
    async updateProduct(id, updateProduct) {
        try {
            const update = await productModel.updateOne({ _id: id }, updateProduct)

            if (update.modifiedCount > 0){
                return { message: "OK", rdo: `Producto con ID ${id} actualizado exitosamente.` }
            }
            else {
                return { message: "ERROR", rdo: `No se encontró un producto con el ID ${id}. No se pudo actualizar.` }
            }
        }
        catch (e) {
            req.logger.error('Product NOT updated')
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
