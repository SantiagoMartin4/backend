import { Router } from "express";
import { userModel } from "../dao/models/user.model.js";
import passport from "passport";
import { register, failedRegister, current, login, logout, restorePassword, githubCallback } from "../controllers/sessionController.js";

const sessionRoutes = Router();

sessionRoutes.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), register) 

sessionRoutes.get('/failregister', failedRegister)

sessionRoutes.get('/current', current)
    
sessionRoutes.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), login);

sessionRoutes.post('/logout', logout);

sessionRoutes.post('/restore-password', restorePassword );

sessionRoutes.get('/github', passport.authenticate('github', { scope: ['user:email'] }), (req, res) => {

});

sessionRoutes.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), githubCallback);


export default sessionRoutes;