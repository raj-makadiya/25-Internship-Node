const ServiceProviderModel = require("../models/ServiceProviderModel");
const userModel = require("../models/ServiceProviderModel")
const bcrypt = require("bcrypt")

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

 module.exports={
    getAllService,addService,deleteService,getServiceById,signup,loginService
 }

