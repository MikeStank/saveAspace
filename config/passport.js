// load all the requirements
var LocalStrategy = require('passport-local').Strategy;

// load user model
var User = require('../app/models/user');

// show function to app using module.exports
module.exports = function(passport) {
    // passport session
    // needed for persistent login sessions - thid allows passport to serialize and unserialize users out of sessions

    // serialize user for session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // deserialize user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    // local signup
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses UN & PW, we're overriding with an email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // we can now passback the entire request to the call back
    },
    function(req, email, password, done) {
        // asynchronous
        // User.findOne will not fire unless data is sent back
        process.nextTick(function(){
            // search for an email that is the same as the one in the form to see if it's already 
            User.findOne({ 'local.email' : email }, function(err, user) {
                // if any errors, return it
                if (err)
                    return done(err);

                if (user) {
                    return done(nul, false, req.flash('signupMessage', 'Email is already registered'));
                } else {
                    // if that email has not been taken already
                    var newUser = new User();
                    // set users local credentials
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);
                    // save user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};