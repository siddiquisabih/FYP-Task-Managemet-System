var express = require('express')
var app = express()
var routes = require("./route/routes")
var bodyParser = require('body-parser')
var mongoose = require('mongoose')



// mongoose.connect('mongodb://patient:patient123@ds139869.mlab.com:39869/patient',
mongoose.connect('mongodb://localhost/dbs', {
    useMongoClient: true
})

app.use(bodyParser.json())

routes(app)

app.use((err, req, res, next) => {
    console.log(err.message)
    res.send(err.message)
    next()
})


module.exports = app