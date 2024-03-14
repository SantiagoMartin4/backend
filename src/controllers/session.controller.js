import UserDTO from '../dao/dtos/user.dto.js';
import { userModel } from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";

export const getCurrentUser = (req, res) => {
    /* const user = asd; */
}

export const register =  async (req, res) => {
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
        return res.status(401).send({ message: 'Invalid credentials' }).redirect('/login');
    }
    req.session.user = {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        age: req.user.age,
        email: req.user.email,
        rol: req.user.rol
    }
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
                return res.status(500).json({ message: 'failed to log out' });
            }
        });
        //lo paso con res.send para manejar el redirect desde el front end con un botón
        res.send({ redirect: 'http://localhost:8080/login' });
        //también se puede hacer como en el login 
        // res.redirect('/login')
    } catch (error) {
        res.status(400).send({ error })
    }
    //otra forma de hacer el logout es asignando null al req.session.user
/*     req.session.user = null;
    res.redirect('/login'); */
};

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

export const githubCallback = (req, res) => {
    req.session.user = req.user
    res.redirect('/products');
};