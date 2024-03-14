import dotenv from 'dotenv';

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
}