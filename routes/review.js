const express = require('express');
const router=express.Router({mergeParams:true});



const Listing = require('../models/listing');

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

const Review = require('../models/review.js');
const {validateReview, isLoggedin,isreviewAuthor}=require('../middleware.js');
const reviewController=require('../controllers/reviews.js');

















// Reviews
//post request
router.post("/",validateReview,isLoggedin,
     wrapAsync(reviewController.createReview));


//review delete request

router.delete("/:reviewId",
    isreviewAuthor,
     wrapAsync(reviewController.destroyReview));



module.exports=router;