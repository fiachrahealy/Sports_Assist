const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var date = new Date();

const privateMessageSchema = new mongoose.Schema({
	player: {
    	type: mongoose.Schema.ObjectId, 
    	ref: 'User'
	}, 
	team: {
		type: mongoose.Schema.ObjectId, 	
		ref: 'Team'
	}, 
	subject: {
		type: String	
	}, 
	content: {
		type: String
	}, 
	created: {
		type: String, 
		default: date.toDateString(),  	
	}

}); 

module.exports = mongoose.model('PrivateMessage', privateMessageSchema);