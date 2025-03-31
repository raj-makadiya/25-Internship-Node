const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const complaintsSchema = new Schema({
    
    description:{
        type:String
    },
    status:{
        enum: ['Open', 'Resolved', 'Escalated'],
        type: String,
        required: true
        
    },

    productId:{
          type:Schema.Types.ObjectId,//jbaskjhad
        ref:"products"

    },
    userId:{
          type:Schema.Types.ObjectId,//jbaskjhad
        ref:"users"

    },
    fileddate:{
        type:Date,
    },

    categoryType: {
    enum: [
      
      'Electronics',
      'Clothing & Apparel',
      'Footwear',
      'Beauty & Personal Care',
      'Home & Kitchen',
      'Grocery & Food',
      'Automobiles & Accessories',
      'Books & Stationery',
      'Sports & Fitness',
      'Toys & Baby Products',
      'Healthcare & Medicine',
      'Services'
    ],
    type:String
    
  },
    
    
   
})

module.exports = mongoose.model("complaints",complaintsSchema)