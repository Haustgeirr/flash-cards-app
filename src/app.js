const express = require('express');
const v1Router = require('./api/v1');
require('./db/mongoose');

const app = express();

app.use(express.json());
app.use('/api/v1', v1Router);

module.exports = app;
