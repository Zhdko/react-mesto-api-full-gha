const process = require('process');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { routers } = require('./routes');

const { PORT = 3000, DB = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

process.on('uncaughtException', (err, origin) => {
  console.log(`${origin} ${err.name} c текстом ${err.message} не была обработана. Обратите внимание!`);
});

const app = express();

mongoose.connect(DB, { useNewUrlParser: true }).catch((err) => console.log(err));

app.use(
  cors({
    credentials: true,
    origin: 'https://mesto.zhdko.nomoredomains.monster',
    exposedHeaders: ['set-cookie'],
  }),
);

app.use(routers);

app.listen(PORT);
