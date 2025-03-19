const express = require("express");

const userModel=require("../models/UserModel")
const bcrypt=require("bcrypt")
const mailUtil=require("../utils/MailUtil")

const loginUser=async(req,res)=>{
  const email=req.body.email;
  const password=req.body.password;

  const foundUserFromEmail= await userModel.findOne({email:email}).populate("roleId");
  console.log(foundUserFromEmail);

  if(foundUserFromEmail!=null){
    const isMatch=bcrypt.compareSync(password,foundUserFromEmail.password);

    if (isMatch==true){
      res.status(200).json({
        message:"Login Successfully",
        data:foundUserFromEmail
      });

    }

    else{
      res.status(404).json({
        message:"invalid cred..",
      });
    }
    

  }
  else{
    res.status(404).json({
      message:"Email Not Found"
    })
  }

};

const signUp = async (req, res) => {
  
  try {
   
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password=hashedPassword
    const createdUser = await userModel.create(req.body);

    await mailUtil.sendingMail(createdUser.email,"welcome to BuyerTalk","this is welcome mail")
    
    res.status(201).json({
      message: "user created..",
      data: createdUser,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "error",
      data: err,
    });
  }
};

const getAllUsers = async (req,res)=>{

    const users= await userModel.find().populate("roleId")

    res.json({
        message: "user fetched successfully",
    data:users

    });

}
const addUser= async (req,res) => {
  

  const savedUser= await userModel.create(req.body)

  res.json({
    message:"user created",
    data:savedUser
  })

  
}
const addUser1= async (req,res) => {
  

 try{
   const createdUser= await userModel.create(req.body)
   res.status(201).json({
    message:"user created..",
    data:createdUser
   })


 }catch(err){
  res.status(201).json({
    message:"Error",
    data:err
  })
 }

  
}


const deleteUser= async (req,res) => {

   

const deletedUser= await userModel.findByIdAndDelete(req.params.id)

res.json({
  message:"role deleted..",
    data:deletedUser
})
  
}

const getUserById= async(req,res)=>{
  //req param.id

  const foundUser= await userModel.findById(req.params.id)

  res.json({
    message:"role fatched..",
    data:foundUser

  })
}
module.exports = {
    getAllUsers,addUser,deleteUser,getUserById,addUser1,loginUser,signUp
}