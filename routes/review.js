const express = require('express');
const router=express.Router({mergeParams:true});



const Listing = require('../models/listing');

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

const Review = require('../models/review.js');
const {validateReview, isLoggedin,isreviewAuthor}=require('../middleware.js');

















// Reviews
//post request
router.post("/",validateReview,isLoggedin,
     wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        throw new ExpressError(404, "Listing not found");
    }
    console.log(req.body.review);
    const newReview = new Review(req.body.review);
    newReview.author=req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    console.log("New review saved");
    req.flash("success","New review saved!");
    res.redirect(`/listings/${listing._id}`);
}));


//review delete request

router.delete("/:reviewId",
    isreviewAuthor,
     wrapAsync(async(req, res) => {
    let {id, reviewId} = req.params;

    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
}));



module.exports=router;