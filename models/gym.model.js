const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const gymSchema = new mongoose.Schema({
	teamID : {
		type: mongoose.Schema.ObjectId,
		ref: 'Team'
	},
	exercises:[{
		name :{	
			type: String
		},
		sets : {
			type: String
		},
		reps : {
			type: String
		},
		weight : {
			type: String
		}
	}]
});

module.exports = mongoose.model('Gym', gymSchema);