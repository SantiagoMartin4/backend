import express from 'express';

// Hago los imports de los Routers que se ubican en la carpeta Routes

import productsRoutes from './routes/products.routes.js';
import cartsRoutes from './routes/carts.routes.js';



const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


// declaro los routers usando app.use

app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);



app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});