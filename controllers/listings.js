const Listing = require('../models/listing');


module.exports.index= async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
};

module.exports.rendernewForm= (req, res) => {
    res.render("listings/new")};

module.exports.createListinng=async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New listing created!");
    res.redirect("/listings");
};

module.exports.showListing=async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: 'reviews',
            populate: {
                path: 'author',
                options: { strictPopulate: false }
            }
        })
        .populate('owner');
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect('/listings');
    }
    res.render("listings/show", { listing });
};


module.exports.renderEditForm=async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect('/listings');
    }
    res.render("listings/edit", { listing });
};


module.exports.updateListing=async (req, res) => {
    const { id } = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, { new: true });
    if (!updatedListing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect('/listings');
    }
    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing=async (req, res) => {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
        throw new ExpressError(404, "Listing not found");
    }
    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
};