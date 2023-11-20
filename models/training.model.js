const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const trainingSchema = new mongoose.Schema({
    title: {
        type: String
    },
    team_id: { 
        type: mongoose.Schema.ObjectId, 
        ref: 'Team'
    }, 
    warmup: {
        type: String
    },
    category: {
        type: String
    }, 
    length:{
        type: String
    }, 
    description: {
        type: String
    }, 
    cooldown: {
        type: String
    }, 
    publicInd: {
        type: Boolean
    }, 
    authorName: {
        type: String
    },
    user: {
        type: mongoose.Schema.ObjectId, 
        ref: 'User'
    }
});

module.exports = mongoose.model('Training', trainingSchema);

