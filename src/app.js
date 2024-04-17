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

// Import de passport
import passport from 'passport';
import initializePassport from './config/passport.config.js';

// import port, secret, mongourl from config (dotENV)
import { mongoUrl, port, secret } from './config/config.js'; 

// import command


// import ErrorHandler
import { errorHandler } from './middlewares/error.js';

// import mi middleware de winston logger "addLogger"
import { addLogger } from './utils/logger.js';
import testRoutes from './routes/test.routes.js';




const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Declaro mi carpeta public con static de express
app.use(express.static('public'));

//declaro el uso de logger
app.use(addLogger)


// uso command
/* 
const program = new Command ();
program.option('--mode <mode>', 'Modo de trabajo', 'development');
const options = program.parse();
const { mongoUrl, port, secret } = getVariables(options); */


// Declaro mi conexión con mongoose

mongoose.connect(mongoUrl);

const httpServer = app.listen(port, () => {
    console.log(`Server running on ${port}`);
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
    secret: secret,
    store: MongoStore.create({
        mongoUrl: mongoUrl,
    }),
    resave: true,
    saveUninitialized: true
}));


// Declaro la parte de passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());


// Declaro y configuro motor de vistas para que permita pasar prototipos (protoproperties), permite recibir info de mongo sin problemas

const hbs = handlebars.create({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
});

app.engine('handlebars', hbs.engine);
app.set('views', 'src/views');
app.set('view engine', 'handlebars');

// config para usar CookieParser
app.use(cookieParser());


// declaro las rutas usando app.use
app.use('/', viewsRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

// La declaro despues de la session, y no antes
app.use('/api/session', sessionRoutes)

// Declaro ruta de test para el logger
app.use("/api/test", testRoutes);


// declaro el uso de errorHandler
app.use(errorHandler)

