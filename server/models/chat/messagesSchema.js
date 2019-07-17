const mongoose = require("mongoose")
const Schema = mongoose.Schema



const members = new Schema({

    employeeId: {
        type: String
    },
    employeeName: {
        type: String
    },

})

const messageModal = new Schema({
    employeeId: {
        type: String
    },
    employeeName: {
        type: String
    },
    message: {
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now
    }

})


const messageHead = new Schema({


    chatMembers: [members],
    title: {
        type: String
    },
    description: {
        type: String
    },
    createdByID: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    isDelete: {
        type: Boolean
    },
    tranID: {
        type: String
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },

    message: [messageModal],


})

const messagesList = mongoose.model("messagesList", messageHead)
module.exports = messagesList








// var data = {
//     title: "",
//     description: "",
//     createdByID: "",
//     createdBy: "",
//     createdDate: "",
//     isDelete: false,
//     tranID: "",
//     chatMembers: [{
//         employeeId: "",
//         employeeName: "",
//     }],

//     message: {
//         employeeId:  "",
//         employeeName: "",
//         message:  "",
//     }
// }