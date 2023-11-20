const Gym = require('../models/gym.model');

// Get Gym Page

exports.getGymPage = async (req, res) =>
{
	Gym.find({teamID:res.locals.team._id}).exec().then(f => {

		res.render('dashboard/gym.hbs',{
			csrfToken: `${req.csrfToken()}`, 
			exerciseArr:f.reverse()
		});

	}); 
};

// Create Workout

exports.addWorkout = (req, res) =>
{
	
	Gym.find({teamId:res.locals.team._id}).exec().then(f => {
		
		const teamID = res.locals.team._id; 
		let protoArray = JSON.parse(req.body.reqcontent);

		const gym = new Gym({
			teamID: teamID,
			exercises: protoArray
		}).save(); 
		
		res.redirect("/dashboard/gym");

	}); 
}


