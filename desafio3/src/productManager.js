const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async getId(){
        const products = await this.getProducts();
        return products.length + 1;
    }

    async addProduct(product) {
        if(product.title && product.description && product.price && product.thumbnail && product.code && product.stock){
            ProductManager.id++;
            const products = await this.getProducts();
            const id = await this.getId();
            const newProduct = {
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                code: product.code,
                stock: product.stock,
                id
            };
                products.push(newProduct);
                await fs.promises.writeFile(this.path, JSON.stringify(products), 'utf-8');
            
        }
        else{
            return console.error('Datos faltantes en el producto ingresado');
        }
    }

    async getProducts() {
        try {
            const getData = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(getData);
            return products;
        } catch (error) {
            return [];
        }
    }

    async getProductById(productId) {
        const products = await this.getProducts();
        const product = products.find(product => product.id === productId);
        if(!product){
            console.error("No existe el producto según el id proporcionado");
        }
        else{
        return product;
        }
    }
    async deleteProduct(productId){
        const products = await this.getProducts();
        const product = products.find(product => product.id === productId);
        if(!product) {
            console.error("No existe el producto de acuerdo al id proporcionado")
        }
        else{
        const productsDeleted = products.filter(product => product.id !== productId);
        await fs.promises.writeFile(this.path, JSON.stringify(productsDeleted), 'utf-8');
        }
    }
    async updateProduct(productId, productToUpdate){
        const products = await this.getProducts();
        const updatedProducts = products.map(product => {
            if(product.id === productId){
                return{
                    ...product,
                    ...productToUpdate,
                    id: product.id,
                }
            }
            return product;
        });

        await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts), 'utf-8');
    }
    }


const test = async () => {
    const productManager = new ProductManager('./products.json');
    
    const emptyArray = console.log(await productManager.getProducts());

    await productManager.addProduct({
        title: "producto prueba",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25,
    })
    await productManager.addProduct({
        title: "producto prueba",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25,
    })
    await productManager.addProduct({
        title: "producto prueba",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25,
    })

    const getProductsAdded = console.log(await productManager.getProducts());

    await productManager.getProductById(1);

    await productManager.updateProduct(2, {
        title: 'product updated',
        id: 5,
    });

    await productManager.deleteProduct(3);
}


test();

