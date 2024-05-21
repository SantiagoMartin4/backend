// Imports de Dependencias y demás
// import express
import express from 'express';
// Importo handlebars
import handlebars from 'express-handlebars';
// importo server para usar socket io
import { Server } from 'socket.io';
// import de flash
import flash from 'express-flash';
//importo mongoose
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
// Import de passport
import passport from 'passport';
// import de swagger
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUIExpress from 'swagger-ui-express';

// Imports de "Mis archivos"
import initializePassport from './config/passport.config.js';
// import port, secret, mongourl from config (dotENV)
import { mongoUrl, port, secret } from './config/config.js'; 
// Hago los imports de los Routers que se ubican en la carpeta routes
import productsRoutes from './routes/products.routes.js';
import cartsRoutes from './routes/carts.routes.js';
import viewsRoutes from './routes/views.routes.js';
import sessionRoutes from './routes/session.routes.js';
import testRoutes from './routes/test.routes.js';
import usersRoutes from './routes/users.routes.js'

import { productModel } from './dao/models/products.model.js';
// import ErrorHandler
import { errorHandler } from './middlewares/error.js';
// import mi middleware de winston logger "addLogger"
import { addLogger } from './utils/logger.js';
import { swaggerConfiguration } from './config/swagger-config.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Declaro mi carpeta public con static de express
app.use(express.static('public'));

//declaro uso de cors 
/* app.use(cors()); */

//declaro el uso de logger
app.use(addLogger)

// Declaro mi conexión con mongoose

const connectMongo = mongoose.connect(mongoUrl);

const httpServer = app.listen(port, () => {
    console.log(`Server running on ${port}`);
});

// configuro swaggerconfiguration
const specs = swaggerJSDoc(swaggerConfiguration)
app.use('/apidocs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs));

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
        ttl: 2 * 24 * 60 * 60 // 2 días en segundos
    }),
    resave: false, // no reescribe la sesión si es que no la modifico
    saveUninitialized: false, // No va a guardar una session sin inicializar (por ej. no se agregaron datos a la sesion, osea no guarda sesion vacias)
    cookie: {
        maxAge: 2 * 24 * 60 * 60 * 1000 // 2 días en milisegundos (luego el navegador la destruye automaticamentee)
    }
}));

// Configuro express-flash (lo estoy usando para redirigir desde passport en caso de login fallido)
app.use(flash());

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
app.use('/api/test', testRoutes);

// Declaro ruta de users para premium
app.use('/api/users', usersRoutes)


// declaro el uso de errorHandler
/* app.use(errorHandler) */

