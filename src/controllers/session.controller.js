import UserDTO from '../dao/dtos/user.dto.js';
import { userModel } from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import { port } from '../config/config.js';
import MailingService from '../services/mailing.js';
import { verifyToken, generateToken } from '../utils/uuid.js'
import { Users } from '../dao/managerDB/UserMongoManager.js';


const userService = new Users();
const mailingService = new MailingService();


export const getCurrentUser = (req, res) => {
    /* const user = asd; */
}

export const register = async (req, res) => {
    //ahora se maneja todo desde passport (validación y creado en DB), por lo que si pasa mediante middleware toda esa autenticaciòn, solamente mando el send user registered
    res.status(201).redirect('/login')
};

export const failedRegister = (req, res) => {
    res.status(400).send({ error: 'fail to register' })
};

export const current = async (req, res) => {
    const userData = req.user;
    const user = new UserDTO(userData);
    const currentUser = user.getCurrentUser()
    res.render('current', currentUser)
}

export const login = (req, res) => {
    if (!req.user) {
        req.logger.error("Credentials Error");
        return res.status(401).send({ message: 'Invalid credentials' }).redirect('/login');
    }
    req.session.user = {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        age: req.user.age,
        email: req.user.email,
        rol: req.user.rol
    }
    req.logger.info(`User logged: ${req.user.email}`);
    res.redirect('/products');
};

export const failLogin = (req, res) => {
    console.log('fail login')
    res.status(400).send({ error: 'fail to login' })
}

export const logout = async (req, res) => {
    try {
        req.session.destroy((error) => {
            if (error) {
                req.logger.error("Logout failed");
                return res.status(500).json({ message: 'failed to log out' });
            }
        });
        //lo paso con res.send para manejar el redirect desde el front end con un botón
        req.logger.info("User logged out");
        res.send({ redirect: `http://localhost:${port}/login` });
        //también se puede hacer como en el login 
        // res.redirect('/login')
    } catch (error) {
        req.logger.error('Logout Error');
        res.status(400).send({ error })
    }
    //otra forma de hacer el logout es asignando null al req.session.user
    /*     req.session.user = null;
        res.redirect('/login'); */
};

export const forgotPassword = async (req, res) => {
    /*     let tokens = {}; */
    try {
        const { email } = req.body;

        // Generar un token único con tiempo de expiración
        const tokenObj = generateToken();
        const token = tokenObj.token;

        const user = await userModel.findOne({ email });
        if (!user) {
            const invalidUser = true;
            return res.render('forgot-password', {invalidUser})
        }
        await userService.updateUser(user._id, tokenObj);
        // Enviar el correo electrónico con el enlace que contiene el token
        await mailingService.sendSimpleMail({
            from: "E-Commerce santiagomartin.44@gmail.com",
            to: email,
            subject: "Change your Password",
            html: `
            <h1>Hello, did you forget your password?
            here is a link to reset it </h1>
            <p>Click on the following link <a href="http://localhost:${port}/api/session/restore-password/${token}">here</a> to restore your password</p>
        `
        });
        const handlebarsValidation = true;
        req.logger.info('Email sent');
        res.render('forgot-password', { handlebarsValidation })
    } catch (error) {
        req.logger.error('Cannot send Mail')
        res.status(400).send({ error })
    }
};

/* export const restorePasswordToken = async (req, res) => {
    try {
        const { token } = req.params;
        // Obtener el usuario utilizando el token
        const user = await userService.getUserByToken(token);
        console.log(user, 'aca');
        if (!user) {
            const wrong = true;
            return res.render("forgot-password", { wrong });
        }
        const tokenObj = user.tokenRestore;
        if (tokenObj && verifyToken(tokenObj)) {
            res.redirect('/restore-password')
        }
        else {
            const wrong = true;
            return res.render("forgot-password", { wrong });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error while restoring passwork with token' });
    }
}; */
export const restorePasswordToken = async (req, res) => {
    try {
        const { token } = req.params;
        // Obtener el usuario utilizando el token
        
        const user = await userService.getUserByToken(token);
/*         if (user === null || user === undefined) {
            const wrong = true;
            return res.render("forgot-password", { wrong });
        } */
        // Acceder directamente al token dentro de tokenRestore
        const tokenObj = user.tokenRestore;
        if (tokenObj && verifyToken(tokenObj)) {
            res.redirect('/restore-password');
        } else {
            // El token no es válido o ha expirado
            const wrong = true;
            return res.render("forgot-password", { wrong });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error while restoring password with token' });
    }
};


export const restorePassword = async (req, res) => {
/*     const { token } = req.params;  */
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            req.logger.error('Cannot access')
            return res.status(400).send({ message: 'Unauthorized or invalid token' });
        }

        // Verificar si la contraseña nueva es diferente de la anterior
        /* if (password === user.password) { */
        if (isValidPassword(user, password)) {
            const passwordRepeat = true;
            return res.render('restore-password', { passwordRepeat});
        }
        // Actualizar la contraseña del usuario y eliminar el token utilizado
        user.password = createHash(password);
/*         user.tokenRestore = null; // Eliminar el token */
        await user.save();
        req.logger.info('password successfully changed')
        res.redirect('/login')
    } catch (error) {
        req.logger.error('something went wrong while restoring password')
        res.status(400).send({ error: 'Error updating password' });
    }
};

/* 
export const restorePassword =  async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send({ message: 'Unauthorized' });
        }
        user.password = createHash(password);
        await user.save();
        res.send({ message: 'Password has been updated' });
    }
    catch (error) {
        console.error(error);
        res.status(400).send({ error })
    }
};
 */




export const githubCallback = (req, res) => {
    req.session.user = req.user
    res.redirect('/products');
};