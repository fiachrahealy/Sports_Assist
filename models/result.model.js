const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const resultSchema = new mongoose.Schema ( { 
	team: { 
		type: mongoose.Schema.ObjectId,
		ref: 'Team'
	}, 
	date: {
		type: String
	},
	time: {
		type: String
	},
	venue: {
		type: String
	},
	versus: {
		type: String
	},
	ref: {
		type: String
	}, 
	score: {
		type: String
	},
	result: {
		type: String
	},
}); 

module.exports = mongoose.model('Result', resultSchema); 