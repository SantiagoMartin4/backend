import { userModel } from "../dao/models/user.model.js";
import { isValidPassword } from "../utils/bcrypt.js";

// Versión 2 de checkAuth (más estilizada usando isAuthenticated que es un mètodo de la librería passport)
export const checkAuth = (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    } else {
        req.logger.info('User not authenticated, redirecting to login');
        return res.redirect('/login');
    }
};

export const roleAuth = (roles) => (req, res, next) => {
    if (!req.user) {
        req.logger.info('No user found in request, redirecting to login');
        return res.status(401).redirect('/login');
    }

    const userRole = req.user.role;
    const isAuthorized = roles.some(role => userRole.includes(role));

    if (!isAuthorized) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    next();
};

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