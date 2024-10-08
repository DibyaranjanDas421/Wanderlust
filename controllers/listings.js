const Listing = require('../models/listing');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


module.exports.index= async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
};

module.exports.rendernewForm= (req, res) => {
    res.render("listings/new")};

module.exports.createListinng=async (req, res) => {

   let response= await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
        .send()

     
        
        const geometry = response.body.features[0].geometry; // { type: 'Point', coordinates: [longitude, latitude] }

        // Create the new listing
        let url = req.file.path;
        let filename = req.file.filename;
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = { url, filename };
        newListing.geometry = geometry;
     let savedListing= await newListing.save();
     console.log(savedListing);
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


// module.exports.renderEditForm=async (req, res) => {
//     const { id } = req.params;
//     const listing = await Listing.findById(id);
     

//     if (!listing) {
//         req.flash("error", "Listing you requested for does not exist!");
//         return res.redirect('/listings');
//     }
//     let originalImageurl= listing.image.url;
//     originalImageurl.replace('/upload','/upload/h_250,w_250');


//     res.render("listings/edit", { listing ,originalImageurl});
// };
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect('/listings');
    }

    // Modify the URL to include the desired transformations
    let originalImageurl = listing.image.url;
    const transformationString = 'h_250,w_250,c_fill,e_blur:50'; // Ensuring the image is cropped and resized

    // Inserting the transformation string in the correct position in the URL
    originalImageurl = originalImageurl.replace('/upload/', `/upload/${transformationString}/`);

    res.render("listings/edit", { listing, originalImageurl });
};



module.exports.updateListing=async (req, res) => {
    const { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, req.body.listing, { new: true });

    if(  typeof req.file !='undefined'){

    let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
}



    if (!listing) {
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