const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var date = new Date();

const teamSchema = new mongoose.Schema({
    teamName: {
        type: String
    },
    addr1: {
        type: String
    },
    addr2: {
        type: String
    },
    teamType: {
        type: String
    },
    county: {
        type: String 
    }, 
    phNum: {
        type: String 
    }, 
    email: {
        type: String 
    }, 
    teamType: {
        type: String 
    }, 
    coach: {
        type: mongoose.Schema.ObjectId, 
        ref: 'User'
    }, 
    teamCode: {
        type:String
    }, 
    col1: {
        type: String
    }, 
    col2: {
        type: String 
    }, 
    jerseyType: {
        type: String 
    }, 
    created: {
        type: String,
        default: date.toDateString()
    }
});

teamSchema.virtual('videos', {
  ref: 'Video', 
  localField: '_id', 
  foreignField: 'team', 
});

module.exports = mongoose.model('Team', teamSchema);
