const ComplaintsModel = require("../models/ComplaintsModel");


const bcrypt = require("bcrypt")
const mongoose = require("mongoose")




// const getAllComplaint = async (req,res)=>{
//     const complaints = await ComplaintsModel.find().populate("userId productId");

//     res.json({
//         message:"complaints fetched successfully",
//         data:complaints

//     })
//  }
const getAllComplaint = async (req, res) => {
   try {
     const complaints = await ComplaintsModel.find()
       .populate({
         path: "productId",
         select: "name brand price productURL",
       })
       .populate({
         path: "userId",
         select: "firstname lastname password email",
         populate: {
           path: "roleId",
           select: "name description",
         },
       })
       .exec();
 
     res.json({
       message: "Complaints fetched successfully",
       data: complaints,
     });
   } catch (error) {
     res.status(500).json({ message: "Error fetching complaints", error });
   }
 };
 

 const addComplaint = async (req,res)=>{
   try {
      const createdComplaint = await ComplaintsModel.create(req.body)
      res.status(201).json({
         message:"Complaint created..",
         data:createdComplaint
      })
      
   } catch (err) {
      res.status(500).json({
         message:"error",
         data:err
      })
      
    
      
   }
 }

 const deleteComplaint = async(req,res)=>{
    const deletedComplaint = await ComplaintsModel.findByIdAndDelete(req.params.id)
    res.json({
        message:"user deleted ....",
        data:deletedComplaint
    })
 }

 const getComplaintById = async (req,res)=>{
    const specificComplaint = await ComplaintsModel.findById(req.params.id)
    res.json({
        message:"service found successfully",
        data:specificComplaint
    })
 }

 const getAllComplaintsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("🔍 Received Request for userId:", userId);

    if (!userId || userId === "undefined") {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const complaints = await ComplaintsModel.find({ userId: new mongoose.Types.ObjectId(userId) })
      .populate("productId");

    if (!complaints.length) {
      return res.status(404).json({ message: "No complaints found" });
    }

    res.status(200).json({ message: "Complaints retrieved", data: complaints });
  } catch (err) {
    console.error("🔥 Error:", err);
    res.status(500).json({ message: err.message });
  }
};



 module.exports={
    getAllComplaint,addComplaint,deleteComplaint,getComplaintById,getAllComplaintsByUserId
 }

