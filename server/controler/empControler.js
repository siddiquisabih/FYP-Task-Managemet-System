const empModal = require('../models/employee/empSchema')
module.exports = {


    createEmp: (req, res, next) => {

        const email = req.body.email
        // const password = req.body.password
        const name = req.body.name
        if (!email || !name) {
            res.send({ success: false, message: 'you must provide email and name', returnObject: null })
        }
        empModal.findOne({
            email: email
        }, (err, found) => {
            if (err) {
                return res.send({ success: false, message: err.message, returnObject: null })
            }
            if (found) {
                return res.send({ success: false, message: 'Email Is In Use Or employee already exist', returnObject: null })
            }
            if (!found) {
                var body = req.body
                body.email = body.email.toLowerCase()
                empModal.create(body)
                    .then((data) => {
                        if (data) {
                            var objId = data._id.toString()
                            var customerid = objId.slice(objId.length - 5)
                            empModal.findByIdAndUpdate({ _id: data._id }, { $set: { employeeId: customerid, password: '123456' } }, function (err, doc) {
                                if (err) {
                                    return res.send({ success: false, message: "Can't Create Employee", returnObject: null })
                                }
                                else {
                                    var sendObj = data
                                    return res.send({ success: true, message: "successfully created", returnObject: sendObj })
                                }
                            })
                        }
                    })
                    .catch((error) => {
                        return res.send({ success: false, message: error.message, returnObject: null })
                    })
            }
        })
    },

    updateEmp: (req, res, next) => {

        const employeeId = req.body.employeeId
        const email = req.body.email
        if (!employeeId || !email) {
            res.send("you must provide email")
        }
        empModal.findOne({
            email: email
        }, (err, found) => {
            if (err) {
                return next(err)
            }
            if (found) {
                empModal.findByIdAndUpdate({ _id: found._id }, {
                    isDelete: req.body.isDelete
                }, function (err, doc) {
                    if (err) {
                        res.send({ returnId: -1, message: err, returnObject: {} })
                    }
                    res.send({ message: 'succes' })
                })
            }
        })
    },

    getAllEmployees: (req, res, next) => {

        const emp = req.params.employeeId
        var empAllArray = []
        empModal.find({}).then(data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].employeeId != emp) {
                    empAllArray.push(data[i])
                }
            }
            res.send({ success: true, message: "All employees", returnObj: empAllArray })
        }).catch(er => {
            res.send({ success: false, message: "error", returnObj: er })
        })
    },


    changePassword: (req, res, next) => {
        const employeeId = req.params.employeeId

        if (!employeeId) {
            return res.send({ success: false, message: 'you must provide employee id', returnObject: null })
        }
        empModal.findOne({
            employeeId: employeeId
        }, (err, found) => {
            if (err) {
                return res.send({ success: false, message: err.message, returnObject: null })
            }
            if (found) {

                if (found.password !== req.body.oldPass) {
                    return res.send({ success: false, message: "Incorrect old password", returnObject: null })
                }
                else {
                    empModal.findByIdAndUpdate({ _id: found._id }, {
                        password: req.body.newPass
                    }, function (err, doc) {
                        if (err) {
                            return res.send({ success: false, message: err.message, returnObject: null })
                        }
                        if (doc) {
                            return res.send({ success: true, message: 'Password Changed', returnObject: doc })
                        }
                    })
                }
            }
        })
    },


    addTeamMember: (req, res, next) => {
        var empId = req.params.employeeId
        var temMembersList = req.body.teamMembers
        if (!empId) {
            return res.send({ success: false, message: 'you must provide employee id', returnObject: null })
        }
        if (req.body.teamMembers[0] !== undefined) {
            empModal.findOne({
                employeeId: empId
            }, (err, found) => {
                if (err) {
                    return res.send({ success: false, message: err.message, returnObject: null })
                }
                if (found) {
                    if (found.teamMembers[0] !== undefined) {
                        found.teamMembers.map((m) => {
                            temMembersList.push(m)
                        })
                    }
                    empModal.findByIdAndUpdate({ _id: found._id }, { $set: { teamMembers: temMembersList, isTeam: true } }, function (err, doc) {
                        if (err) {
                            return res.send({ success: false, message: err.message, returnObject: null })
                        }
                        if (doc) {

                            empModal.findOneAndUpdate({ employeeId: temMembersList[0].employeeId }, { $set: { isMember: true } })
                                .then((respon) => {
                                    return res.send({ success: true, message: 'Team Added', returnObject: doc })
                                })
                                .catch((errorr) => {
                                    return res.send({ success: false, message: errorr.message, returnObject: null })
                                })



                        }
                    })
                }
            })
        }
        else {
            return res.send({ success: false, message: 'Provide employee details', returnObject: null })

        }





    },

    deleteMembers: (req, res, next) => {

        var empId = req.params.employeeId
        var deltedMember = req.params.deleteEmpId
        if (!empId) {
            return res.send({ success: false, message: 'you must provide employee id', returnObject: null })
        }
        empModal.findOne({
            employeeId: empId
        }, (err, found) => {
            if (err) {
                return res.send({ success: false, message: err.message, returnObject: null })
            }
            if (found) {
                var temp = []
                if (found.teamMembers[0] !== undefined) {
                    found.teamMembers.map((m) => {
                        if (m.employeeId !== deltedMember) {
                            temp.push(m)
                        }
                    })
                }
                var isTeamOrNot = temp[0] !== undefined ? true : false
                empModal.findByIdAndUpdate({ _id: found._id }, { $set: { teamMembers: temp, isTeam: isTeamOrNot, isMember: false } }, function (err, doc) {
                    if (err) {
                        return res.send({ success: false, message: err.message, returnObject: null })
                    }
                    if (doc) {
                        empModal.findOneAndUpdate({ employeeId: deltedMember }, { $set: { isMember: false } })
                            .then((respon) => {
                                return res.send({ success: true, message: 'Member deleted successfully ', returnObject: doc })
                            })
                            .catch((errorr) => {
                                return res.send({ success: false, message: errorr.message, returnObject: null })
                            })
                    }
                })
            }
        })



    },


    getUserTeamMembers: (req, res, next) => {
        var empId = req.params.employeeId
        empModal.findOne({
            employeeId: empId
        }, (err, found) => {
            if (err) {
                return res.send({ success: false, message: err.message, returnObject: null })
            }
            if (found) {
                if (found.teamMembers[0] !== undefined) {
                    return res.send({ success: true, message: 'Team list', returnObject: found.teamMembers })
                }
                else {
                    return res.send({ success: true, message: "No team", returnObject: null })
                }
            }
            if (!found) {
                return res.send({ success: false, message: 'User not found', returnObject: null })

            }

        })
    },



    getAllEmployeesForTeam: (req, res, next) => {

        const emp = req.params.employeeId
        var empAllArray = []
        empModal.find({}).then(data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].employeeId != emp && data[i].isMember === false) {
                    empAllArray.push(data[i])
                }
            }
            res.send({ success: true, message: "All employees", returnObj: empAllArray })
        }).catch(er => {
            res.send({ success: false, message: "error", returnObj: er })
        })
    },


}



// oldPass
// newPass
// error
// return res.status(400).send({success: false, msg: err});

// failed
//   return res.status(500).send({success: false, msg: err + ' Failed to update'})

// success
//   res.json({success: true, msg: 'Successfully updated'});