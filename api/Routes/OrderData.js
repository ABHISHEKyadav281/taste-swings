const express=require('express');
const router=express.Router();
const order=require('../models/orders');

router.post('/orderData',async (req,res)=>{
    let data=req.body.order_data;
    await data.splice(0,0,{order_date:req.body.order_date});
    let emailId=await order.findOne({'email':req.body.email})
    console.log(emailId);
    if(emailId===null){
        try {
            await order.create({
                email:req.body.email,
                order_data:[data],
            }).then(()=>{
                res.json({success:true})
            })
        } catch (error) {
            console.log(error);
            res.send("server error",error.message);
        }
    }
    else{
        try {
            await order.findOneAndUpdate({email:req.body.email},
            {
                $push:{order_data:data}
            }).then(()=>{
                res.json({success:true})
            })
        } catch (error) {
            console.log(error);
            res.send("server error",error.message);
        }
    }
})



router.post('/myorder',async (req,res)=>{
    try {
        
        let myData=await order.findOne({'email':req.body.email})
        res.json({orderData:myData})

    } catch (error) {
        res.send("server error",error.message)
    }
})
module.exports=router;