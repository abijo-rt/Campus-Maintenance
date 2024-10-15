const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseSequence = require('mongoose-sequence')(mongoose);

const worklogSchema = new Schema({
    date: String,
    location: String,
    category: String,
    taskid: {type:Number,index:true},
    workerCount: Number,
    remarks:String,
    workerDetails: [String],
    status: { type: Boolean, default: false },

});

const locationwork=new Schema({
    location:String,
    pending:Number,
    completed:Number,
});

const typework=new Schema({
    type:String,
    pending:Number,
    completed:Number
});

const workinfotype=new Schema({
date:String,
type:[typework]
})

const workinfo=new Schema({
date:String,
location:[locationwork]
});


const worker = new Schema({
    name: String,
    skill: [String],
    phone: Number,
    gender: String,
    staffid: { type: Number, index: true },
    status: { type: Boolean, default: true },

});

const incharge=new Schema(
    {
        name:String,
        email:String,
        password:String,
        worktype:String,
        phoneno:Number,
        role:{
            type:String,
            enum:['admin','incharge'],
            required:true
        }
    }
)


worker.plugin(mongooseSequence, { id: "staffid_counter", inc_field: "staffid", start_seq: 100 });
worklogSchema.plugin(mongooseSequence, { id: "taskid_counter", inc_field: "taskid", start_seq: 100 });



const dataSchema = new Schema({
    id: String,
    arrname: [String],

});

const carddata=new Schema({
    date:String,
    totalwork:Number,
    completed:Number,
    pending:Number
})




const OData = mongoose.model('optiondata', dataSchema);
const Incharge=mongoose.model('incharge',incharge)
const Worklog = mongoose.model('work_log', worklogSchema);
const Workinfo = mongoose.model('work_info', workinfo);
const WorkerDetails = mongoose.model('staff', worker);
const Workinfotype =mongoose.model('work_info_type',workinfotype)
const Carddata=mongoose.model('carddata',carddata)
module.exports = {
    CardData:Carddata,
    WorkerDetails: WorkerDetails,
    OData: OData,
    Worklog: Worklog,
    Workinfo:Workinfo,
    Incharge:Incharge,
    Workinfotype:Workinfotype
};
