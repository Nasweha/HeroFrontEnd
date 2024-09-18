# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh







yourHero is a Superhero Grievance Website where users can log their grievances, and superheroes can manage and resolve these issues. The platform is visually engaging, with storytelling elements, responsive design, and a dynamic user interface. The project is divided into two separate web applications:

User Application: Allows users to log grievances.
Superhero Dashboard: Enables superheroes to manage and resolve grievances.

superhero feont end 
------------------------

It features user authentication, a dashboard for viewing and managing grievances, and various filtering and searching functionalities. The application is built using React.js and integrates with a backend service to perform CRUD operations.

files
-----------

App.jsx
-------
Routes: Defines the routing for the application, mapping URLs to different components:
/ - Auth page (Auth component)
/dashboard - Dashboard page (DashBoard component)
Auth.js
Login Page: Handles user authentication.
State: Manages email and password inputs.
Login Function: Makes an API call to authenticate the user and sets session storage.
UI: Includes a login form with input fields and a login button. Uses react-toastify for notifications.

Navbar2.js
-----------
Navbar Component: Provides navigation and logout functionality.
Logout: Clears session storage and redirects to the login page.

DashBoard.jsx
------------------

Dashboard Page: Displays and manages grievances.
State: Manages grievances list, search term, filters, and date range.
Fetching Data: Uses getAllGriviencesApi to fetch and display grievances.
Filtering and Search: Allows searching by keyword, status filtering, and date range.
Table: Shows grievances in a table format, with options to view details and delete entries.
Statistics: Displays counts for total, pending, resolved, and in-progress grievances.

Count.jsx
-------------
Grievance Statistics Component: Displays total counts for different grievance statuses.


ViewGriviences.jsx
----------------------
Grievance Detail Modal: Shows detailed information about a specific grievance in a modal.
State: Manages modal visibility and grievance details.
Fetching Data: Uses getGriviencesApi to fetch details and display them.
Updating Status: Allows updating the grievance status via an API call.


Yourhero  Backend
------------------------------- 


AdminController.js
------------------------

The AdminController.js file manages admin-related operations such as authentication.

Structure:
Admin Login:

email:superhero98@gmail.com
password:superhero123

Function: adminlogin
Purpose: Authenticates the admin based on email and password, then generates and returns a JWT token if the credentials are valid.
Libraries Used:
mongoose: ORM for MongoDB, used to interact with the adminlogins model.
jsonwebtoken: Used to generate and verify JWT tokens.


JwtMiddleware.js
-----------------
The JwtMiddleware.js file provides middleware for JWT authentication.

Structure:
JWT Middleware:

Function: jwtmiddleware
Purpose: Verifies the JWT token from the request headers and ensures that the request is authenticated. If verification fails, it returns an authorization error.
Libraries Used:
jsonwebtoken: Used to verify JWT tokens.


FormController.js
-----------------------
The FormController.js file handles grievance-related operations, including retrieving, updating, and deleting grievances.

Structure:
Get All Grievances:

Function: getAllGrievances
Purpose: Fetches and returns all grievances stored in the database.
Get Grievance by ID:

Function: getGrievanceById
Purpose: Retrieves and returns details of a specific grievance based on its ID.
Update Grievance Status:

Function: viewgriviences
Purpose: Updates the status of a specific grievance based on its ID.
Delete Grievance:

Function: deleteGriviences
Purpose: Deletes a specific grievance from the database based on its ID.
Libraries Used:
mongoose: ORM for MongoDB, used to interact with the griviences model.



index.js
--------------
The index.js file initializes and runs the Express server.

Structure:
Server Setup:

Function: Initializes and starts the server.
Purpose: Configures environment variables, sets up middleware (CORS, JSON parsing), and connects to the database. Listens on a specified port and logs server status.
Libraries Used:
express: Web framework for Node.js, used to create the server.
cors: Middleware to enable Cross-Origin Resource Sharing.
dotenv: Used to manage environment variables.
mongoose: ORM for MongoDB, used to establish a database connection.


router.js
----------------
The router.js file defines the API routes and connects them to respective controllers.

Structure:
Route Definitions:

Route: POST /adminlogin

Function: Connects to adminController.adminlogin
Purpose: Handles admin login requests.
Route: GET /allgriviences

Function: Connects to formController.getAllGrievances
Purpose: Retrieves all grievances.
Route: PUT /editgrivience/:id

Function: Connects to formController.viewgriviences
Purpose: Updates the status of a specific grievance.
Route: GET /getgrievancebyId/:id

Function: Connects to formController.getGrievanceById
Purpose: Retrieves details of a specific grievance by ID.
Route: DELETE /deletegrivience/:id

Function: Connects to formController.deleteGriviences
Purpose: Deletes a specific grievance by ID.
Libraries Used:
express: Web framework for Node.js, used to define routes.