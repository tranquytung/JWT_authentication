const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routers/user');
require('dotenv').config();
const app = express();

require('./db/db');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json());


app.use(userRouter);

let PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running port ${PORT}`));