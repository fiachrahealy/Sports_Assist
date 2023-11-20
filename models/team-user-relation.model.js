const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const teamUserRelSchema = new mongoose.Schema({
	player: {
    	type: mongoose.Schema.ObjectId, 
    	ref: 'User'
	}, 
	team: {
		type: mongoose.Schema.ObjectId, 	
		ref: 'Team'
	}, 
	relationType:{
		type: Boolean
	}, 
	goals:{
		type: String
	}, 
	assist:{
		type: String
	},  
	mom: {
		type: String
	}, 
	clean_sheets: {
		type: String
	}, 
	cards : {
		type: String
	}
}); 


module.exports = mongoose.model('TeamUserRel', teamUserRelSchema);
