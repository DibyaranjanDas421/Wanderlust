// const express = require('express');
// const wrapAsync = require('../utils/wrapAsync');
// const router=express.Router();
// const User=require('../models/User.js');
// const passport=require('passport');
// const saveRedirectUrl=require('../middleware.js');


// router.get('/signup',(req,res)=>{
//     res.render('users/signup.ejs');
// });

// router.post("/signup", wrapAsync(async(req,res)=>{
//     try{
//         let{username,email,password}=req.body;

//         const newUser=new User({
//             email,username
//         });
//         let regiisteredUser= await User.register(newUser,password);
//         console.log(regiisteredUser);
//         req.login(regiisteredUser,(err)=>{
//           if(err){
//             next(err);
//           }
//           req.flash("success","Welcome to Wanderlust");
//           res.redirect('/listings');
//         })
       
//     }catch(e){
//         req.flash("error",e.message);
//         res.redirect('/signup');
//     }
    


// }));


// //get login 
//   router.get('/login',(req,res)=>{
//     res.render('users/login.ejs');
//   });


//   //post login

//   router.post("/login",saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/login',failureFlash:true }),
//   async(req,res)=>{
//     req.flash("success","Welcome to wanderlust you are logged in!");
//     res.redirect('/listings');
//   });


//   router.get("/logout",(req,res,next)=>{
//     req.logOut((err)=>{
//       if(err){
//         return next(err);
//       }
//       req.flash("success","you are logged out !");
//       res.redirect("/listings");
//     })
//   })


// module.exports=router;
const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const router = express.Router();
const User = require('../models/User.js');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js'); // Destructure to get the correct middleware

router.get('/signup', (req, res) => {
    res.render('users/signup.ejs');
});

router.post("/signup", wrapAsync(async (req, res, next) => {
    try {
        let { username, email, password } = req.body;

        const newUser = new User({
            email, username
        });
        let registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust");
            res.redirect('/listings');
        });

    } catch (e) {
        req.flash("error", e.message);
        res.redirect('/signup');
    }
}));

//get login 
router.get('/login', (req, res) => {
    res.render('users/login.ejs');
});

//post login
router.post("/login", saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
    async (req, res) => {
        req.flash("success", "Welcome to wanderlust you are logged in!");
        let redirectUrl=res.locals.redirect || 'listings'
        res.redirect(redirectUrl);
    });

router.get("/logout", (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    });
});

module.exports = router;
