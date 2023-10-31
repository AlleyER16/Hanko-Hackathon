### TastyByte

TastyByte is a solution for a small food selling store that wants to go digital but starting locally within a region
in this use-case Ibadan. It is basically an e-commerce platform where customers can order for meals on it and provide
their delivery information for it to be delivered to them.

## Tech Stack

MERN Stack (MongoDB, Express, React and Node)

# Front-end

1. HTML
2. CSS
3. SASS
4. JavaScript
5. TypeScript
6. React + Vite

# Back-end

1. Node JS
2. Express JS

# Authentication

`Frontend`: Hank Authentication
`Backend`: Hanko Authentication

# Database

MongoDB
`Database Library Used`: Mongoose

## Project Structure

This is a mono-repo so both frontend and backend code are in the same repository but essentially it is follows a split
architecture where the front-end is separated from the application logic(the backend). Both frontend and Backend are in
separate folders

# Front-end

A simple React + Vite + Typescript application. Folder structure

1. `public`: Static assets used by the application
2. `sass`: Simple 7-1 architecture for sass project but using just 5
   a. abstracts: These contributes styles that do not render a ui e.g sass variables, functions and mixins
   b. base: This folder contains typography, css reset in \_base.scss, animations and utilities
   c. components: This folder contains styling for different components used in the application
   d. layouts: This folder contains styles for different layours around the appliation
   e. pages: This folder contains page specific styling
3. `src`: This folder is where the React front-end application logic goes into
4. `ui`: This is a template of the application which is basically the design in pure HTML and CSS
5. env_template: This is the template for the .env file it includes what variables the .env file should contain
   such as `HANKO_API_URL`, `BACKEND_API_URL` and `PAYSTACK_PUBLIC_KEY`(for paystack payent gateway integration)
6. other config files like .eslintrc, vite.config.js, tsconfig.json and so on
7. package.json: Contains packages to be installed to run the application all of which can be installed using `npm install`,
   This file also contains some additional scripts added by me to compile the sass into pure css to be used in the React application and the template which is in the ui folder

`watch:sass` script once run using `npm run watch:sass` runs two `node-sass` scripts in parallel that compiles the sass into pure css including a .css.map file into `src/App.css` folder to be used by react and `ui/assets/css/style.css` to be used by the template

# Front-end deployment instructions

1. Install packages using `npm install`
2. Create .env file with environment variables specified in .env_template
3. Set up backend and include the url in the environment variable
4. Run for development using `npm run dev` or build a production ready version using `npm run build`

# Backend

A simple node express application. Folder structure

1. `controllers`: Contains api route handlers, error handlers and authentication handlers
2. `data`: Contains data generated during application running such as payment transaction dumps and payment validation dumps
3. `db`: Contains methods to connect to MongoDB database
4. `init`: Contains data to load for initial set up of the application
5. `models`: Contains mongoose models and schema which defines the database structure for the application
6. `routers`: Handles API routing
7. `utils`: Contains utilities to help the application function well
8. env_template: Works same sas it is with the frontend it should be used as a template to create necessary variables for the application to run such as `NODE_ENV`, `MONGO_URI`, `HANKO_API_URL`, `STATIC_FILES_URL` and `DELIVERY_FEE` which is the static delivery fee used for the application as it is locally for a start
9. other configuration files and package.json

# Back-end deployment instruction

1. Set up the .env file based on the .env_template file and fill in the appropriate variables
2. Create a mongodb instance and paste the MONGO_URI in the .env file
3. run the `load-data.js` file in the `init` folder to load initial meals data and meal types and also create a structure for the static files. Note: run from the backend as the current working directory in the command line as it uses the same .env file
4. upload resulting meals folder to a static file server that can serve the files for the application
5. Run with `npm run dev` to run with nodemon or `npm start` for start the application once
6. Make sure to add the base url for the backend application to the frontend's .env to link them both
