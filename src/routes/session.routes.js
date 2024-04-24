import { Router } from "express";
import passport from "passport";
import { register, failedRegister, current, login, logout, restorePassword, githubCallback, /* failLogin,  */forgotPassword, restorePasswordToken } from "../controllers/session.controller.js";

const sessionRoutes = Router();

sessionRoutes.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), register)

sessionRoutes.get('/failregister', failedRegister)

sessionRoutes.get('/current', current)

sessionRoutes.post('/login',
    passport.authenticate('login', {
        failureRedirect: '/faillogin',
        failureFlash: true
    }),
    login
);

sessionRoutes.get('/faillogin'/* , failLogin */);

sessionRoutes.post('/logout', logout);

sessionRoutes.post('/forgot-password', forgotPassword);

sessionRoutes.get('/restore-password/:token', restorePasswordToken)

sessionRoutes.post('/restore-password', restorePassword);

sessionRoutes.get('/github', passport.authenticate('github', { scope: ['user:email'] }), (req, res) => {
});

sessionRoutes.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), githubCallback);


export default sessionRoutes;