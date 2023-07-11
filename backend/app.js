const process = require('process');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { routers } = require('./routes');
const { MONGO_DB, PORT, CORS_OPTIONS } = require('./utils/config');

process.on('uncaughtException', (err, origin) => {
  console.log(`${origin} ${err.name} c текстом ${err.message} не была обработана. Обратите внимание!`);
});

const app = express();

mongoose.connect(MONGO_DB, { useNewUrlParser: true }).catch((err) => console.log(err));

app.use(cors(CORS_OPTIONS));

app.use(routers);

app.listen(PORT);
