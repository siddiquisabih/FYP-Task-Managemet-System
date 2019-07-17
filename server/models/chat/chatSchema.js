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


const chatHead = new Schema({


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
    isActive: {
        type: Boolean
    },
    isDelete: {
        type: Boolean
    },
    isBlocked: {
        type: Boolean
    },
    GUID: {
        type: String
    },
    tranID: {
        type: String
    },
    message: {
        type: String
    }
})

const chatList = mongoose.model("chatList", chatHead)
module.exports = chatList








// var data = {

//     "title": "this is title",
//     "description": "this is description",
//     "createdByID": "95465",
//     "createdBy": "adminstartor",
//     "isActive": true,
//     "isDelete": false,
//     "isBlocked": false,
//     "GUID": "",
//     "message": "this is first message",
//     "chatMembers": [
//         {
//             "employeeId": "bb9a0",
//             "employeeName": "sabih"
//         }
//     ]
// }

