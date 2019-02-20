// const mongoose = require("mongoose")
// const Schema = mongoose.Schema





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






// const head = new Schema({

//     Id: {
//         type: String
//     },
//     EmployeeId: {
//         type: String
//     },
//     TaskTitle: {
//         type: String
//     },
//     Description: {
//         type: String
//     },
//     CreatedBy: {
//         type: String
//     },
//     CreatedDate: {
//         type: Date,
//         default: Date.now
//     },
//     IsActive: {
//         type: Boolean
//     },
//     IsDelete: {
//         type: Boolean
//     },
//     IsClosed: {
//         type: Boolean
//     },
//     GUID: {
//         type: String
//     },
//     ModuleId: {
//         type: String
//     },
//     TranType: {
//         type: String
//     },
//     TaskActivities: {
//         type: String
//     },
//     TaskAttachment: {
//         type: String
//     },
// })

// const task = mongoose.model("task", head)

// module.exports = task