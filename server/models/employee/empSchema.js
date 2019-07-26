const mongoose = require("mongoose")
const Schema = mongoose.Schema



const members = new Schema({

    employeeId: {
        type: String
    },
    employeeName: {
        type: String
    },
    imageUrl: {
        type: String
    }


})

const empHead = new Schema({

    id: {
        type: String
    },
    employeeId: {
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
        type: String,
    },
    joinedDate: {
        type: String,
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
    name: {
        type: String
    },
    password: {
        type: String
    },
    // addition
    fullName: {
        type: String
    },
    designation: {
        type: String
    },
    isAdmin: {
        type: Boolean
    },
    lastName: {
        type: String
    },
    isTeam: {
        type: Boolean
    },
    teamMembers: [members],
})

const employee = mongoose.model("employee", empHead)
module.exports = employee








// var json = {
//     "id": "",
//     "employeeId": "",
//     "createdBy": "",
//     "createdDate": "",
//     "isActive": "",
//     "isDelete": "",
//     "isBlocked": "",
//     "GUID": "",
//     "moduleId": "",
//     "imageUrl": "",
//     "email": "",
//     "salary": "",
//     "status": "",
//     "dateOfBirth": "",
//     "joinedDate": "",
//     "nationality": "",
//     "mobileNo": "",
//     "address": "",
//     "bloodGroup": "",
//     "region": "",
//     "password": "123456",
//     "name":"sabih"
// }


// var asd = {

//     createdByID: "",
//     createdBy: "",
//     imageUrl: "",
//     email: "",
//     salary: "",
//     dateOfBirth: "",
//     joinedDate: "",
//     name: "",
//     password: "",
//     fullName: "",
//     designation: "",
//     isAdmin: "",
//     mobileNo: "",
//     address: "",
//     lastName :"",
// }

// employeeId: :"",
// employeeName: :"",
// imageUrl: :"" 