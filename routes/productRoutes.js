const express = require("express");
const productData = require("../modules/productSchema");
const route = express.Router();

// The parent path of all is "*host-url*/api/productData/*next-routes*"

route.get("/getProductById",async(req,res)=>{
    try{

        const Id = req.query.Id;

        const result = await productData.findOne({_id:Id});
        res.status(200).json({product:result,success:true});

    }
    catch(error){
        res.status(500).json({success:false});
    }
});

route.get('/getAllProduct',async(req,res)=>{
    try{ 
        const result = await productData.find({});

        res.status(200).json({product:result,success:true});
    }
    catch(error){
        res.status(500).json({message:error.message,success:false});
    }
});

route.post("/addProduct",async(req,res)=>{
    try{
        const product = await productData.create({
            title:req.body.title,
            category:req.body.category,
            subCategory:req.body.subCategory,
            assets:req.body.assets,
            colors:req.body.colors,
            sizes:req.body.sizes,
            price:req.body.price,
            description:req.body.description,
        });
       res.status(200).json({product:product,success:true});
    }
    catch(error){
        res.status(400).json({success:false,message:error.message});
    }
});

route.put("/updateProduct",async(req,res)=>{

    const id = req.query.id;
    try{
       await productData.updateOne({_id:id},{
            colors:req.body.colors,
            sizes:req.body.sizes,
            price:req.body.price,
        });
        res.status(200).json({success:true});
    }catch(error){
        res.status(500).json({success:false,message:error.message});
    }
});

route.delete("/deleteProduct",async(req,res)=>{
    try{
        const Id = req.query.Id;
        await productData.deleteOne({_id:Id});
        res.status(200).json({success:true});
    }catch(error){
        res.status(500).json({success:false,message:error.message});
    }
});

module.exports = route;
