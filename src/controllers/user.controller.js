import { Users } from "../dao/managerDB/UserMongoManager.js";

const userController = new Users();

    export const premiumRole = async (req, res) => {
        try {
            const userEmail = req.user.email
            const user = await userController.getUsersByEmail(userEmail);
            if (req.user.role === 'premium') {
                user.role = 'user';
                await user.save(); // Esperar a que se guarde el usuario
                res.send({message: 'Role updated'});
            } else {
                user.role = 'premium';
                await user.save(); // Esperar a que se guarde el usuario
                res.send({message: 'Role updated'});
            }
        } catch (error) {
            req.logger.error(error);
            res.status(400).send({error});
        }
    };
    
    