const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var date = new Date();

const nutritionSchema = new mongoose.Schema({
    userID:{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    date : {
        type: Date,
        default: date.toDateString()
    }, 
    height : {
        type: Number
    }, 
    weight: {
        type: Number
    }, 
});

module.exports = mongoose.model("Nutrition", nutritionSchema); 