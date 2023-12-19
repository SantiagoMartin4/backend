
/* socket.emit('message', 'hola desde index.js'); */

const socket = io();

socket.on('getProdsWithSocket', async (products) => {
    console.log('received product data:', products);
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    products.forEach(p => {
        const listProducts = document.createElement('li');
        listProducts.textContent = `Product ID: ${p.id}, title: ${p.title}, Price: $${p.price}, Description: ${p.description}, Stock: ${p.stock}, Code: ${p.code}, Thumbnail: ${p.thumbnail}`;
        productList.appendChild(listProducts);
    });
});


// con esto llegue a un punto muerto

/* import { Products } from '../../src/ProductManager.js';

let productsData = new Products('./src/products.json'); */

/*     const tag = document.getElementById('productsTag').addEventListener('submit', function(event){
        event.preventDefault();
    });
    const prodsData = await productsData.products();
    const prods = products;
    tag.innerHTML = prods; */

