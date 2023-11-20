const User = require('../models/user.model')
const Post = require('../models/post.model')
const Comment = require('../models/comment.model')
const Feedback = require('../models/feedback.model');
const Formation =  require('../models/formation.model');
const TeamUserRel = require('../models/team-user-relation.model');
const promisify = require('es6-promisify');

// Get Teams List Page

exports.teamListGen = async (req, res) => {

    res.render('teams.hbs', {
        csrfToken:`${req.csrfToken()}`
    });
    
}

// Get Delete Account Page

exports.getDeletePage = async (req, res) => {

    res.render('account/delete.hbs', {
        csrfToken:`${req.csrfToken()}`
    });

}

// Get Root Landing Page

exports.getLandingPage = async (req, res) => {

    res.redirect('/login');

}

// Get Signup Page

exports.getRegisterPage = (req, res) => {

    res.render('signup.hbs', { 
        csrfToken:`${req.csrfToken()}`
    });

}

// Get Forgot Password Page

exports.getForgotPage = (req, res) => {

    res.render('forgot.hbs', { 
        csrfToken:`${req.csrfToken()}`
    });
}

// Update User

exports.updateUser = async (req, res) => {

    const user = await User.findOneAndUpdate({
        _id: req.body.id,
    }, req.body,
    { 
        new: true, 
        runValidatos: true 
    })
    .exec();

    res.redirect('/teams');

}

// Check if User Exists

exports.checkUserExists = async (req, res, next) => {

    const user = await User.find({ 
        email: req.body.email 
    });

    if (user.length) {
        errors = []; 
        errors.push({
            msg:"User already found in database!"
        });

        res.render('signup.hbs', { 
            body: req.body, 
            errs:errors,  
            csrfToken:`${req.csrfToken()}` 
        });

        return;
    }

    next();

};

// Delete User

exports.deleteUser = async (req, res, next) => {

    Comment.remove({
        author: req.body.id
    }, err => res.end());

    Feedback.remove({
        author: req.body.id
    }, err => res.end());

    Formation.remove({
        author: req.body.id
    }, err => res.end());

    Post.remove({
        author: req.body.id
    }, err => res.end());

    TeamUserRel.remove({
        player: req.body.id
    }, err => res.end());

    User.remove({
        _id: req.body.id
    }, err => res.end());

    res.redirect('/logout');

    next();
}; 

// Create User

exports.registerUser = async (req, res, next) => {

    const user = new User({ 
        email: req.body.email, 
        name: req.body.name, 
        phoneNumber: req.body.phoneNumber,
        dateOfBirth: req.body.dateOfBirth,
        proType: req.body.proType,
        col1: req.body.col1,
        col2: req.body.col2,
        userType: req.body.userType,
        age: calcAge(req.body.dateOfBirth)
    });

    const registerWithPromise = promisify(User.register, User);

    await registerWithPromise(user, req.body.password);

    next();

}

// Calculate User Age

function calcAge(dateString) {

    var birthday = +new Date(dateString);

    return ~~((Date.now() - birthday) / (31557600000));

}

// Check if User is Manager

exports.isManager = (req, res, next) => {

    if(req.user.userType == true){
        next();
    } 
    else {
        res.render("prohibited.hbs"); 
    }
    
}
