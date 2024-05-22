import { userModel } from "../models/user.model.js";

export class Users {

    async getUsers(){
        try {
            const users = await userModel.find();
            return users
        } catch (error) {
            req.logger.error('Cannot get users')
            throw new Error('Cannot get users');
        }
    }

    async getUsersByEmail(email){
        try {
            const user = await userModel.findOne({ email });
            return user
        } catch (error) {
            req.logger.error('Cannot get users')
            throw new Error('Cannot get users');
        }
    }

    async updateUser(id, updateData) {
        try {
            const user = await userModel.findById(id);
            if (!user) {
                console.error('User not found');
                return null;
            }
                // si hay datos de documentos en la actualización hago esto
            if (updateData.documents) {
                // Actualizar documentos del usuario
                user.documents = updateData.documents;
            }
                // si hay otros datos de usuario en la actualización entro por aca
            const userFields = ['firstName', 'lastName', 'email', 'age', 'password', 'role', 'cart', 'tokenRestore', 'lastConnection'];
            userFields.forEach(field => {
                if (updateData[field] !== undefined) {
                    user[field] = updateData[field];
                }
            });
    
            const updatedUser = await user.save();
            return updatedUser;
        } catch (error) {
            console.error('Error updating user:', error);
            throw new Error('Error updating user');
        }
    };
    


    async getUserById(id) {
        try {
            const user = await userModel.findById(id);
            return user;
        } catch (error) {
            console.error('Error getting user by ID:', error);
            throw new Error('Error getting user by ID');
        }
    }

    async getUserByToken(token){
        try {
            // Buscar un usuario que tenga el token especificado dentro del objeto tokenRestore
            const user = await userModel.findOne({ 'tokenRestore.token' : token });
            return user;
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener usuario por token');
        }
    };

    async getUsersByLastConnection(lastConnection) {
        try {
            const users = await userModel.find({ lastConnection: { $lt: lastConnection } });
            return users;
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener usuarios por última conexión');
        }
    }

    async deleteUserById(userId) {
        try {
            return await userModel.findByIdAndDelete(userId);
        } catch (error) {
            console.error('Error deleting user by ID:', error);
            throw new Error('Error deleting user by ID');
        }
    }
    
}
