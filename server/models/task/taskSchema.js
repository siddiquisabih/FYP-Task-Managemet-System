const mongoose = require("mongoose")
const Schema = mongoose.Schema




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
    taskAttachment: {
        type: String
    },
    isHold: {
        type: String
    },
})

const task = mongoose.model("task", head)

module.exports = task



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