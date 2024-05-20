import { createHash } from "../../utils/bcrypt.js";

class UserDTO {
    constructor(user){
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = createHash(user.password);
        this.role = user.role;
        this.lastConnection = user.lastConnection
    
    }

    getCurrentUser() {
        return {
            fullName: this.firstName + ' ' + this.lastName,
            email: this.email,
            role: this.role,
            lastConnection: this.lastConnection
        };
    }
}

export default UserDTO;
