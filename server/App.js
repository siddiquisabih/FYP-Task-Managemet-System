var express = require('express')
var app = express()
var routes = require("./route/routes")
var bodyParser = require('body-parser')
var mongoose = require('mongoose')



// mongoose.connect('mongodb://patient:patient123@ds139869.mlab.com:39869/patient',
mongoose.connect('mongodb://10.30.1.124:27017/dbs', {
    useMongoClient: true,
})


app.use(bodyParser.json())

routes(app)

app.use((err, req, res, next) => {
    console.log(err.message)
    res.send(err.message)
    next()
})


module.exports = app