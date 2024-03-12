import { createHash } from "../../utils/bcrypt.js";

class UserDTO {
    constructor(user){
        this.firstName = user.firstName,
        this.lastName = user.lastName,
        this.email = user.email,
        this.password = createHash(user.password),
        this.rol = user.rol
    }

    getCurrentUser() {
        return {
        fullName: this.firstName + ' ' + this.lastName,
        email: this.email,
        rol: this.rol
        }
    }
}

export default UserDTO;
