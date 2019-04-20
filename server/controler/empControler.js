const empModal = require('../models/employee/empSchema')
module.exports = {


    createEmp: (req, res, next) => {

        const email = req.body.email
        // const password = req.body.password
        const name = req.body.name

        if (!email || !name) {
            res.send("you must provide email and name ")
        }

        empModal.findOne({
            email: email
        }, (err, found) => {
            if (err) {
                return next(err)
            }
            if (found) {
                return res.send({
                    error: "Email Is In Use Or employee already exist"
                })
            }
            empModal.create(req.body)
                .then((data) => {
                    if (data) {
                        console.log(data)
                        var objId = data._id.toString()
                        var customerid = objId.slice(objId.length - 5)
                        empModal.findByIdAndUpdate({ _id: data._id }, { $set: { employeeId: customerid } }, function (err, doc) {
                            if (err) {
                                res.send({ returnId: -1, message: err, returnObject: {} })
                            }
                        })
                        res.send({ returnId: 1, message: 'successfully created', returnObject: data })
                    }
                })
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
                    res.send({ returnId: 1, message: 'succes' })
                })
            }
        })
    },
}




// error
// return res.status(400).send({success: false, msg: err});

// failed
//   return res.status(500).send({success: false, msg: err + ' Failed to update'})

// success
//   res.json({success: true, msg: 'Successfully updated'});