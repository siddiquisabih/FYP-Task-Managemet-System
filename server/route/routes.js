var authControler = require("../controler/authControler")
var taskControler = require("../controler/taskControler")
var empControler = require("../controler/empControler")

module.exports = (app) => {


    // authentication
    // app.post('/api/signup', authControler.signup)
    app.post('/api/login', authControler.login)




    // task 
    // create 
    app.post('/api/task/create', taskControler.createTask)
    app.post('/api/task/update', taskControler.updateTask)
    app.get('/api/task/getAllTaskByEmpID/:employeeId', taskControler.getAllTaskByEmpID)


    // app.get('/api/task/getAll/',taskControler.getAllTask)

    // Employee
    app.post('/api/create/employee', empControler.createEmp)
    app.post('/api/update/employee', empControler.updateEmp)
    app.get('/api/employee/getAllEmployees/:employeeId', empControler.getAllEmployees)



}