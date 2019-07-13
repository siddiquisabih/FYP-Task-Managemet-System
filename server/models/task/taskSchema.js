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
    employeeId: {
        type: String
    },
    taskTitle: {
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
    isClosed: {
        type: Boolean
    },
    GUID: {
        type: String
    },
    moduleId: {
        type: String
    },
    tranType: {
        type: String
    },
    taskActivities: {
        type: String
    },
    taskAttachment: [attachmentSchema],
    isHold: {
        type: String
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    tranID: {
        type: String
    },
    progress: {
        type: Number
    },
    status: {
        type: String
    },
    priority: {
        type: Number
    },
    lastUpdate: {
        type: Date,
        default: Date.now
    }
})

const task = mongoose.model("task", head)

module.exports = task

// Task priority
// 1) high 
// 2) medium 
// 3) low 


// json

// var json={
// "Id":"",
// "EmployeeId":"",
// "TaskTitle":"",
// "Description":"",
// "CreatedBy":"",
// "CreatedDate":"",
// "IsActive":"",
// "IsDelete":"",
// "IsClosed":"",
// "GUID":"",
// "ModuleId":"",
// "TranType":"",
// "TaskActivities":"",
// "TaskAttachment":"",

// }



// const currency = new Schema({

//     // Id: 0,
//     // TaskId: 0,
//     // TaskStatusId: 2,
//     // TaskPriorityId: this.taskpriority,
//     // Progress: 0,
//     // AssignedTo: id,
//     // CreatedBy: this.userID,
//     // CreatedDate: "2018-01-27T00:00:00.000",
//     // IsActive: true,
//     // IsDelete: false,
//     // StartDate: this.startDate + this.startDay,
//     // EndDate: this.endDate + this.endDay,
//     // Comments: "",
//     // Hours: this.hours,
//     // IsForceFullyAdded: false,
//     // IsDelegated: this.delegatable,
//     // ConsumedHours: 0,
//     // FeedBack: this.comments,
//     // Raiting: this.rate,


//     Id: {},
//     TaskId: {},
//     TaskStatusId: {},
//     TaskPriorityId: {},
//     Progress: {},
//     AssignedTo: {},
//     CreatedBy: {},
//     CreatedDate: { type: Date,
//         default: Date.now},
//     IsActive: {type: Boolean},
//     IsDelete: {type: Boolean},
//     StartDate: {},
//     EndDate: {},
//     Comments: {},
//     Hours: {},
//     IsForceFullyAdded: {},
//     IsDelegated: {},
//     ConsumedHours: {},
//     FeedBack: {},
//     Raiting: {},







// })

// {"Id":"",
// "employeeId":"124",
// "taskTitle":"asd",
// "description":"asdasd",
// "createdByID":"132",
// "createdBy":"asd",
// "isActive":"true",
// "isDelete":"false",
// "isClosed":"false",
// "GUID":"",
// "moduleId":"",
// "tranType":"",
// "taskActivities":"",
// "taskAttachment":"",
// "isHold":"false",}