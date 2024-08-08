// // const express = require('express');
// // const router=express.Router();



// // const Listing = require('../models/listing');

// // const wrapAsync = require("../utils/wrapAsync.js");
// // const ExpressError = require("../utils/ExpressError.js");
// // const {listingSchema,reviewSchema} = require('../schema.js');



// // const validateListing = (req, res, next) => {
// //     const { error } = listingSchema.validate(req.body);
// //     if (error) {
// //         const errMsg = error.details.map(el => el.message).join(",");
// //         throw new ExpressError(404, errMsg);
// //     } else {
// //         next();
// //     }
// // };

// // //index
// // router.get("/", wrapAsync(async (req, res) => {
// //     const allListings = await Listing.find({});
// //     res.render("listings/index", { allListings });
// // }));

// // //new

// // router.get("/new", (req, res) => {
// //     res.render("listings/new");
// // });

// // // Create route
// // router.post("/", validateListing, wrapAsync(async (req, res) => {
// //     const newListing = new Listing(req.body.listing);
// //     await newListing.save();
// //     res.redirect("/listings");
// // }));

// // //show route

// // router.get("/:id", wrapAsync(async (req, res) => {
// //     const { id } = req.params;
// //     const listing = await Listing.findById(id).populate('reviews');
// //     if (!listing) {
// //         throw new ExpressError(404, "Listing not found");
// //     }
// //     res.render("listings/show", { listing });
// // }));




// // // Edit route
// // router.get("/:id/edit", wrapAsync(async (req, res) => {
// //     const { id } = req.params;
// //     const listing = await Listing.findById(id);
// //     if (!listing) {
// //         throw new ExpressError(404, "Listing not found");
// //     }
// //     res.render("listings/edit", { listing });
// // }));

// // // Update route
// // router.put("/:id", validateListing, wrapAsync(async (req, res) => {
// //     const { id } = req.params;
// //     const updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, { new: true });
// //     if (!updatedListing) {
// //         throw new ExpressError(404, "Listing not found");
// //     }
// //     res.redirect(`/listings/${id}`);
// // }));

// // // Delete route
// // router.delete("/:id", wrapAsync(async (req, res) => {
// //     const { id } = req.params;
// //     const deletedListing = await Listing.findByIdAndDelete(id);
// //     if (!deletedListing) {
// //         throw new ExpressError(404, "Listing not found");
// //     }
// //     res.redirect("/listings");
// // }));


// // module.exports=router;

// const express = require('express');
// const router = express.Router();

// const Listing = require('../models/listing');
// const wrapAsync = require("../utils/wrapAsync");
// const ExpressError = require("../utils/ExpressError");
// const { listingSchema, reviewSchema } = require('../schema');
// const isLoggedin=require('../middleware.js');

// const validateListing = (req, res, next) => {
//     const { error } = listingSchema.validate(req.body);
//     if (error) {
//         const errMsg = error.details.map(el => el.message).join(",");
//         throw new ExpressError(404, errMsg);
//     } else {
//         next();
//     }
// };

// //index
// router.get("/", wrapAsync(async (req, res) => {
//     const allListings = await Listing.find({});
//     res.render("listings/index", { allListings });
// }));

// //new
// router.get("/new",isLoggedin, (req, res) => {
//     res.render("listings/new");
// });

// // Create route
// router.post("/", validateListing, wrapAsync(async (req, res) => {
//     const newListing = new Listing(req.body.listing);
//     await newListing.save();
//     req.flash("success","New listing created!");
//     res.redirect("/listings");
// }));

// //show route
// router.get("/:id", wrapAsync(async (req, res) => {
//     const { id } = req.params;
//     const listing = await Listing.findById(id).populate('reviews');
    
//     if (!listing) {
//         req.flash("error","Listing you requested for dose not found!");
//         res.redirect('/listings');
//     }
//     res.render("listings/show", { listing });
// }));

// // Edit route
// router.get("/:id/edit",isLoggedin, wrapAsync(async (req, res) => {
//     const { id } = req.params;
//     const listing = await Listing.findById(id);
//     if (!listing) {
//         req.flash("error","Listing you requested for dose not found!");
//         res.redirect('/listings');
//     }
//     req.flash("success","Listing Edited!");
//     res.render("listings/edit", { listing });
// }));

