const mongoose = require("mongoose")
const Schema=mongoose.Schema;

const userSchema= new Schema({
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },

    contact_no:{
        type:Number
    },

    roleId:{
        type:Schema.Types.ObjectId,//jbaskjhad
        ref:"roles"
    },
    password:{
        type:String
    },

    email:{
        type:String,
        unique:true
    },
    
})

module.exports= mongoose.model("users",userSchema)