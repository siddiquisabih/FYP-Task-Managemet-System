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
                console.log(body)
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
            res.send("you must provide employee id")
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
    }



}



// oldPass
// newPass
// error
// return res.status(400).send({success: false, msg: err});

// failed
//   return res.status(500).send({success: false, msg: err + ' Failed to update'})

// success
//   res.json({success: true, msg: 'Successfully updated'});