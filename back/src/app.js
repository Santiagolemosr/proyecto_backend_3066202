const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// middleawares
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true, limit: '50mb'}));

//Rutas
app.use('/api/equipos', require('./routes/equipos.routes'));

module.exports = app;