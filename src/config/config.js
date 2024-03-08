import dotenv from 'dotenv';

export const getVariables = () => {
    dotenv.config({
        path: './src/.env' 
    });

    return {
        port: process.env.PORT,
        mongoUrl: process.env.MONGO_URL,
        secret: process.env.SECRET_KEY,
        githubClientID: process.env.GITHUB_CLIENT_ID,
        githubClientPassword: process.env.GITHUB_CLIENT_PASSWORD
    }
}