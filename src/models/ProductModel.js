const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{
        type:String
    },
    
    description:{
        type:String
    },
    category:{
        type:String,
        
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:"categories"

    },  
    brand:{
        type:String

    },
    // rating:{
    //     type:Number

    // },

    businessId:{
        type:Schema.Types.ObjectId,
        ref:"services"

    },
    
    price:{
        type:Number,
    },

    productURL:{
        type:String

    }
    
   
})

module.exports = mongoose.model("products",productSchema)