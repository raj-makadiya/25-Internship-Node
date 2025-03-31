const ServiceProviderModel = require("../models/ServiceProviderModel");
const userModel = require("../models/ServiceProviderModel")
const bcrypt = require("bcrypt")
const mailUtil=require("../utils/MailUtil")
const jwt = require("jsonwebtoken");
const secret = "secret";

const loginService = async (req,res)=>{
   // req.body email and password : password

   const email= req.body.email;
   const password = req.body.password;

   // normal password compare 

   //const foundUserFromEmail = userModel.findOne({email:req.body.email})
   const foundServiceFromEmail =  await ServiceProviderModel.findOne({email:email}).populate("roleId");
   console.log(foundServiceFromEmail);

   if(foundServiceFromEmail!= null){
      const isMatch = bcrypt.compareSync(password,foundServiceFromEmail.password)

      if(isMatch == true){
         res.status(200).json({
            message:"login successfully",
            data:foundServiceFromEmail,
         })
      } else{
         res.status(404).json({
            message:"Invalid credentials...",
         })
      }
   } else{
      res.status(404).json({
         message:"Email not found..."
      })
   }
}

const signup = async (req,res)=>{

   try {

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password,salt);
      req.body.password = hashedPassword;
      const createdUser = await ServiceProviderModel.create(req.body);
      await mailUtil.sendingMail(createdUser.email,"welcome to BuyerTalk","this is welcome mail")
      res.status(201).json({
         message:"service created...",
         data:createdUser
      })

      
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message:"error",
         data:err
      })
      
   }

}

const getAllService = async (req,res)=>{
    const services = await ServiceProviderModel.find().populate("roleId");

    res.json({
        message:"service fetched successfully",
        data:services

    })
 }

 

 const addService = async (req,res)=>{
   try {
      const createdService = await ServiceProviderModel.create(req.body)
      res.status(201).json({
         message:"service created..",
         data:createdService
      })
      
   } catch (err) {
      res.status(500).json({
         message:"error",
         data:err
      })
      
    
      
   }
 }

 const deleteService = async(req,res)=>{
    const deletedService = await ServiceProviderModel.findByIdAndDelete(req.params.id)
    res.json({
        message:"user deleted ....",
        data:deletedService
    })
 }

 const getServiceById = async (req,res)=>{
    const specificService = await ServiceProviderModel.findById(req.params.id)
    res.json({
        message:"service found successfully",
        data:specificService
    })
 }
 const forgotPassword = async (req, res) => {
   const email = req.body.email;
   const foundService = await ServiceProviderModel.findOne({ email: email });
 
   if (foundService !=null) {
     const token = jwt.sign(foundService.toObject(), secret);
     console.log(token);
     const url = `http://localhost:5173/serviceResetPassword/${token}`;
     const mailContent =  `<html>
                           <a href="${url}">reset password</a>
                           </html>`;
     
     await mailUtil.sendingMail(foundService.email, "reset password", mailContent);
     res.status(200).json({
       message: "reset password link sent to mail.",
     });
   } else {
     res.status(404).json({
       message: "user not found register first..",
     });
   }
 };
 
 const resetPassword = async (req, res) => {
   const token = req.body.token;
   const newPassword = req.body.password;
 
   if (!newPassword) {
     return res.status(400).json({ message: "New password is required" });
   }
 
   try {
     const serviceFromToken = jwt.verify(token, secret);
 
     const salt = bcrypt.genSaltSync(10); // Generate a proper salt
     const hashedPassword = bcrypt.hashSync(newPassword, salt); // Hash the password with salt
 
     await ServiceProviderModel.findByIdAndUpdate(serviceFromToken._id, {
       password: hashedPassword,
     });
 
     res.json({
       message: "Password updated successfully.",
     });
   } catch (error) {
     res.status(500).json({
       message: "Error updating password.",
       error: error.message,
     });
   }
 };
 

 module.exports={
    getAllService,addService,deleteService,getServiceById,signup,loginService,forgotPassword,resetPassword
 }

