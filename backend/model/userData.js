const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:String,
},{versionKey:false})

const userData=mongoose.model('user',userSchema);
module.exports=userData