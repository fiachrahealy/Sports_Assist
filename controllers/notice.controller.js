const mongoose = require("mongoose"); 
const PrivateMessage = require('../models/private-message.model'); 
const User = require('../models/user.model')
const TeamUserRel = require('../models/team-user-relation.model'); 

// Get Create Note Page

exports.createNoteGen = async (req, res) => {

    let teamPlayerArr = []; 
    var pipeline = [
        {
            $project: {
                "_id": 0,
                "teamuserrels": "$$ROOT"
            }
        },
        {
            $lookup: 
            {
                localField: "teamuserrels.player",
                from: "users",
                foreignField: "_id",
                as: "users"
            }
        }, 
        {
            $unwind: 
            {
                path: "$users",
                preserveNullAndEmptyArrays: false
            }
        }, 
        { 
            $project : {
                "users._id": "$users._id",
                "users.name": "$users.name",
                "users.userType": "$users.userType",  
                "teamuserrels.team": "$teamuserrels.team",
                
            }
        }
    ];
    
    TeamUserRel.aggregate(pipeline).exec().then(g => {

     let proto = JSON.parse(JSON.stringify(g)); 

     for(let i = 0; i < proto.length; i++) {

        if((proto[i].teamuserrels.team == res.locals.team._id)) {
            teamPlayerArr.push(g[i]); 
        }

    }

    if(req.resultMsg){

        res.render("dashboard/noticeboard/create.hbs", {
            teamMembersArr: teamPlayerArr, 
            msg: req.resultMsg, 
            csrfToken: `${req.csrfToken()}`
        });
    
    }

    res.render("dashboard/noticeboard/create.hbs", {
        teamMembersArr: teamPlayerArr, 
        csrfToken: `${req.csrfToken()}`
    }); 

}); 

}

// Create Note

exports.addNewNote = async (req, res, next) => {

    const msg = await new PrivateMessage({
        player: req.body.player, 
        team: req.body.team, 
        subject: req.body.subject,
        content: req.body.content, 
    })
    .save(); 

    res.redirect("/dashboard/noticeboard/create");

};

// Get Noticeboard Page

exports.noticeboardGen = async (req, res) => {

    PrivateMessage.find({
        team: res.locals.team._id, 
        player: mongoose.Types.ObjectId(req.body.player)
    })
    .exec()
    .then(f => {
        User.findOne({
            _id: mongoose.Types.ObjectId(req.body.player)
        })
        .exec()
        .then(g => {
            res.render("dashboard/noticeboard.hbs",{
                messages: f.reverse(), 
                name: g.name, 
                csrfToken: `${req.csrfToken()}`
            }); 
        });
    });

}; 