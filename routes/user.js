const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const router=express.Router();
const User=require('../models/User.js');
const passport=require('passport');


router.get('/signup',(req,res)=>{
    res.render('users/signup.ejs');
});

router.post("/signup", wrapAsync(async(req,res)=>{
    try{
        let{username,email,password}=req.body;

        const newUser=new User({
            email,username
        });
        let regiisteredUser= await User.register(newUser,password);
        console.log(regiisteredUser);
        req.flash("success","Welcome to Wanderlust");
        res.redirect('/listings');
    }catch(e){
        req.flash("error",e.message);
        res.redirect('/signup');
    }
    


}));


//get login 
  router.get('/login',(req,res)=>{
    res.render('users/login.ejs');
  });


  //post login

  router.post("/login",  passport.authenticate('local', { failureRedirect: '/login',failureFlash:true }),
  async(req,res)=>{
    req.flash("success","Welcome to wanderlust you are logged in!");
    res.redirect('/listings');
  })


module.exports=router;