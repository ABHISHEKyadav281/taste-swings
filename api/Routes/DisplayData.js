const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const food_items=require("../models/food_items");


router.get('/fooddata',async (req,res)=>{
    try{
        const data = await food_items.find();
        // const data =await mongoose.connection.db.collection("food_items").find().toArray();
        const data1 =await mongoose.connection.db.collection("food_category").find().toArray();
        // console.log("all set");
        // console.log(data);
        // console.log(data1);
        res.json({items:data,category:data1});
    }
    catch(error){
        console.log(error);
        res.send("server error");
    }
})
module.exports=router;