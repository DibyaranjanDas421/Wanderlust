const express = require('express');
const router=express.Router();


//index user
router.get("/",(req,res)=>{
    res.send("GET for user");
});

//shoe user

router.get("/:id",(req,res)=>{
    res.send("show user");
});
//create user
router.post("/:id",(req,res)=>{
    res.send("create user")
});
 
//delete te user

router.delete("/:id",(req,res)=>{
    res.send("DELEET for user");
});

module.exports=router;