const mongoose = require('mongoose');
const Nutrition = require('../models/nutrition.model');

// Create Nutrition

exports.addNutrition = async(req, res) =>{
	
	await (new Nutrition({
		userID:res.locals.user._id,
		height:req.body.height,
		weight:req.body.weight
	}))
	.save();
	
	res.redirect('/dashboard/nutrition');

}

// Get Nutrition Page

exports.getNutritionPage = async (req,res) =>
{

	Nutrition.find({
		userID: mongoose.Types.ObjectId(res.locals.user._id)
	})
	.sort({
		_id:-1
	})
	.exec()
	.then(f => {
		res.render('dashboard/nutrition.hbs',{
			nutrition: f,
			csrfToken: `${req.csrfToken()}`
		});
	});	

};