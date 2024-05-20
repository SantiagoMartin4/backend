import { expect } from "chai";
import supertest from "supertest";

const requester = supertest('http://localhost:8080');

describe('Testing Session proper fucntionality', () => {

    describe('POST Endpoints Test', () => {
        it('POST endpoint on /api/session/register must register a new user successfully', async () => {
            const userMockRegister = {
                firstName: 'Test',
                lastName: 'Session',
                email: 'test@test.com',
                age: 30,
                password: '1234'
            }
            const registered = await requester.post('/api/session/register').send(userMockRegister);
            //espero que me devuelva un codigo 302 porque tengo el redirect a login en la logica (codigo 302 redirect)
            expect(registered.statusCode).to.be.equal(302);
        });

        it('POST enpoint on /api/session/login must log an existing user successfully', async () => {
            const userMockLogin = {
                email: 'test@test.com',
                password: '1234'
            }
            const loginResponse = await requester.post('/api/session/login').send(userMockLogin);
            expect(loginResponse.statusCode).to.be.equal(302);
        });
    });
});