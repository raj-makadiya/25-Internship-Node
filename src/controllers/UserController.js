const express = require("express");

const userModel=require("../models/UserModel")
const bcrypt = require("bcrypt")
const mailUtil=require("../utils/MailUtil")
const jwt = require("jsonwebtoken");
const secret = "secret";

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

const forgotPassword = async (req, res) => {
  const email = req.body.email;
  const foundUser = await userModel.findOne({ email: email });

  if (foundUser !=null) {
    const token = jwt.sign(foundUser.toObject(), secret);
    console.log(token);
    const url = `http://localhost:5173/resetPassword/${token}`;
    const mailContent =  `<html>
                          <a href="${url}">reset password</a>
                          </html>`;
    
    await mailUtil.sendingMail(foundUser.email, "reset password", mailContent);
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
    const userFromToken = jwt.verify(token, secret);

    const salt = bcrypt.genSaltSync(10); // Generate a proper salt
    const hashedPassword = bcrypt.hashSync(newPassword, salt); // Hash the password with salt

    await userModel.findByIdAndUpdate(userFromToken._id, {
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




module.exports = {
    getAllUsers,addUser,deleteUser,getUserById,addUser1,loginUser,signUp,forgotPassword,resetPassword
}