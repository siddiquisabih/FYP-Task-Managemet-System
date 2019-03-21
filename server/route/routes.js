var authControler = require("../controler/authControler")
var taskControler = require("../controler/taskControler")
var empControler = require("../controler/empControler")

module.exports = (app) => {


    // authentication
    app.post('/api/signup', authControler.signup)
    app.post('/api/login', authControler.login)




    // task 
    // create 
    app.post('/api/tast/create', taskControler.createTask)


    // Employee
    app.post('/api/create/employee', empControler.createEmp)
    app.post('/api/update/employee', empControler.updateEmp)



}