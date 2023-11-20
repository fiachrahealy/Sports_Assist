const mongoose = require('mongoose');

const Fixture = require('../models/fixture.model');
const Result = require('../models/result.model');

// Get Dashboard Page

exports.dashboardGen =  (req, res) => {

	res.render('dashboard.hbs', {
		team: res.locals.team, 
		csrfToken:`${req.csrfToken()}`
	});

}

// Get Fixtures Page

exports.fixturesGen = async (req, res) => {

	const teamID = res.locals.team._id;

	Fixture.find({
		team: mongoose.Types.ObjectId(teamID)
	})
	.exec()
	.then(fixtures => {
		res.render('dashboard/fixtures.hbs', {
			fixtures: fixtures, 
			csrfToken: `${req.csrfToken()}`
		}); 
	});
	
};

// Get Results Page

exports.resultsGen = async (req, res) => {

	const teamID = res.locals.team._id;

	Result.find({
		team: mongoose.Types.ObjectId(teamID)
	})
	.exec()
	.then(results => {

		res.render('dashboard/results.hbs', {
			result: results, 
			csrfToken:`${req.csrfToken()}`
		});

	});
};

// Get Gym Page

exports.gymGen = async (req, res) => {
	
	res.render('dashboard/gym.hbs', {
		csrfToken: `${req.csrfToken()}`
	});

}

// Get Nutrition Page

exports.nutritionGen = async (req, res) => {
	
	res.render('dashboard/nutrition.hbs', {
		csrfToken: `${req.csrfToken()}`
	}); 

}

// Get Training Page

exports.trainingGen = async (req, res) => {
	
	res.render('dashboard/training.hbs', {
		csrfToken: `${req.csrfToken()}`
	}); 
}

// Get Team Training Page

exports.teamTrainingGen = async (req, res) => {
	
	res.render('dashboard/training/team.hbs', {
		csrfToken: `${req.csrfToken()}`
	});
}

// Get Individual Training Page

exports.individualTrainingGen = async (req, res) => {
	
	res.render('dashboard/training/individual.hbs', {
		csrfToken: `${req.csrfToken()}`
	});
}

// Get Team Settings Page

exports.settingsGen = async (req, res) => {
	
	res.render('dashboard/settings.hbs', {
		csrfToken:`${req.csrfToken()}`
	}); 
}

// Get Team Deletion Page

exports.deleteGen = async (req, res) => {
	
	res.render('dashboard/settings/delete.hbs', {
		csrfToken:`${req.csrfToken()}`
	}); 
}

// Get Team Details Page

exports.detailsGen = async (req, res) => {
	
	res.render('dashboard/details.hbs', {
		csrfToken: `${req.csrfToken()}`
	});
}

// Get Team Leave Page

exports.leaveGen = async (req, res) => {

	if(req.user.userType == true){
		res.redirect('/dashboard/settings/delete');
	} 
	else {
		res.render('dashboard/leave.hbs', {
			csrfToken:`${req.csrfToken()}`
		}); 
	}

}

// Create Fixture

exports.addFixture = async (req, res) => {
  
	await (new Fixture(req.body)).save();

	res.redirect('/dashboard/fixtures');

};

// Delete Fixture

exports.deleteFixture = async (req, res, next) =>
{
    Fixture.remove({_id: req.body.fixID}, err => res.end());

    res.redirect('/dashboard/fixtures');

}; 

// Create Result

exports.addResult = async (req, res) => {
  
  await (new Result(req.body)).save();

  res.redirect('/dashboard/results');

};

// Delete Result

exports.deleteResult = async (req, res, next) =>
{
    Result.remove({_id: req.body.resID}, err => res.end());

    res.redirect('/dashboard/results');

}; 

