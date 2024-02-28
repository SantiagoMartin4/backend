import dotenv from 'dotenv';

export const env = {
    PORT: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    sessionSecret: process.env.SESSION_SECRET,
    githubClientID: process.env.GITHUB_CLIENT_ID,
    githubClientPassword: process.env.GITHUB_CLIENT_PASSWORD
}