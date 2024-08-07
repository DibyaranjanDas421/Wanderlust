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
    }
};
