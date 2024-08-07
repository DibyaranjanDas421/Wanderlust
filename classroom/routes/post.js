const express = require('express');
const router=express.Router();


//index post

router.get("/",(req,res)=>{
    res.send("GET for user");
});

//show posts

router.get("/:id",(req,res)=>{
    res.send("show user");
});
//create posts
router.post("/:id",(req,res)=>{
    res.send("create user")
});
 
//delete posts

router.delete("/:id",(req,res)=>{
    res.send("DELEET for user");
});

module.exports=router;