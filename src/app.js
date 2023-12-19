import express from 'express';
// Importo handlebars
import handlebars from 'express-handlebars';
// Hago los imports de los Routers que se ubican en la carpeta Routes
import productsRoutes from './routes/products.routes.js';
import cartsRoutes from './routes/carts.routes.js';
import viewsRoutes from './routes/views.routes.js';
import { Server } from 'socket.io';
import { Products } from './ProductManager.js';

const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Declaro mi carpeta public con static de express

app.use(express.static('public'));

const httpServer = app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});


// preparo websockets del lado del servidor 
let productsData = new Products('./src/products.json');

export const io = new Server(httpServer);

const emitProductsWithSocket = async (socket) => {
    try {
        const products = await productsData.products();
        socket.emit('getProdsWithSocket', products);
    } catch (error) {
        console.log(error);        
    }
};

io.on('connection', products => {
    console.log('Nuevo cliente conectado');
    emitProductsWithSocket(products);
});

/*     socket.on('message', data =>{
        console.log(data); */

// declaro los routers usando app.use

app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

// Declaro y configuro motor de vistas

app.engine('handlebars', handlebars.engine());
app.set('views', 'src/views');
app.set('view engine', 'handlebars');

app.use('/', viewsRoutes);


