const express = require('express');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const path = require('path');
const session = require('express-session');
const methodOverride = require('method-override');
const flash = require('connect-flash');

const ExpressError = require("./utils/ExpressError.js");


const listings=require('./routes/listing.js');
const reviews=require('./routes/review.js');

const app = express();
const port = 8080;
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// Set up EJS as the view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
async function connectToDB() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connection to MongoDB successful");
    } catch (error) {
        console.error("Connection to MongoDB failed:", error);
        process.exit(1); // Exit the process if MongoDB connection fails
    }
}

// Call the function to connect to MongoDB
connectToDB();


const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Correct spelling for expires
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
        httpOnly: true,
    
    }
};




// Define routes
app.get("/", (req, res) => {
    res.send("I am root");
});

app.use(session(sessionOptions));
app.use(flash());
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
})


//use
app.use('/listings',listings);

app.use('/listings/:id/reviews',reviews);









// Handle favicon requests
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Catch-all for undefined routes
app.all("*", (req, res, next) => {
    next(new ExpressError(400, "Page not found"));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Error handling middleware:", err);
    const { statusCode = 500, message = "Some error occurred" } = err;
    res.status(statusCode).render("error", { message });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
