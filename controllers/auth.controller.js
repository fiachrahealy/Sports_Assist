const passport = require('passport');

// Get Login Page

exports.getLoginPage = (req, res) => {

    res.render('login.hbs', {
        csrfToken:`${req.csrfToken()}`
    });
    
};

// Login

exports.login = passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Email/Password Invalid!',
    successRedirect: '/teams',
});

// Logout

exports.logout = (req, res, next) => {

    req.logout(function(err) {
        if (err) { 
            return next(err); 
        }
        res.redirect('/');
    });
};

// Check If Logged In

exports.isLoggedIn = (req, res, next) => {

    if (req.isAuthenticated()) {
        next();
        return;
    }
  
    res.redirect('/login');

};

// Check If Logged Out

exports.isNotLoggedIn = (req, res, next) => {

    if (!req.isAuthenticated()) {
        next();
        return;
    }

    res.redirect('/teams');
};

