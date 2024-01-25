// import express
import express from 'express';
// Importo handlebars
import handlebars from 'express-handlebars';
// Hago los imports de los Routers que se ubican en la carpeta routes
import productsRoutes from './routes/products.routes.js';
import cartsRoutes from './routes/carts.routes.js';
import viewsRoutes from './routes/views.routes.js';
import sessionRoutes from './routes/session.routes.js';
// importo server para usa socket io
import { Server } from 'socket.io';
import { productModel } from './dao/models/products.model.js';
/* import { Products } from './dao/ProductManager.js'; */
//importo mongoose
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';

const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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


//Declaro la session, siempre antes de las rutas para que se inicialice
app.use(session({
    secret: 's4nt1ag0',
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://santimartin:smartin4@smartin.yitodb3.mongodb.net/ecommerce',
/*         ttl: 15 */
    }),
    resave: true,
    saveUninitialized: true
}));


// declaro las rutas usando app.use
app.use('/', viewsRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

// Declaro y configuro motor de vistas para que permita pasar prototipos (protoproperties), permite recibir info de mongo sin problemas

const hbs = handlebars.create({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
});

app.engine('handlebars', hbs.engine);
app.set('views', 'src/views');
app.set('view engine', 'handlebars');


app.use(cookieParser());
// Declaro la session necesaria para implementar login de usuario


// La declaro despues de la session, y no antes
app.use('/api/sessions', sessionRoutes)

