const Training = require('../models/training.model');

// Get Training Page

exports.trainingGen = async (req, res) => {

	res.render('dashboard/training.hbs');

}

// Get Individual Training Page

exports.getIndividual = async (req, res) => {
	
	res.render('dashboard/training/individual.hbs', {
		csrfToken:`${req.csrfToken()}`
	}); 

}

// Get Team Training Page

exports.getTeam =  async (req, res) => {
	
	res.render('dashboard/training/team.hbs',{
		csrfToken:`${req.csrfToken()}`
	});

};

// Get Warm Up Training Page

exports.getWarmup = async  (req, res) => {
	
	res.render('dashboard/training/team/warmup.hbs',{
		csrfToken:`${req.csrfToken()}`
	});

}

// Get Teamlog Training Page

exports.getTeamLog = async  (req, res) => {
	
	res.render('dashboard/training/team/teamlog.hbs',{
		csrfToken:`${req.csrfToken()}`
	});

}

// Get Shooting Training Page

exports.getShooting = async  (req, res) => {
	
	res.render('dashboard/training/team/shooting.hbs',{
		csrfToken:`${req.csrfToken()}`
	}); 

}

// Get Passing Training Page

exports.getPassing =  async (req, res) => {
	
	res.render('dashboard/training/team/passing.hbs',{
		csrfToken:`${req.csrfToken()}`
	}); 

}

// Get Keeping Training Page

exports.getKeeping =  async (req, res) => {
	
	res.render('dashboard/training/team/keeping.hbs',{
		csrfToken:`${req.csrfToken()}`
	}); 

}

// Get Dribbling Training Page

exports.getDribbling = async (req, res) => {
	
	res.render('dashboard/training/team/dribbling.hbs',{
		csrfToken:`${req.csrfToken()}`
	}); 

}

// Get Defending Training Page

exports.getDefending = async  (req, res) => {
	
	res.render('dashboard/training/team/defending.hbs',{
		csrfToken:`${req.csrfToken()}`
	}); 

}

// Get Cooldown Training Page

exports.getCooldown =  async (req, res) => {
	
	res.render('dashboard/training/team/cooldown.hbs',{
		csrfToken:`${req.csrfToken()}`
	}); 
}

// Get Training Creation Page

exports.getTrainingCreator = async (req, res) => {
	
	res.render('dashboard/training/trainingCreator.hbs',  {
		csrfToken:`${req.csrfToken()}`
	}); 

} 

// Get Trainings

exports.getTrainings = async (req, res) => {

    let userID = res.locals.user._id; 

    if(req.body.decision == "1") {

        Training.find({user: userID}).exec().then(f => {

            res.render('dashboard/training/team/teamlog.hbs', {
                trainings: f
            });

        }); 
    }
    else if (req.body.decision == "2") {

        let teamID = res.locals.team._id; 

        Training.find({team_id: null, publicInd: true}).exec().then(f => {

            res.render('dashboard/training/team/teamlog.hbs', {
                trainings: f
            });

        }); 	
    }
    else if (req.body.decision == "3") {
        
        let teamID = res.locals.team._id; 

        Training.find({team_id: teamID, publicInd: false}).exec().then(f => {
 
            res.render('dashboard/training/team/teamlog.hbs', {
                trainings: f
            });
        }); 	
    }

}

// Create Training

exports.postTraining = async(req, res) => {

    let teamID = null;

    if(res.locals.user.userType && req.body.publicInd == false) {

        teamID = res.locals.team._id;
    
    }

    let userID = res.locals.user._id; 

    let training = new Training({ 
        title: req.body.title, 
        team_id: teamID, 
        warmup: req.body.warmup,
        category: req.body.category, 
        length: req.body.length, 
        description: req.body.description, 
        cooldown: req.body.cooldown, 
        publicInd: req.body.publicInd, 
        authorName: res.locals.user.name, 
        user: userID
    })
    .save(); 

    res.redirect('/dashboard/training/individual');

}






