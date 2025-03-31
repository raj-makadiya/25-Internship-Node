const ContactModel = require("../models/ContactModel")
const mailUtil= require("../utils/MailUtil")

const addContact= async (req,res) => {
  

  const savedContact= await ContactModel.create(req.body)
  await mailUtil.sendingMail(savedContact.email, "Thank You For Contact Us","For Any Query Please Contact On these Mail");

  res.json({
    message:"messge send successfully",
    data:savedContact
  })
}

const deleteContact= async (req,res) => {

   

const deletedContact= await ContactModel.findByIdAndDelete(req.params.id)

res.json({
  message:"message deleted..",
    data:deletedContact
})
  
}


const getContactById= async(req,res)=>{
  //req param.id

  const foundContact= await ContactModel.findById(req.params.id)

  res.json({
    message:"message fatched..",
    data:foundContact

  })
}

module.exports={
    addContact,deleteContact,getContactById
}




