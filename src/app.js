// import express
import express from 'express';
// Importo handlebars
import handlebars from 'express-handlebars';
// Hago los imports de los Routers que se ubican en la carpeta routes
import productsRoutes from './routes/products.routes.js';
import cartsRoutes from './routes/carts.routes.js';
// import viewsRoutes para la parte de handlebars
import viewsRoutes from './routes/views.routes.js';
// importo server para usa socket io
import { Server } from 'socket.io';
import { productModel } from './dao/models/product.model.js';
/* import { Products } from './dao/ProductManager.js'; */
//importo mongoose
import mongoose from 'mongoose';


const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Declaro mi carpeta public con static de express

app.use(express.static('public'));

// Declaro mi conexión con mongoose

mongoose.connect('mongodb+srv://santimartin:smartin4@smartin.yitodb3.mongodb.net/ecommerce');

const httpServer = app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});


// preparo websockets del lado del servidor 
/* let productsData = new Products('./src/products.json'); */

export const io = new Server(httpServer);

const emitProductsWithSocket = async (socket) => {
    try {
        const products = await productModel.find();
        socket.emit('getProdsWithSocket', products);
    } catch (error) {
        console.log(error);        
    }
};

const messages = []

io.on('connection', socket => {
    console.log('Nuevo cliente conectado');
    socket.on('message', data => {
        messages.push(data);
        io.emit('messageLogs', messages);
    });
    emitProductsWithSocket(socket);
});


// declaro las rutas usando app.use

app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

// Declaro y configuro motor de vistas

app.engine('handlebars', handlebars.engine());
app.set('views', 'src/views');
app.set('view engine', 'handlebars');
app.use('/', viewsRoutes);


