// Homepage with the login links

module.exports = function(app, passport) {
    app.get('/', function(req, res){
        res.render('index.ejs');
    });

    // Login - shows the login form
    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // Signup
    app.get('/signup', function(req, res) {
        // below will render the page and pass any existing flash data
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // Process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to signup page
        failureFlash : true // allow flash messages
    }));

    // Profile 
    // will need to be logged in to visit this page - login required
    // utilize route middleware to verify via 'isLoggedIn' function
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user //get the user out of the session and into the template
        });
    });

    // Logout
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// routing middleware to ensure the user is logged in
function isLoggedIn(req, res, next) {
    // IF the user is authenticated in the session, we can proceed
    if (req.isAuthenticated())
        return next();
    
    // IF NOT, redirect to Homepage
    res.redirect('/');
}