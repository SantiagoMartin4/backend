import { Router } from "express";
import { userModel } from "../dao/models/user.model.js";

const sessionRoutes = Router();

sessionRoutes.post('/register', async (req, res) => {
    const { firstName, lastName, email, age, password } = req.body;
    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        try {
            const user = await userModel.create({
                firstName,
                lastName,
                age,
                email,
                password,
                isAdmin: "admin"
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
                firstName, lastName, age, email, password
            });
            req.session.user = user;
            res.redirect('/');
        } catch (error) {
            console.error(error);
            res.status(400).send({ error });
        }
    }
});

sessionRoutes.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        if (user.password !== password) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }
        req.session.user = user;
        return res.redirect('/products');
    } catch (error) {
        console.log(error)
        return res.status(400).send({ error })
    }
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
})

export default sessionRoutes;