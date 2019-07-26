var authControler = require("../controler/authControler")
var taskControler = require("../controler/taskControler")
var empControler = require("../controler/empControler")
var chatControler = require("../controler/chatController")
var expControler = require("../controler/expControler")

module.exports = (app) => {


    // authentication
    // app.post('/api/signup', authControler.signup)
    app.post('/api/login', authControler.login)




    // task 
    // create 
    app.post('/api/task/create', taskControler.createTask)
    app.post('/api/task/update', taskControler.updateTask)
    app.get('/api/task/getAllTaskByEmpID/:employeeId', taskControler.getAllTaskByEmpID)
    app.get('/api/task/getAllByYouTask/:employeeId', taskControler.getAllTaskByYou)
    app.get('/api/task/filter/:employeeId/:filterOptions', taskControler.filterTask)


    // app.get('/api/task/getAll/',taskControler.getAllTask)

    // Employee
    app.post('/api/create/employee', empControler.createEmp)
    app.post('/api/update/employee', empControler.updateEmp)
    app.get('/api/employee/getAllEmployees/:employeeId', empControler.getAllEmployees)
    app.post('/api/change/password/:employeeId', empControler.changePassword)
    app.post('/api/team/addMember/:employeeId', empControler.addTeamMember)
    app.get('/api/team/deleteMember/:employeeId/:deleteEmpId', empControler.deleteMembers)
    app.get('/api/team/getMemberList/:employeeId', empControler.getUserTeamMembers)
    app.get('/api/team/getAllForTeam/:employeeId', empControler.getAllEmployeesForTeam)


    // communication 

    app.post('/api/create/chat', chatControler.createChat)
    app.get('/api/chat/toYou/getByEmpId/:employeeId', chatControler.getToYouChat)
    app.get('/api/chat/byYou/getByEmpId/:createdId', chatControler.getByYouChat)

    app.get('/api/chat/getChatByTranId/:tranId', chatControler.getChatByTranId)
    app.post('/api/chat/sendMessage/:tranId', chatControler.sendMessage)



    // expense 

    app.post('/api/expense/create', expControler.createExpense)
    app.get('/api/expense/getAll', expControler.getAllExpense)
    app.post('/api/expense/updateExpense' , expControler.updateExpense)
    app.get('/api/expense/getByEmpId/:employeeId' , expControler.getExpenseByEmpId)




}