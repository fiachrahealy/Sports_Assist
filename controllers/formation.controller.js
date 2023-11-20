const Formation = require('../models/formation.model');
const Feedback = require('../models/feedback.model');

var date = new Date();

// Create Formation

exports.addFormation =  (req, res) => 
{

    let formation = new Formation(req.body);
    formation['date'] = date.toDateString();
    formation['author'] = req.user._id;
    formation['authorName'] = req.user.name;

    formation.save((err, f) => {
        if (err) {
            return next(err);
        }
 
        res.redirect(`/dashboard/formations/${f._id}`);
    });

}; 

// Add Comment to Formation

exports.addCommentFormation =  (req, res) => 
{

    let comment = new Feedback();
    comment['feedback'] = req.body.userFeedback;
    comment['formationID'] = req.params.id;
    comment['author'] = req.user._id;
    comment['authorName'] = req.user.name;
    comment['date'] = date.toDateString();
    comment.save(   (err, f) => {
        if (err) {
            return next(err);
        }

        res.redirect(`back`);
    });

};

// Delete Formation

exports.deleteFormation = (req, res) => {

    let obj = {_id: req.params._id};
    Formation.remove(obj, err => res.end());

};

// Save Formation

exports.saveFormation = (req, res) => {

    let generic;

    Formation.findOne(req.params).exec().then( minorGeneric => {

        if(!req.body.team_id) {
            generic = {dots: JSON.parse(req.body.dots)};
        }
        else {
            generic = {dots: JSON.parse(req.body.dots), team_id:req.body.team_id};
        }
        
        let currUser = req.user._id;
        let author =  minorGeneric.author; 

        if(currUser == author) {
            Formation.findOneAndUpdate(req.params, {$set: generic}, {new: true}, (err, doc) =>
            {
                if(err) {
                    throw err;
                }
            });
        }
    })
    .catch(err => {
        throw err;
    });
}

// Copy Formation

exports.copyFormation = (req, res) => {

    let formation = new Formation(req.body);

    formation['date'] = new Date();
    formation['author'] = req.user._id;
    formation['authorName'] = req.user.name;
    formation['name'] = req.body.name;
    formation['dots'] = JSON.parse(req.body.dots);

    formation.save((err, f) => {
        if (err) {
            return next(err);
        }
    });

    res.render('/dashboard/formations.hbs',{
        csrfToken: `${req.csrfToken()}`
    }); 
};

// Get Formation

exports.getFormationWithId =  (req, res) => {

    Formation.findOne({ _id: req.params.id}).exec().then( generic => {
        Feedback.find({formationID:req.params.id}).exec().then(commentsModel => {
            let readwrite; 
            let coachPermissions = false; 
            let private_ind = false; 
            let author = generic.author; 
            let currUser = req.user._id; 
            let originalAuthorInd = false; 
            if(author == currUser){
                originalAuthorInd = true; 
            }
            if(req.user.userType)
                {
                    coachPermissions = true; 
                }
            if(generic.team_id)
            {
                private_ind = true; 
             if(generic.team_id != res.locals.team._id) {
                res.redirect("/error"); 

             }
            }

            if(!private_ind) {
                readwrite = true; 
            }
            else if(private_ind && !coachPermissions) {
                readwrite = false; 
            }
            else if (private_ind && coachPermissions) {
                readwrite = true; 
            }
        
            req.app.locals.dots = JSON.stringify(generic.dots);
            let team1 = [];
            let team2 = [];
            let team1Name = generic.dots[0].team
            generic.dots.forEach((dot, i) => {
                return  (team1Name == dot.team) ? team1.push(dot) : (dot.id == '999') ? {} : team2.push(dot);
            });

            res.render('dashboard/formations/new.hbs', {
                formation: generic, 
                user:req.user, 
                teamRestrict: readwrite, 
                coachInd: coachPermissions, 
                originalAuthor: originalAuthorInd,   
                team1: team1, 
                team2: team2, 
                comments: commentsModel, 
                csrfToken:`${req.csrfToken()}`
            });
        })
        .catch(err => {
            throw err
        });
    })
    .catch(err => {
        throw err
    });
};

// Get Personal Formations

exports.getUsersFormations = (req, res) => {

    Formation.find({ author: req.user._id}).exec().then(f => {
        Formation.find({team_id: res.locals.team._id}).exec().then(x =>{
            Formation.find({team_id: null}).exec().then(y => {
                res.render('dashboard/formations.hbs', {
                    user: req.user, 
                    formations: f, 
                    teamArrRes: x, 
                    publicFormations: y, 
                    csrfToken:`${req.csrfToken()}`
                });
            
            });  
        });
    })
    .catch(err => { 
        throw err
    });

};

// Delete Formation

exports.deleteFormation = (req, res) => {

    let obj = {_id: req.params._id};

    Formation.remove(obj, err => {
        res.end()
    });

};


