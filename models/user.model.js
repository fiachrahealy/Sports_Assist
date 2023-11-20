const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Invalid Email Address']
    },
    phoneNumber: {
        type: String
    }, 
    imgURL:{ 
        type: String
    }, 
    dateOfBirth: {
        type: String
    }, 
    age: {
        type: String
    },
    userType: {
        type: Boolean
    },
    name: {
        type: String
    },
    salt: {
    type: String
    },
    hash: {
        type: String
    },
    col1: {
        type: String
    }, 
    col2: {
        type: String 
    },
    proType: {
        type: String 
    }, 
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
});

userSchema.plugin(passportLocalMongoose, { 
    usernameField: 'email' 
});

module.exports = mongoose.model('User', userSchema);
