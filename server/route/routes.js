var authControler = require("../controler/authControler")
var taskControler = require("../controler/taskControler")

module.exports = (app) => {


    // authentication
    app.post('/api/signup', authControler.signup)
    app.post('/api/login', authControler.login)




    // task 
    // create 
        app.post('/api/tast/create' , taskControler.createTask)


    // Employee
    // app.post('/api/create/employee', authControler.signup)



}