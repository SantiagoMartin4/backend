import { Router } from "express";
import { userModel } from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import passport from "passport";

const sessionRoutes = Router();

sessionRoutes.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), async (req, res) => {
    //ahora se maneja todo desde passport (validación y creado en DB), por lo que si pasa mediante middleware toda esa autenticaciòn, solamente mando el send user registered
    res.status(201).send({ message: 'user registered' });

    /* const { firstName, lastName, email, age, password } = req.body;
    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        try {
            const user = await userModel.create({
                firstName,
                lastName,
                age,
                email,
                isAdmin: "admin",
                password: createHash(password)
            });
            req.session.user = user;
            res.redirect('/');
        } catch (error) {
            console.error(error);
            res.status(400).send({ error });
        }
    }
    else {
        try {
            const user = await userModel.create({
                firstName,
                lastName,
                age,
                email,
                isAdmin: "user",
                password: createHash(password)
            });
            req.session.user = user;
            res.redirect('/');
        } catch (error) {
            console.error(error);
            res.status(400).send({ error });
        }
    } */
});

sessionRoutes.get('/failregister', (req, res) => {
    res.status(400).send({ error: 'fail to register' })
})

sessionRoutes.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), async (req, res) => {
    /*     const { email, password } = req.body;
        try {
            const user = await userModel.findOne({ email: email });
            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }
            if (!isValidPassword(user, password)){
                return res.status(401).send({ message: 'Invalid credentials' });
            }
            req.session.user = user;
            return res.redirect('/products');
        } catch (error) {
            console.log(error)
            return res.status(400).send({ error })
        } */
    if (!req.user) {
        return res.status(400).send({ message: 'Invalid credentials' })
    }
    req.session.user = {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        age: req.user.age,
        email: req.user.email
    }
    res.redirect('/');
});



sessionRoutes.post('/logout', async (req, res) => {
    try {
        req.session.destroy((error) => {
            if (error) {
                return res.status(500).json({ message: 'failed to log out' });
            }
        });
        //lo paso con res.send para manejar el redirect desde el front end con un botón
        res.send({ redirect: 'http://localhost:8080/login' });
        //también se puede hcaer como en el login 
        // res.redirect('/login')
    } catch (error) {
        res.status(400).send({ error })
    }
});

sessionRoutes.post('/restore-password', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).send({ message: 'Unauthorized' });
        }
        user.password = createHash(password);
        await user.save();
        res.send({ message: 'Password has been updated' });
    }
    catch (error) {
        console.error(error);
        res.status(400).send({ error })
    }
});

sessionRoutes.get('/github', passport.authenticate('github', { scope: ['user:email'] }), (req, res) => {

});

sessionRoutes.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    req.session.user = req.user
    res.redirect('/');
});


export default sessionRoutes;