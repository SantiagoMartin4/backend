import fs from 'fs';


export class Carts {
    constructor(path) {
        this.path = path;
    }


    async getCarts() {
        try {
            const cartsData = await fs.promises.readFile(this.path, 'utf-8');
            const carts = JSON.parse(cartsData);
            return carts;
        } catch (error) {
            console.error(error);
            return [];

        }
    }

    async getCartById(cartId){
        try {
            const cartsData = await this.getCarts();
            const cart = cartsData.find(c => c.id === +cartId);
            if(!cart){
                return false
            }
            return cart;            
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async addCart() {
        try {
            const cartsData = await this.getCarts();
            cartsData.push({
                id: cartsData.length + 1,
                products: []
            });
            await fs.promises.writeFile(this.path, JSON.stringify(cartsData), 'utf-8');
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async addProdToCart(pid, cid){
        try {
            const cartsData = await this.getCarts();
            const mappedCarts = cartsData.map(cart => {
                if(cart.id === +cid){
                    const previousProduct = cart.products.find(prod => prod.id === +pid );
                    if(previousProduct){
                        previousProduct.quantity++;
                    }
                    else{
                        cart.products = [...cart.products, {id: +pid, quantity: 1}];
                    }
                }
                return cart
            });
            await fs.promises.writeFile(this.path, JSON.stringify(mappedCarts),'utf-8');
            return true;
            
        } catch (error) {
            console.error(error);
            return false;
        }
    }

}

export default Carts;
