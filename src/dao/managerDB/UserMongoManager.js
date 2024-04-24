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
            const user = await userModel.findOne({email : email});
            return user
        } catch (error) {
            req.logger.error('Cannot get users')
            throw new Error('Cannot get users');
        }
    }

    async updateUser(id, tokenObj){
        try {
            const updated = await userModel.findOneAndUpdate({ _id: id }, { tokenRestore: tokenObj });
            return updated;
        } catch (error) {
            req.logger.error('Cannot update User')
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
}