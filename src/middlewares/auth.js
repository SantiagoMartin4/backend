import { userModel } from "../dao/models/user.model.js";
import { isValidPassword } from "../utils/bcrypt.js";

export const checkAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
}


export const roleAuth = (roles) => (req, res, next) => {
    const userRole = req.user.role; 
    const isAuthorized = roles.some(role => userRole.includes(role));

    if (!isAuthorized) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    next();
};
/* export const authorization = (role) => { 
    return async (req, res, next) => {
    if (!req.session || !req.session.user || req.session.user.role !== role){ 
        return res.status(403).send({ error: 'Unauthorized' }); 
    } 
    next();
}
}

export const authorizeRole = (role) => (req, res, next) => {
    console.log(role)
    if (!req.session || !req.session.user || req.session.user.role !== role) {
        return res.status(403).send({ error: 'Unauthorized' });
    }
    next();
};


export const authorizeUser = (req, res, next) => {
    if (!req.session || !req.session.user || req.session.user.role !== 'user') {
        return res.status(403).send({ error: 'Unauthorized' });
    }
    next();
};

export const authorizeAdmin = (req, res, next) => {
    if (!req.session || !req.session.user || req.session.user.role !== 'admin') {
        return res.status(403).send({ error: 'Unauthorized' });
    }
    next();
};

export const authorizePremium = (req, res, next) => {
    if (!req.session || !req.session.user || req.session.user.role !== 'premium') {
        return res.status(403).send({ error: 'Unauthorized' });
    }
    next();
};
 */
/* export const authorization = (role) => {
    return async (req, res, next) => {
        if(req.session?.user?.role !== role){
            return res.status(403).send({error: 'Unauthorized'})
        }
        next();
    }
} */

export const checkExistingUser = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/products');
    }
    next();
}

export const checkLogin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user || !isValidPassword(user, password)) {
            return res.status(401).redirect('/faillogin');
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
    }
}