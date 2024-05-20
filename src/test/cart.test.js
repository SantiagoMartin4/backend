import { expect } from "chai"
import supertest from "supertest"

const requester = supertest('http://localhost:8080');

describe('Testing module for Cart functionality', () => {

    describe('Test for GET requests', () => {
        it('Test for GET method on endpoint /api/carts, should get all carts', async () => {
            const { statusCode, _body } = await requester.get('/api/carts');
            expect(statusCode).to.be.equal(200);
            expect(_body).to.be.an('array')
        })
    });
    it('Test for GET method on endpoint /api/carts/:id, should get an specific cart that matchs the provided ID', async () => {
        const { statusCode, _body } = await requester.get('/api/carts');
        expect(statusCode).to.be.equal(200);;
        expect(_body).to.be.an('array');
        //hago un puntero al id, el _body trae un [] con varios carts {}. accedo al primero de ellos (posicion 0) y luego a la variable _id
        const pointerForId = _body[0]._id
        // hago una segunda solicitud para solicitar un carrito específico por ID
        const { statusCode: statusCodeID, _body: bodyID } = await requester.get(`/api/carts/${pointerForId}`);
        expect(statusCodeID).to.be.equal(200);
        expect(bodyID).to.be.an('object');
    });
});