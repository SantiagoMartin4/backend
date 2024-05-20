import { expect } from "chai";
import supertest from "supertest";
import { userAdmin, passAdmin } from "../config/config.js";

const requester = supertest('http://localhost:8080');

describe('Testing module for Product functionality', () => {

    let tokenCookie; 

    // Iniciar sesión como usuario administrador antes de cada prueba
    beforeEach(async () => {
        const userAdminLogin = {
            email: userAdmin,
            password: passAdmin
        };
        const loginResponse = await requester.post('/api/session/login').send(userAdminLogin);
        expect(loginResponse.statusCode).to.be.equal(302);
        const cookies = loginResponse.headers['set-cookie'];
        tokenCookie = cookies.find(cookie => cookie.startsWith('connect.sid'));
    });

    describe('Test for GET requests', () => {
        it('Test for GET method on endpoint /api/products, should get all products', async () => {
            const { statusCode, _body } = await requester.get('/api/products').set('Cookie', tokenCookie);
            expect(statusCode).to.be.equal(200);
            expect(_body).to.be.an('object');
            expect(_body.payload).to.be.an('array');
        });

        it('Test for GET method on endpoint /api/products/:id, should get a specific product that matches the provided ID', async () => {
            const { statusCode, _body } = await requester.get('/api/products').set('Cookie', tokenCookie);
            expect(statusCode).to.be.equal(200);
            expect(_body).to.be.an('object');
            expect(_body.payload).to.be.an('array');
            const pointerForId = _body.payload[0]._id;
            const { statusCode: statusCodeID, _body: bodyID } = await requester.get(`/api/products/${pointerForId}`).set('Cookie', tokenCookie);
            expect(statusCodeID).to.be.equal(200);
            expect(bodyID).to.be.an('object');
        });
    });

    describe('Test for POST requests functionality', () => {
        it('Endpoint POST on /api/products must create a product successfully', async () => {
            const newProductMock = {
                title: "Test Product",
                description: "This is a test product",
                category: 'Cat 4',
                code: "TP001",
                stock: 10,
                thumbnail: "http://example.com/thumbnail.jpg",
                price: 100
            };
            const { statusCode, _body } = await requester.post('/api/products').send(newProductMock).set('Cookie', tokenCookie);
            expect(statusCode).to.be.equal(201);
            expect(_body).to.be.an('object');
            expect(_body).to.have.property('message', 'Product added');
        });
    });
    // TESTING PARA LAS SOLICITUDES PUT Y DELETE (FALTA PULIR CON VARIABLES DE ENTORNO Y TESTEAR BIEN)

describe('Test for PUT and DELETE requests', () => {

    describe('Test for PUT method', () => {
        it('Test for PUT method on endpoint /api/products/:id, should update an existing product', async () => {
            // Obtener todos los productos
            const { statusCode: getStatus, _body: getBody } = await requester
                .get('/api/products')
                .set('Cookie', tokenCookie);
            expect(getStatus).to.be.equal(200);
            expect(getBody).to.be.an('object');
            expect(getBody.payload).to.be.an('array');

            // Obtener el ID del primer producto
            const pointerForId = getBody.payload[0]._id;

            // Crear el objeto de producto actualizado
            const updatedProduct = {
                title: "Updated Product",
                description: "This product has been updated VIA TESTING",
                category: "Cat 1",
                code: "TP00100",
                stock: 20,
                thumbnail: "http://example.com/updated_thumbnail.jpg",
                price: 150
            };

            // Realizar la solicitud PUT para actualizar el producto
            const { statusCode: statusCodeUpdate, body: bodyUpdate } = await requester
                .put(`/api/products/${pointerForId}`)
                .send(updatedProduct)
                .set('Cookie', tokenCookie);

            // Verificar que la solicitud PUT se haya realizado correctamente
            expect(statusCodeUpdate).to.be.equal(200);
            expect(bodyUpdate).to.be.an('object');
            expect(bodyUpdate).to.have.property('message', 'OK');
        });
    });

    describe('Test for DELETE method', () => {
        it('Test for DELETE method on endpoint /api/products/:id, should delete an existing product', async () => {
            // Obtener todos los productos
            const { statusCode: getStatus, _body: getBody } = await requester
                .get('/api/products')
                .set('Cookie', tokenCookie);
            expect(getStatus).to.be.equal(200);
            expect(getBody).to.be.an('object');
            expect(getBody.payload).to.be.an('array');

            // Obtener el ID del primer producto
            const pointerForId = getBody.payload[0]._id;

            // Realizar la solicitud DELETE para eliminar el producto
            const { statusCode: statusCodeDelete, body: bodyDelete } = await requester
                .delete(`/api/products/${pointerForId}`)
                .set('Cookie', tokenCookie);

            // Verificar que la solicitud DELETE se haya realizado correctamente
            expect(statusCodeDelete).to.be.equal(200);
        });
    });
});
});