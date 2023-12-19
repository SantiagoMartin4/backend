import fs from 'fs';

export class Products {
    constructor(path) {
        this.path = path;
    }


    async products() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        }
        catch (err) {
            console.log(err)
            return [];
        }
    }

    async productById(productId) {
        const allProducts = await this.products();
        const findProduct = allProducts.find(p => p.id === +productId);
        if (!findProduct) {
            console.error('Invalid id given');
        }
        else {
            return findProduct;
        }
    }

    async countId() {
        const products = await this.products();
        return products.length + 1;
    }

    async addProduct(product) {
        if (product.title && product.description && product.price && product.status && product.category && product.code && product.stock) {
            Products.id++;
            const products = await this.products();
            const id = await this.countId();
            const newProduct = {
                title: product.title,
                description: product.description,
                price: product.price,
                status: product.status,
                category: product.category,
                thumbnail: product.thumbnail,
                code: product.code,
                stock: product.stock,
                id
            };
            products.push(newProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(products), 'utf-8');

        }
        else {
            return console.error('Data missing for product add');
        }
    }

    async updateProduct(productId, productToUpdate) {
        const products = await this.products();
        const updatedProducts = products.map(product => {
            if (product.id === +productId) {
                return {
                    ...product,
                    ...productToUpdate,
                    id: product.id,
                }
            }
            return product

        });
        await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts), 'utf-8');
    }

    async deleteById(productId) {
        const allProducts = await this.products();
        const findedProduct = allProducts.find(p => p.id === +productId);
        if (!findedProduct) {
            console.error('Invalid product ID, cannot delete')
            return false;
        }
        else {
            const productsDeleted = allProducts.filter(p => p.id !== +productId);
            await fs.promises.writeFile(this.path, JSON.stringify(productsDeleted), 'utf-8');
            return true;
        }
    }

}
