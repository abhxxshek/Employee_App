const mongoose=require('mongoose');
const empSchema=mongoose.Schema({
    name:String,
    designation:String,
    salary:Number,
    department:String,
    location:String
},{versionKey:false})

const empData=mongoose.model('employee',empSchema);
module.exports=empData