import passport from "passport";
import local from 'passport-local';
import { userModel } from '../dao/models/user.model.js';
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import { Strategy as GithubStrategy } from "passport-github2";
import { githubClientId, githubClientSecret } from "./config.js";
import customErrors from "../services/errors/customErrors.js";
import errorEnum from "../services/errors/error.enum.js";
import { invalidCredentials } from "../services/errors/info.js";
import { CartMongoManager } from '../dao/managerDB/CartMongoManager.js'


const cartController = new CartMongoManager()




const LocalStrategy = local.Strategy;



const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            const { firstName, lastName, email, age } = req.body;
            try {
                const user = await userModel.findOne({ email: username });
                if (user) {
                    console.log('User already exists');
                    return done(null, false);
                }
                if (username === "adminCoder@coder.com") {
                    const newAdmin = {
                        firstName,
                        lastName,
                        email,
                        age,
                        password: createHash(password),
                        role: "admin"
                    }
                    const result = await userModel.create(newAdmin);
                    return done(null, result);
                } else {
                    const newCart = await cartController.addCart();
                    console.log(newCart); 
                    const newUser = {
                        firstName,
                        lastName,
                        email,
                        age,
                        password: createHash(password),
                        cart: newCart._id 
                    }
                    console.log(newUser);
                    const result = await userModel.create(newUser);
                    return done(null, result);
                }
            } catch (error) {
                return done('Error while registering user' + error);
            }
        }
    ));
}


    passport.use('login', new LocalStrategy(
        { usernameField: 'email' },
        async (username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username });
                if (!user || !isValidPassword(user, password)) {
/*                     customErrors.createError({
                        name: 'invalid credentials',
                        cause: invalidCredentials(),
                        message: 'Error - invalid credentials',
                        code: errorEnum.USER_NOT_FOUND
                    }); 
                        
                    return done(null, false);*/
                    return done(null, false, {message: 'Invalid credentials'});
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use('github', new GithubStrategy(
        {
            clientID: githubClientId,
            callbackURL: 'http://localhost:8080/api/session/githubcallback',
            clientSecret: githubClientSecret
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                /* console.log({ profile }); */
                const user = await userModel.findOne({ email: profile._json.email });
                if (!user) {
                    const newUser = {
                        firstName: profile._json.name.split(' ')[0],
                        lastName: profile._json.name.split(' ')[1],
                        age: 24,
                        email: profile.username,
                        password: 'GithubGenerated'
                    }
                    const result = await userModel.create(newUser);
                    return done(null, result);
                }
                return done(null, user);
            } catch (error) {

                return done(error);
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findOne({ _id: id });
        done(null, user);
    });


export default initializePassport;