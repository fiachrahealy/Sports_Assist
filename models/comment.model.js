const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var date = new Date();

const commentSchema = new mongoose.Schema({
    article: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post'
    },
    comment: {
        type: String
    },
    name: {
        type: String
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: date.toDateString()
    },
});

module.exports = mongoose.model('Comment', commentSchema);