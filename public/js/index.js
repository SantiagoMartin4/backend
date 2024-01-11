
/* socket.emit('message', 'hola desde index.js'); */

const socket = io();

Swal.fire({
    title: 'Ingresá tu email',
    input: 'text',
    inputValidator: (value) => {
        if(!value){
            return 'Tienes que ingresar tu email';
        }
    }
}).then(data => {
    email = data.value;
    console.log(email);
});

const inputData = document.getElementById('inputData');
const outputData = document.getElementById('outputData');

inputData.addEventListener('keyup', (event) => {
    if(event.key === 'Enter'){
        if(inputData.value.trim().length > 0){
            socket.emit('message', {Email : email, data : inputData.value})
        }
    }
});

socket.on('messageLogs', data => {
    let messages = '';
    data.forEach(message => {
        messages+=`${message.Email} dice: ${message.data} <br />`
    });
    outputData.innerHTML = messages;
})






socket.on('getProdsWithSocket', async (products) => { 
    /* console.log('received product data:', products); */
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    products.forEach(p => {
        const listProducts = document.createElement('li');
        listProducts.textContent = `Product ID: ${p.id}, title: ${p.title}, Price: $${p.price}, Description: ${p.description}, Stock: ${p.stock}, Code: ${p.code}, Thumbnail: ${p.thumbnail}`;
        productList.appendChild(listProducts);
    });
}); 




// con lo siguiente llegue a un punto muerto

/* import { Products } from '../../src/ProductManager.js';

let productsData = new Products('./src/products.json'); */

/*     const tag = document.getElementById('productsTag').addEventListener('submit', function(event){
        event.preventDefault();
    });
    const prodsData = await productsData.products();
    const prods = products;
    tag.innerHTML = prods; */

