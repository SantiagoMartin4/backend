import passport from "passport";
import local from 'passport-local';
import { userModel } from '../dao/models/user.model.js';
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import { Strategy as GithubStrategy } from "passport-github2";

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
                const newUser = {
                    firstName,
                    lastName,
                    email,
                    age,
                    password: createHash(password)
                }

                const result = await userModel.create(newUser);
                return done(null, result);
            } catch (error) {
                return done('Error to obtain the user ' + error);
            }
        }
    ));

    passport.use('login', new LocalStrategy(
        {usernameField: 'email' },
        async (username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username });
                if (!user || !isValidPassword(user, password)) {
                    console.log('Invalid credentials');
                    return done(null, false);
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use('github', new GithubStrategy(
        {
            clientID: 'Iv1.3b9726fda6634332',
            callbackURL: 'http://localhost:8080/api/session/githubcallback',
            clientSecret: '7e67af067cc62ea5eee9501d059c57a7f29317a6'
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log({ profile });
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
}

export default initializePassport;