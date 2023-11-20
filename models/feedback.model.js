const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const feedbackSchema = new mongoose.Schema({
    feedback: {
        type: String
    },
    formationID: {
        type: String
    },
    author: {
        type: String
    },
    authorName: {
        typoe: String
    },
    date: {
        type: String
    }
});

module.exports = mongoose.model('Feedback', feedbackSchema);