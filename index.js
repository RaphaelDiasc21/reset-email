const express = require("express");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.json());

// routes
const user = require("./routes/user");

app.use(user);

app.listen(3400);