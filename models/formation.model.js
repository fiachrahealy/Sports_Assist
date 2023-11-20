const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const formationSchema = new mongoose.Schema({
    name: {
        type: String
    },
    author: {
        type: String
    },
    authorName: {
        type: String
    },
    date: {
        type: String
    },
    team_id: { 
        type: mongoose.Schema.ObjectId, 
        ref: 'Team'
    }, 
    dots: {
        type: Array,
        default: [
            {
                id: '1',
                x:47,
                y:450,
                team:'Team 1',
                player:91,
                name:'noName'
            },
            {
                id: '2',
                x:400,
                y:500,
                team:'Team 1',
                player:7,
                name:'noName'
            },
            {
                id: '12',
                x:50,
                y:450,
                team:'Team 2',
                player:9,
                name:'noName'
            },
            {
                id: '13',
                x:321,
                y:500,
                team:'Team 2',
                player:19,
                name:'noName'
            },
            {
                id: '999',
                x:525,
                y:340,
                team:null,
                player:null,
                name:null
            }
        ]
    }
});

module.exports = mongoose.model('Formation', formationSchema);