const chat = require("../models/chat/chatSchema")
const message = require("../models/chat/messagesSchema")


module.exports = {


    createChat: (req, res, next) => {

        const chatMembers = req.body.chatMembers
        if (chatMembers[0] === undefined) {
            res.send({ success: false, message: "you must provide all values", returnObj: null })
        }
        else {
            chat.create(req.body)
                .then((data) => {
                    if (data) {
                        var objId = data._id.toString()
                        var tranID = objId.slice(objId.length - 5)
                        chat.findByIdAndUpdate({ _id: data._id }, { $set: { tranID: tranID } }, function (err, detail) {
                            if (err) {
                                res.send({ success: false, message: err, returnObject: null })
                            }
                            else {
                                var createMessage = {
                                    title: detail.title,
                                    description: detail.description,
                                    createdByID: detail.createdByID,
                                    createdBy: detail.createdBy,
                                    isDelete: false,
                                    tranID: tranID,
                                    chatMembers: detail.chatMembers,
                                    imageUrlCreatedBy: detail.imageUrlCreatedBy,
                                    message: {
                                        employeeId: detail.createdByID,
                                        employeeName: detail.createdBy,
                                        message: detail.message,
                                        imageUrl: detail.imageUrlCreatedBy
                                    }
                                }

                                console.log('to be creating ', createMessage)


                                message.create(createMessage)
                                    .then((respon) => {
                                        var sendObj = detail
                                        res.send({ success: true, message: 'successfully created Chat', returnObject: sendObj })
                                    })
                                    .catch((errors) => {
                                        res.send({ success: false, message: errors.message, returnObj: null })
                                    })
                            }
                        })
                    }
                    else {
                        res.send({ success: false, message: "can't create chat", returnObj: null })
                    }
                })
                .catch((err) => {
                    res.send({ success: false, message: err.message, returnObj: null })
                })
        }
    },


    getToYouChat: (req, res, next) => {

        const employeeId = req.params.employeeId
        chat.find({})
            .then((data) => {
                if (data) {
                    var temp = []
                    Promise.all(data.map((m) => {

                        if (m.chatMembers[0] !== undefined) {
                            m.chatMembers.map((list) => {
                                if (list.employeeId === employeeId) {
                                    temp.push(m)
                                }
                            })
                        }
                    }))
                        .then(() => {
                            if (temp[0] !== undefined) {
                                res.send({ success: true, message: "You have chats", returnObj: temp })
                            }
                            else {
                                res.send({ success: true, message: "You have no chats", returnObj: [] })
                            }
                        })
                }
                else {
                    res.send({ success: true, message: "You have no chats", returnObj: null })
                }
            })
            .catch((err) => {
                res.send({ success: false, message: err.message, returnObj: null })

            })
    },


    getByYouChat: (req, res, next) => {

        const createdId = req.params.createdId

        chat.find({ createdByID: createdId }).then(data => {
            if (data.length == 0) {
                res.send({ success: true, message: "You have no chats", returnObj: data })
            } else {
                res.send({ success: true, message: "Chat list", returnObj: data })
            }
        }).catch(er => {
            res.send({ success: false, message: "error", returnObj: er })
        })
    },



    sendMessage: (req, res, next) => {
        const tranId = req.params.tranId
        message.find({ tranID: tranId })
            .then((response) => {

                if (req.body) {

                    var data = req.body

                    response[0].message.push(data)
                    response[0].lastUpdated = new Date()
                    message.findOneAndUpdate({ tranID: tranId }, { $set: response[0] })
                        .then((resp) => {
                            res.send({ success: true, message: 'Message sent successfully', returnObj: response })
                        })
                        .catch((errors) => {
                            res.send({ success: false, message: errors.message, returnObj: [] })
                        })
                }

            })
            .catch((err) => {

                res.send({ success: false, message: "Can't find chat", returnObj: [] })
            })
    },


    getChatByTranId: (req, res, next) => {
        const tranId = req.params.tranId


        message.findOne({ tranID: tranId })
            .then((response) => {
                res.send({ success: true, message: "found Chat", returnObj: response })

            })
            .catch((err) => {

                res.send({ success: false, message: err.message, returnObj: [] })
            })

    }


    // updateTask: (req, res, next) => {

    //     const requestData = req.body;

    //     requestData.status = req.body.progress == 100 ? "Completed" : req.body.progress < 100 ? "Pending" : "Created"



    //     // res.send({ success: false, message: "err", returnObject: requestData })

    //     task.findOne({ tranID: requestData.tranID }).then(taskData => {
    //         // requestData.createdDate = taskData.createdDate;
    //         requestData.lastUpdate = new Date()
    //         task.findByIdAndUpdate(taskData._id, { $set: requestData }, function (err, data) {
    //             // res.send({ success: false, message: err, returnObject: err })
    //             if (err) {
    //                 res.send({ success: false, message: err, returnObject: null })
    //             }
    //             else {
    //                 res.send({ success: true, message: 'successfully updated', returnObject: null })
    //             }

    //         })

    //     }).catch(err => {
    //         res.send({ success: true, message: 'error', returnObject: err })
    //     })






    // },


    // getAllTaskByEmpID: (req, res, next) => {

    //     const employeeId = req.params.employeeId

    //     task.find({ employeeId: employeeId }).then(data => {
    //         if (data.length == 0) {
    //             res.send({ success: true, message: "You have no daily updates", returnObj: data })
    //         } else {
    //             res.send({ success: true, message: "task list", returnObj: data })
    //         }
    //     }).catch(er => {
    //         res.send({ success: false, message: "error", returnObj: er })
    //     })

    // },



    // getAllTaskByYou: (req, res, next) => {

    //     const employeeId = req.params.employeeId

    //     task.find({ createdByID: employeeId }).then(data => {
    //         if (data.length == 0) {
    //             res.send({ success: true, message: "You have no daily updates", returnObj: data })
    //         } else {
    //             res.send({ success: true, message: "task list", returnObj: data })
    //         }
    //     }).catch(er => {
    //         res.send({ success: false, message: "error", returnObj: er })
    //     })

    // },



}


// error
// return res.status(400).send({success: false, msg: err});

// failed
//   return res.status(500).send({success: false, msg: err + ' Failed to update'})

// success
//   res.json({success: true, msg: 'Successfully updated'});