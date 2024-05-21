English version 

# E-commerce Backend

This project is part of a programming course and consists of developing the backend for an e-commerce application. The main goal is to apply and demonstrate the technologies and skills learned throughout the course.

## Project Description

The backend of this e-commerce application allows users to perform actions such as registration, login, product management, shopping cart handling, and user administration. Additionally, it includes user roles, allowing the existence of administrators who can manage products and users more advancedly.

## Main Features

- **Authentication and Authorization**: User registration and login, role management (user, admin).
- **Product Management**: CRUD (Create, Read, Update, Delete) operations for products.
- **Shopping Cart**: Add and remove products from the cart, view the cart content.
- **User Management**: Viewing, updating roles, and deleting users by the admin.
- **Document Upload**: Users can upload necessary documents for account verification.
- **Mailing Service**: Integration with Nodemailer to send emails.
- **GitHub Login**: Authentication using the GitHub account.
- **Real-time Notifications**: Use of Socket.io for real-time updates.
- **Logging**: Implementation of loggers with Winston.
- **API Documentation**: Complete API REST documentation with Swagger.
- **Testing**: Tests performed with Chai, Mocha, and Supertest.
- **Tools**: Postman for API testing, MongoDB in command-line mode and with Compass.

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime environment on the server.
- **Express.js**: Web application framework for Node.js.
- **Nest.js**: Progressive Node.js framework for building efficient, scalable server-side applications.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM (Object Data Modeling) for MongoDB and Node.js.
- **Passport.js**: Authentication middleware for Node.js.
- **Socket.io**: Library for real-time web applications.
- **Nodemailer**: Node.js module to send emails.
- **Swagger**: Tool for API documentation.
- **Chai**: Assertion library for Node.js and the browser.
- **Mocha**: Test framework for Node.js.
- **Supertest**: HTTP assertion library.
- **Postman**: Tool for API testing.
- **Artillery**: Performance testing tool for applications.
- **Docker**: Platform for developing, shipping, and running applications in containers.
- **Kubernetes**: Container orchestration system for automating application deployment, scaling, and management.
- **Layered Architecture**: Use of the MVC (Model-View-Controller) pattern to structure the application.
- **Factory Pattern**: Implementation of the Factory design pattern for object creation.
- **Clustering and Performance**: Use of clustering techniques to improve application performance and availability.
- **Passport Local Session**: User session management through authentication with Passport.js.
- **JWT (JSON Web Tokens)**: Used for user authentication and authorization.

## Contributions

Contributions are welcome. If you have any ideas, suggestions, or corrections, feel free to fork the project and submit a pull request.

## Contact

