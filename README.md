**### WHAT'S NEW ON MY BACKEND PROJECT?

#### /api/session/current added view in which the backend responds from the session showing the data of the authenticated user

#### Authentication and Authorization Enhancements
- Integrated Passport.js library ( https://www.npmjs.com/package/passport )for streamlined authentication strategies, including local authentication and login with GitHub using passport-github2 ( https://www.npmjs.com/package/passport-github2 ).
- Implemented local authentication strategy for registering and logging in users with username and password.
- Added GitHub authentication strategy to allow users to log in using their GitHub accounts.

#### Handlebars Views and Access Control
- Updated Handlebars views for registration, login, and product pages to ensure secure access and improved user experience.
- Configured access control for certain views, such as product pages, to be available only when the user is authenticated.

#### User Role Management
- Developed user role management logic to assign roles such as admin or user based on authentication credentials.
- Implemented validation for admin credentials within the JavaScript code, followed by storage in MongoDB using a defined schema.

**Summary:** 
The recent updates include enhancements to authentication and authorization with Passport.js, integration of GitHub login via passport-github2, improved Handlebars views with access control, and user role management for admin privileges. These updates aim to enhance security and usability within the backend project.
**
