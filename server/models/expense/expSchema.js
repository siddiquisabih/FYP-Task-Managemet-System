const mongoose = require("mongoose")
const Schema = mongoose.Schema



const attachmentSchema = new Schema({

    fieldname: {
        type: String
    },
    originalname: {
        type: String
    },
    encoding: {
        type: String
    },
    mimetype: {
        type: String
    },
    id: {
        type: String
    },
    filename: {
        type: String
    },
    metadata: {
        type: Number
    },
    bucketName: {
        type: String
    },
    chunkSize: {
        type: Number
    },
    size: {
        type: Number
    },
    md5: {
        type: String
    },
    uploadDate: {
        type: String
    },
    contentType: {
        type: String
    }

})



const head = new Schema({
    Id: {
        type: String
    },
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
    expenseDate: {
        type: String
    },
    expenseAttachment: [attachmentSchema],
    tranID: {
        type: String
    },
    status: {
        type: String
    },
})

const expense = mongoose.model("expense", head)

module.exports = expense

// var data = {

//     "title": "",
//     "description": "",
//     "createdByID": "",
//     "createdBy": "",
//     "expenseAttachment": "",
//     "expenseDate": "",
        // "status" : ""
// }