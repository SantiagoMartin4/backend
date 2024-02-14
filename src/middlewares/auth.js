import { userModel } from "../dao/models/user.model.js";
import { isValidPassword } from "../utils/bcrypt.js";

export const checkAuth = (req, res, next) => {
    if(!req.session.user){
        return res.redirect('/login');
    }
    next();
}

export const checkExistingUser = (req, res, next) => {
    if(req.session.user){
        return res.redirect('/');
    }
    next();
}

export const checkLogin = async (req,res,next) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user || !isValidPassword(user, password)){
            return res.status(401).send({message: 'Unauthorized'});
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
    }
}