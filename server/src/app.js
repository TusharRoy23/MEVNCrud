'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require("./Config");
const mongoose = require('mongoose')
const app = express()

const port = config.APP_PORT || 4040
mongoose.connect(config.DB, {
    useNewUrlParser: true
})
app.listen(port);
console.log('App listening on port ' + port)


app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}))

const routes = require('./routes/Routes');
app.use("/skill", routes);

module.exports = app;