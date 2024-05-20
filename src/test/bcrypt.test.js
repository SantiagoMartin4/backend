import { createHash, isValidPassword } from "../utils/bcrypt.js";
import { expect } from "chai"


describe('Functionality test for Bcrypt', () => {
    it('Password must be correctly Hashed', async function (){
        const password = await createHash('123456789');
        const hashRegExp = /(?=[A-Za-z0-9@#$%/^.,{}&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/g;
        expect(password).to.match(hashRegExp);
    });

    it('Realized Hash must been correctly compared with the UNHashed Password', async () => {
        const originalPassword = '123456789';
        const hashedPassword = await createHash(originalPassword);
        const isValid = await isValidPassword({password: hashedPassword}, originalPassword);
        expect(isValid).to.be.true;
    });

})