// // Update route
// router.put("/:id",isLoggedin, validateListing, wrapAsync(async (req, res) => {
//     const { id } = req.params;
//     const updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, { new: true });
//     if (!updatedListing) {
//         throw new ExpressError(404, "Listing not found");
//     }
//     req.flash("success","Listing updated!");
//     res.redirect(`/listings/${id}`);
// }));

// // Delete route
// router.delete("/:id",isLoggedin, wrapAsync(async (req, res) => {
//     const { id } = req.params;
//     const deletedListing = await Listing.findByIdAndDelete(id);
//     if (!deletedListing) {
//         throw new ExpressError(404, "Listing not found");
//     }
//     req.flash("success","New listing Deleted!");
//     res.redirect("/listings");
// }));

// module.exports = router;
// const express = require('express');
// const router = express.Router();

// const Listing = require('../models/listing');
// const wrapAsync = require("../utils/wrapAsync");
// const ExpressError = require("../utils/ExpressError");
// const { listingSchema, reviewSchema } = require('../schema');
// const { isLoggedin,isOwner } = require('../middleware');  // Correct import

// const validateListing = (req, res, next) => {
//     const { error } = listingSchema.validate(req.body);
//     if (error) {
//         const errMsg = error.details.map(el => el.message).join(",");
//         throw new ExpressError(404, errMsg);
//     } else {
//         next();
//     }
// };

// //index
// router.get("/", wrapAsync(async (req, res) => {
//     const allListings = await Listing.find({});
//     res.render("listings/index", { allListings });
// }));

// //new
// router.get("/new", isLoggedin, (req, res) => {
//     res.render("listings/new");
// });

// // Create route
// router.post("/", validateListing, wrapAsync(async (req, res) => {
//     const newListing = new Listing(req.body.listing);
//     newListing.owner=req.user._id;
//     await newListing.save();
//     req.flash("success", "New listing created!");
//     res.redirect("/listings");
// }));

// //show route
// router.get("/:id", wrapAsync(async (req, res) => {
//     const { id } = req.params;
//     const listing = await Listing.findById(id).populate('reviews')
//     .populate('owner');
    
//     if (!listing) {
//         req.flash("error", "Listing you requested for does not exist!");
//         res.redirect('/listings');
//     }
//     res.render("listings/show", { listing });
// }));

// // Edit route
// router.get("/:id/edit",
//     isOwner,
//      isLoggedin,
//       wrapAsync(async (req, res) => {
//     const { id } = req.params;
//     const listing = await Listing.findById(id);
//     if (!listing) {
//         req.flash("error", "Listing you requested for does not exist!");
//         res.redirect('/listings');
//     }
//     res.render("listings/edit", { listing });
// }));


// // Update route
// router.put("/:id", isLoggedin,
//     isOwner,
//      validateListing, wrapAsync(async (req, res) => {
//      // Check if the current user is the owner of the listing
//     if (!listing.owner.equals(res.locals.currUser._id)) {
//         req.flash("error", "You are not authorized to edit this listing");
//         return res.redirect(`/listings/${id}`);
//     }

//     await Listing.findByIdAndUpdate(id, req.body.listing, { new: true });
//     req.flash("success", "Listing updated!");
//     res.redirect(`/listings/${id}`);
// }));


// // Delete route
// router.delete("/:id", isLoggedin,
//     isOwner,
//      wrapAsync(async (req, res) => {
//     const { id } = req.params;
//     const deletedListing = await Listing.findByIdAndDelete(id);
//     if (!deletedListing) {
//         throw new ExpressError(404, "Listing not found");
//     }
//     req.flash("success", "Listing deleted!");
//     res.redirect("/listings");
// }));

// module.exports = router;
const express = require('express');
const router = express.Router();



const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { listingSchema, reviewSchema } = require('../schema');
const { isLoggedin, isOwner,validateListing } = require('../middleware');  // Correct import
const listingController=require('../controllers/listings.js');





router.
route('/')
.get( wrapAsync(listingController.index))
.post(isLoggedin, validateListing, wrapAsync(listingController.createListinng));

// new
router.get("/new", isLoggedin,listingController.rendernewForm
);

router.
route('/:id')
.get( wrapAsync(listingController.showListing))
.put( isLoggedin, isOwner, validateListing, wrapAsync(listingController.updateListing))
.delete( isLoggedin, isOwner, wrapAsync(listingController.destroyListing))




// Edit route
router.get("/:id/edit", isLoggedin, isOwner, wrapAsync(listingController.renderEditForm));




module.exports = router;

