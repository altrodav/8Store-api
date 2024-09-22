
const express = require("express");
const userData = require("../modules/userSchema");
const route = express.Router();

// The parent path of all is "*host-url*/api/userData/*next-routes*"

route.get("/getUserByNumber",async(req,res)=>{
    try{
        const mobileNumber = req.query.mobileNumber;
        const result = await userData.findOne({mobileNumber:mobileNumber});
        res.status(200).json({user:result,success:true});
    }catch(error){
        res.status(500).json({success:false});
    }
});

route.get('/getAllUser',async(req,res)=>{
    try{
        const result = await userData.find({});
        res.status(200).json({users:result});
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

route.post("/addUser",async(req,res)=>{
    try{
        const user = await userData.create({
            name : req.body.name,
            // photoUrl : req.body.photoUrl,
            mobileNumber : req.body.mobileNumber,
            address : req.body.address,
            nearByLocation : req.body.nearByLocation,
            city : req.body.city,
            pincode : req.body.pincode,
        });
       res.status(200).json({user:user,success:true});
    }catch(error){
        res.status(400).json({success:false,message: error.message});
    }
});

route.put("/updateUser",async(req,res)=>{

    const id = req.query.id;
    try{
       await userData.updateOne({_id:id},{
            name : req.body.name,
            mobileNumber : req.body.mobileNumber,
            address : req.body.address,
            nearByLocation : req.body.nearByLocation,
            city : req.body.city,
            pincode : req.body.pincode,
        });
        res.status(200).json({success:true});
    }catch(error){
        res.status(500).json({success:false,message:error.message});
    }
});

route.delete("/deleteUser",async(req,res)=>{
    try{
        const userId = req.query.userId;
        await userData.deleteOne({_id:userId});
        res.status(200).json({success:true});
    }catch(error){
        res.status(500).json({success:false,message:error.message});
    }
});

module.exports = route;
