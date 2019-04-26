const task = require("../models/task/taskSchema")


module.exports = {


    createTask: (req, res, next) => {

        const createdByID = req.body.createdByID
        const employeeId = req.body.employeeId

        if (!createdByID || !employeeId) {
            res.send({ success: false, message: "you must provide all values", returnObj: null })
        }

        else {

            task.create(req.body)
                .then((data) => {
                    if (data) {

                        var objId = data._id.toString()
                        var tranID = objId.slice(objId.length - 5)
                        task.findByIdAndUpdate({ _id: data._id }, { $set: { tranID: tranID } }, function (err, doc) {

                            if (err) {
                                res.send({ success: false, message: err, returnObject: null })
                            }
                            else {
                                var sendObj = data
                                res.send({ success: 1, message: 'successfully created', returnObject: sendObj })
                            }

                        })
                    }
                    else {
                        console.log('data nai hai')
                        res.send({ success: false, message: "can't create task", returnObj: null })
                    }
                })
        }
    },
    updateTask: (req, res, next) => {

        const requestData = req.body;

        requestData.status = req.body.progress == 100 ? "Completed" : req.body.progress < 100 ? "Pending" : "Created"



        // res.send({ success: false, message: "err", returnObject: requestData })

        task.findOne({ tranID: requestData.tranID }).then(taskData => {
            // requestData.createdDate = taskData.createdDate;
            requestData.lastUpdate = new Date()
            task.findByIdAndUpdate(taskData._id, { $set: requestData }, function (err, data) {
                // res.send({ success: false, message: err, returnObject: err })
                if (err) {
                    res.send({ success: false, message: err, returnObject: null })
                }
                else {
                    res.send({ success: true, message: 'successfully updated', returnObject: null })
                }

            })

        }).catch(err => {
            res.send({ success: true, message: 'error', returnObject: err })
        })






    },


    getAllTaskByEmpID: (req, res, next) => {

        const employeeId = req.params.employeeId

        task.find({ employeeId: employeeId }).then(data => {
            if (data.length == 0) {
                res.send({ success: true, message: "You have no daily updates", returnObj: data })
            } else {
                res.send({ success: true, message: "task list", returnObj: data })
            }
        }).catch(er => {
            res.send({ success: false, message: "error", returnObj: er })
        })

    },


    login: (req, res, next) => {

        const email = req.body.email
        const password = req.body.password

        auth.findOne({ email: email }, (err, found) => {

            if (err) {
                return next(err)
            }

            if (found && found.password === password && found.email === email) {

                return res.send(found)

            }

            res.send({ error: "Invalid Username, Email And Password" })

        })

    }

}


// error
// return res.status(400).send({success: false, msg: err});

// failed
//   return res.status(500).send({success: false, msg: err + ' Failed to update'})

// success
//   res.json({success: true, msg: 'Successfully updated'});