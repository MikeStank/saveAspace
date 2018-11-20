// this page will load all the things we need through MONGOOSE

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-node.js');

// below code defines the schema for our user model
var userSchema = mongoose.Schema({

    local : {
        email : String,
        passowrd : String,
    },
    facebook : {
        id : String,
        token : String,
        name : String,
        email : String
    },
    twitter : {
        id : String,
        token : String,
        displayName : String,
        username : String
    },
    google : {
        id : String,
        token : String,
        email : String,
        name : String 
    }
});

// Methods
// generating hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// check if pw is valid
userSchema.methods.validPassword = function(passowrd) {
    return bcrypt.compareSync(password, this.local.password);
};

// model for users shown to app
module.exports = mongoose.model('User', userSchema);