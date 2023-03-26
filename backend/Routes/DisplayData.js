const express = require('express');
const router = express.Router();

router.post('/fooddata',(req,res)=>{
    try{
        res.send([global.food_items,global.food_category]);
    }
    catch(error){
        console.log(error);
        res.send("server error");
    }
})
module.exports=router;