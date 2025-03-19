const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const serviceProviderSchema = new Schema({
    businessname:{
        type:String
    },
    ownername:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    contact_no:{
        type:Number,
    },
    servicetype:{
        type:String,
        
    },
    
    roleId:{
        type:Schema.Types.ObjectId,
        ref:"roles"
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    
    password:{
        type:String,

    },
    
   
})

module.exports = mongoose.model("services",serviceProviderSchema)
