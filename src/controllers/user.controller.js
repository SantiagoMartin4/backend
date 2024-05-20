import UserDTO from "../dao/dtos/user.dto.js";
import { Users } from "../dao/managerDB/UserMongoManager.js";
import MailingService from "../services/mailing.js";

const userController = new Users();
const mailingService = new MailingService();

export const premiumRole = async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await userController.getUserById(uid);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        if (user.role === 'premium') {
            user.role = 'user';
            await userController.updateUser(user._id, { role: user.role });
            return res.send({ message: 'Premium user downgraded to user successfully' });
        }

        const requiredFields = ['identification', 'proof_of_address', 'bank_statement'];
        const userFields = user.documents.map(doc => doc.field);

        const missingFields = requiredFields.filter(field => !userFields.includes(field));

        if (missingFields.length > 0) {
            return res.status(400).send({ message: 'User has not completed all required documents', missingFields });
        }

        user.role = 'premium';
        await userController.updateUser(user._id, { role: user.role });

        res.send({ message: 'User upgraded to premium successfully' });
    } catch (error) {
        req.logger.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};


export const documents = async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).send({ message: 'Unauthorized, please authenticate' });
        }

        const userEmail = req.session.user.email;
        const user = await userController.getUsersByEmail(userEmail);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const files = req.files;

        const documentFields = ['profile_image', 'product_image', 'identification', 'proof_of_address', 'bank_statement'];

        documentFields.forEach(field => {
            if (files[field]) {
                files[field].forEach(file => {
                    user.documents.push({
                        name: file.originalname,
                        reference: file.path,
                        field: field
                    });
                });
            }
        });

        await userController.updateUser(user._id, { documents: user.documents });
        res.send({ message: 'Documents uploaded successfully' });
    } catch (error) {
        console.error('documents controller error', error);
        res.status(400).send({ error });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await userController.getUsers();
        const usersDTO = users.map(user => new UserDTO(user).getCurrentUser());
        res.send(usersDTO);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

export const deleteInactiveUsers = async (req, res) => {
    try {
        // deje el threshold en dos días.  2 * 60 * 1000 --> ese es el de 2 minutos para testing
        const inactiveThreshold = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); 
        const inactiveUsers = await userController.getUsersByLastConnection(inactiveThreshold);

        await Promise.all(inactiveUsers.map(async (user) => {
            await mailingService.sendSimpleMail({
                from: "E-Commerce",
                to: user.email,
                subject: "Eliminación de cuenta por inactividad",
                html: `<p>Hola ${user.firstName}, tu cuenta ha sido eliminada por inactividad.</p>`
            });
            req.logger.info('Mail Sent');
            
            // Elimina al usuario de la base de datos
            await userController.deleteUserById(user._id);
        }));
        req.logger.info('Inactive users successfully deleted');
        res.send({ message: 'Inactive Users Succesfully Deleted' });
    } catch (error) {
        console.error('Error deleting inactive users:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
};