const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const config = require('./config');

//módulos
const genders = require('./modules/genders/routes');
const people = require('./modules/people/routes');
const users = require('./modules/users/routes');
const tasks = require('./modules/tasks/routes');
const taskState = require('./modules/taskstates/routes');

const app = express();

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Configuración
app.set('port', config.app.port);

//Comunicación con el front
app.use(cors());

//Rutas
app.use('/api/genders', genders);
app.use('/api/people', people);
app.use('/api/users', users);
app.use('/api/tasks', tasks);
app.use('/api/taskstates', taskState);

module.exports = app;
