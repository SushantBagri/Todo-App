require("dotenv").config();
const express = require("express");
const app = express();

const knex = require('./models/db');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const moment = require('moment');

const isUserAuthenticated = require('./middleware/middleware');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 5000;


//route for sign up
const signup = express.Router();
app.use('/', signup);
require('./routes/signup')(knex, bcrypt, signup);

//route for login
const login = express.Router();
app.use('/', login);
require('./routes/login')(login, knex, bcrypt);


//route for user
const user = express.Router();
app.use('/', user);
require('./routes/user')(user, knex, isUserAuthenticated);

//route for city
const city = express.Router();
app.use('/', city);
require('./routes/city')(city, knex);


//route for post and getting todos
const todo = express.Router();
app.use('/', todo);
require('./routes/todo.js')(todo, knex, moment, isUserAuthenticated);

app.listen(PORT, () => {
    console.log(`app is listening at ${PORT} port`);
})