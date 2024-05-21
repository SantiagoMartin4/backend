
import path from 'path';
import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command();
program.option('--mode <mode>', 'Modo de trabajo', 'development');
const options = program.parse();


const getVariables = (options) => {
    // Obtener el entorno de ejecución especificado por el usuario o utilizar 'development' por defecto
    const environment = options.opts().mode || process.env.NODE_ENV || 'development';
    
    // Establecer NODE_ENV para que otras partes de la aplicación puedan acceder a él si es necesario
    process.env.NODE_ENV = environment;
    
    // Determinar la ruta del archivo .env basándose en el entorno de ejecución
    const envPath = path.resolve(process.cwd(), 'src', `.env.${environment}`);
    
    // Cargar las variables de entorno desde el archivo .env correspondiente
    dotenv.config({ path: envPath });
    // Retornar las variables de entorno necesarias
    return {
        port: process.env.PORT,
        mongoUrl: process.env.MONGO_URL,
        secret: process.env.SECRET_KEY,
        userAdmin: process.env.USERADMIN,
        passAdmin: process.env.PASSADMIN,
        githubClientId: process.env.GITHUB_CLIENT_ID,
        githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
        mailingUser: process.env.MAILING_USER,
        mailingService: process.env.MAILING_SERVICE,
        mailingPassword: process.env.MAILING_PASSWORD,
        mailingPort: process.env.MAILING_PORT,
        stripePrivateKey: process.env.STRIPE_PRIVATE_KEY
    };
};

export const { port, mongoUrl, secret, userAdmin, passAdmin, githubClientId, githubClientSecret, mailingUser, mailingService, mailingPassword, mailingPort, stripePrivateKey } = getVariables(options);


// OTRA FORMA CON LOS PATH FIJOS

/* import dotenv from 'dotenv';

export const getVariables = (options) => {
    const environment = options.opts().mode;
    dotenv.config({
        path: environment === 'production' ? './src/.env.production' : './src/.env.development' 
    });

    return {
        port: process.env.PORT,
        mongoUrl: process.env.MONGO_URL,
        secret: process.env.SECRET_KEY,
        userAdmin: process.env.USERADMIN,
        passAdmin: process.env.PASSADMIN,
        githubClientId: process.env.GITHUB_CLIENT_ID,
        githubClientSecret: process.env.GITHUB_CLIENT_SECRET
    }
} */



// OTRA FORMA QUE CORRE SIN OPTIONS PERO NO SE PUEDE CORRER MODE DESDE CONSOLA


/* export const getVariables = () => {
    // Obtener el entorno de ejecución especificado por el usuario o utilizar 'development' por defecto
    const environment = process.env.NODE_ENV || 'development';
    
    // Establecer NODE_ENV para que otras partes de la aplicación puedan acceder a él si es necesario
    process.env.NODE_ENV = environment;

    // Determinar la ruta del archivo .env basándose en el entorno de ejecución
    const envPath = path.resolve(process.cwd(), 'src', `.env.${environment}`);

    // Cargar las variables de entorno desde el archivo .env correspondiente
    dotenv.config({ path: envPath });
    
    // Retornar las variables de entorno necesarias
    return {
        port: process.env.PORT,
        mongoUrl: process.env.MONGO_URL,
        secret: process.env.SECRET_KEY,
        userAdmin: process.env.USERADMIN,
        passAdmin: process.env.PASSADMIN,
        githubClientId: process.env.GITHUB_CLIENT_ID,
        githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
        mailingUser: process.env.MAILING_USER,
        mailingService: process.env.MAILING_SERVICE,
        mailingPassword: process.env.MAILING_PASSWORD,
        mailingPort: process.env.MAILING_PORT
    };
};
 */