const Listing = require('./models/listing');
const ExpressError = require("./utils/ExpressError");
const { listingSchema, reviewSchema } = require('./schema');


module.exports = {
    isLoggedin: (req, res, next) => {
        if (!req.isAuthenticated()) {
            req.session.redirectUrl = req.originalUrl;
            req.flash("error", "You must be logged in!");
            res.redirect('/login');
        } else {
            next();
        }
    },
    saveRedirectUrl: (req, res, next) => {
        if (req.session.redirectUrl) {
            res.locals.redirect = req.session.redirectUrl;
        }
        next();
    },
    isOwner: async (req, res, next) => {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            req.flash("error", "Listing not found");
            return res.redirect('/listings');
        }
        if (!req.user || !listing.owner.equals(req.user._id)) {
            req.flash("error", "You are not authorized to edit this listing");
            return res.redirect(`/listings/${id}`);
        }
        next();
    },
     validateListing: (req, res, next) => {
        const { error } = listingSchema.validate(req.body);
        if (error) {
            const errMsg = error.details.map(el => el.message).join(",");
            throw new ExpressError(404, errMsg);
        } else {
            next();
        }
    },
    
  validateReview:(req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(404, errMsg);
    } else {
        next();
    }
}
};
