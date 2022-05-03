const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:"Active"
    },
    addedOn:{
        type:Date,
        default:new Date()
    }
})


module.exports=mongoose.model('user',UserSchema)