For any queries or comments about the project, you can contact me through my GitHub profile: [SantiagoMartin4](https://github.com/SantiagoMartin4).

## Getting Started

Follow these steps to get a local copy of the project up and running:

1. Clone the repository:
    ```bash
    git clone https://github.com/SantiagoMartin4/backend.git
    ```
2. Install dependencies:
    ```bash
    cd backend
    npm install
    ```
3. Create a `.env` file in the root of the project with the following environment variables:
    ```env
    PORT=8080
    MONGODB_URL=your_mongodb_url
    JWT_SECRET=your_jwt_secret
    GITHUB_CLIENT_ID=your_github_client_id
    GITHUB_CLIENT_SECRET=your_github_client_secret
    ```
4. Start the server:
    ```bash
    npm start
    ```

The server should be running at [http://localhost:8080](http://localhost:8080).

## Deployment

To deploy this application, follow the specific instructions of the deployment platform you choose. This project is configured to work with Railway.app, but it can be adapted to other platforms with minimal adjustments.

```bash
git remote add origin https://github.com/SantiagoMartin4/backend
git push origin main
```

## thank you for your attention to the project!!


****************************************************************************************************************************************************


Versión en Español

# E-commerce Backend

Este proyecto es parte de un curso de programación y consiste en el desarrollo del backend para una aplicación de comercio electrónico (e-commerce). El objetivo principal es aplicar y demostrar las tecnologías y habilidades aprendidas a lo largo del curso.

## Descripción del Proyecto

El backend de este e-commerce permite a los usuarios realizar acciones como registro, inicio de sesión, gestión de productos, manejo de carritos de compra y administración de usuarios. Además, cuenta con roles de usuario, permitiendo la existencia de administradores que pueden gestionar los productos y usuarios de manera más avanzada.

## Funcionalidades Principales

- **Autenticación y Autorización**: Registro e inicio de sesión de usuarios, manejo de roles (usuario, administrador).
- **Gestión de Productos**: CRUD (Crear, Leer, Actualizar, Eliminar) de productos.
- **Carrito de Compras**: Añadir y eliminar productos del carrito, ver el contenido del carrito.
- **Gestión de Usuarios**: Visualización, actualización de roles y eliminación de usuarios por parte del administrador.
- **Subida de Documentos**: Los usuarios pueden subir documentos necesarios para la verificación de su cuenta.
- **Servicio de Mailing**: Integración con Nodemailer para enviar correos electrónicos.
- **Inicio de Sesión con GitHub**: Autenticación utilizando la cuenta de GitHub.
- **Notificaciones en Tiempo Real**: Uso de Socket.io para actualizaciones en tiempo real.
- **Logging**: Implementación de loggers con Winston.
- **Documentación de la API**: Documentación completa de la API REST con Swagger.
- **Testing**: Realización de tests con Chai, Mocha y Supertest.
- **Uso de Herramientas**: Postman para pruebas de API, MongoDB en modo línea de comandos y mediante Compass.

## Tecnologías Utilizadas

### Backend
- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express.js**: Framework para aplicaciones web en Node.js.
- **Nest.js**: Framework progresivo de Node.js para construir aplicaciones eficientes y escalables del lado del servidor.
- **MongoDB**: Base de datos NoSQL para almacenamiento de datos.
- **Mongoose**: ODM (Object Data Modeling) para MongoDB y Node.js.
- **Passport.js**: Middleware de autenticación para Node.js.
- **Socket.io**: Biblioteca para aplicaciones web en tiempo real.
- **Nodemailer**: Módulo de Node.js para enviar correos electrónicos.
- **Swagger**: Herramienta para la documentación de la API.
- **Chai**: Librería de aserciones para Node.js y el navegador.
- **Mocha**: Framework de pruebas para Node.js.
- **Supertest**: Librería para pruebas de HTTP.
- **Postman**: Herramienta para probar APIs.
- **Artillery**: Herramienta de pruebas de rendimiento para aplicaciones.
- **Docker**: Plataforma para desarrollar, enviar y ejecutar aplicaciones dentro de contenedores.
- **Kubernetes**: Sistema de orquestación de contenedores para automatizar la implementación, el escalado y la gestión de aplicaciones en contenedores.
- **Arquitectura por Capas**: Uso del patrón MVC (Modelo-Vista-Controlador) para estructurar la aplicación.
- **Patrón Factory**: Implementación del patrón de diseño Factory para la creación de objetos.
- **Clusterización y Performance**: Uso de técnicas de clusterización para mejorar el rendimiento y la disponibilidad de la aplicación.
- **Passport Local Session**: Manejo de sesiones de usuario mediante autenticación con Passport.js.
- **JWT (JSON Web Tokens)**: Utilizado para la autenticación y autorización de usuarios.

## Contribuciones

Las contribuciones son bienvenidas. Si tienes alguna idea, sugerencia o corrección, no dudes en hacer un fork del proyecto y enviar un pull request.

## Contacto

Para cualquier consulta o comentario sobre el proyecto, puedes contactarme a través de mi perfil de GitHub: [SantiagoMartin4](https://github.com/SantiagoMartin4).

## Cómo Empezar

Sigue estos pasos para obtener una copia local del proyecto y ponerlo en funcionamiento:

1. Clona el repositorio:
    ```bash
    git clone https://github.com/SantiagoMartin4/backend.git
    ```
2. Instala las dependencias:
    ```bash
    cd backend
    npm install
    ```
3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:
    ```env
    PORT=8080
    MONGODB_URL=your_mongodb_url
    JWT_SECRET=your_jwt_secret
    GITHUB_CLIENT_ID=your_github_client_id
    GITHUB_CLIENT_SECRET=your_github_client_secret
    ```
4. Inicia el servidor:
    ```bash
    npm start
    ```

El servidor debería estar corriendo en [http://localhost:8080](http://localhost:8080).

## Despliegue

Para desplegar esta aplicación, sigue las instrucciones específicas de la plataforma de despliegue que elijas. Este proyecto ha sido configurado para funcionar con Railway.app, pero puede adaptarse a otras plataformas con ajustes mínimos.


```bash
git remote add origin https://github.com/SantiagoMartin4/backend
git push origin main
```
## GRACIAS POR TU INTERES EN EL PROYECTO
