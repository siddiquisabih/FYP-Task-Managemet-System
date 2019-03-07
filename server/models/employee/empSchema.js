const mongoose = require("mongoose")
const Schema = mongoose.Schema





const empHead = new Schema({

    id: {
        type: String
    },
    employeeId: {
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
    moduleId: {
        type: String
    },
    imageUrl: {
        type: String
    },
    email: {
        type: String
    },
    salary: {
        type: String
    },
    status: { // single married
        type: String
    },
    dateOfBirth: {
        type: Date,
    },
    joinedDate: {
        type: Date,
    },
    nationality: {
        type: String,
    },
    mobileNo: {
        type: String,
    },
    address: {
        type: String,
    },
    bloodGroup: {
        type: String
    },
    region: {
        type: String
    },

})

const employee = mongoose.model("employee", empHead)
module.exports = employee








var json = {
    "id": "",
    "employeeId": "",
    "createdBy": "",
    "createdDate": "",
    "isActive": "",
    "isDelete": "",
    "isBlocked": "",
    "GUID": "",
    "moduleId": "",
    "imageUrl": "",
    "email": "",
    "salary": "",
    "status": "",
    "dateOfBirth": "",
    "joinedDate": "",
    "nationality": "",
    "mobileNo": "",
    "address": "",
    "bloodGroup": "",
    "region": "",
}