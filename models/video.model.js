const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var date = new Date();

const videoSchema = new mongoose.Schema ( { 
team: { 
	type: mongoose.Schema.ObjectId,
	ref: 'Team'
}, 
code: {
	type: String
},
title: {
	type: String
},
author: {
	type: mongoose.Schema.ObjectId,
	ref: 'User'
},
created: {
	type: String, 
	default: date.toDateString(), 
}
}); 

videoSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id', 
  foreignField: 'article', 
});

module.exports = mongoose.model('Video', videoSchema); 