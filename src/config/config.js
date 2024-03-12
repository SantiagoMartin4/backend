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
        tokenSecret: process.env.TOKENSECRET,
        userAdmin: process.env.USERADMIN,
        passAdmin: process.env.PASSADMIN,
        githubClientID: process.env.GITHUB_CLIENT_ID,
        githubClientPassword: process.env.GITHUB_CLIENT_PASSWORD
    }
}