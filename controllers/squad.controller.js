const mongoose = require("mongoose"); 
const TeamUserRel = require('../models/team-user-relation.model'); 
var nodemailer = require('nodemailer');
var dotenv = require('dotenv').config();

// Send Email to Team

exports.sendTeamEmail = async (req, res) => {
 
    let teamPlayerArr = [];

    var pipeline = [
        {
            $project: 
            {
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
                "users.email": "$users.email",
                "users.phoneNumber": "$users.phoneNumber",
                "users.dateOfBirth": "$users.dateOfBirth", 
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

        let emailString = "";

        for(let k = 0; k < teamPlayerArr.length; k++) {

            emailString += teamPlayerArr[k].users.email + ",";

        }


        var transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        });

        var mailOptions = {
            from: process.env.MAIL_HOST,
            to:  emailString,
            subject: req.body.subject,
            text: req.body.emailContent
        };

        transporter.sendMail(mailOptions, function(error, info){

            res.render("dashboard/email.hbs", {
                msg: "Email sent successfullly!", 
                csrfToken: `${req.csrfToken()}`
            });

        });

    }); 
};

// Get Squad Page

exports.hubGen = async (req, res) => {

	let teamPlayerArr = []; 
    var pipeline = [
        {
            $project: 
            {
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
                "users.email": "$users.email",
                "users.phoneNumber": "$users.phoneNumber",
                "users.age": "$users.age",
                "users.col1": "$users.col1",
                "users.col2": "$users.col2",
                "users.proType": "$users.proType",
                "users.userType": "$users.userType",
                "teamuserrels.team": "$teamuserrels.team",
                "teamuserrels.goals": "$teamuserrels.goals",
                "teamuserrels.mom": "$teamuserrels.mom",
                "teamuserrels.cards": "$teamuserrels.cards",
                "teamuserrels.clean_sheets": "$teamuserrels.clean_sheets",
                "teamuserrels.assist": "$teamuserrels.assist",
                "_id": 0
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

        res.render('dashboard/squad.hbs', {
            teamMembers: teamPlayerArr, 
            csrfToken: `${req.csrfToken()}` 
        }); 
    });

}; 

// Update Player Stats

exports.updateProc = async (req, res, next) => {

    const protoTeam = res.locals.team._id; 
    const protoPlayer = req.body.player;

    try {
        TeamUserRel.findOneAndUpdate({
            team:mongoose.Types.ObjectId(protoTeam), 
            player: mongoose.Types.ObjectId(protoPlayer)
        }, 
        {
            $set: {
                goals: req.body.goals,
                mom: req.body.mom, 
                cards : req.body.cards, 
                clean_sheets: req.body.cleanSheet, 
                assist: req.body.assis
            }},
        {
            upsert: true
        })
        .exec()
        .then(f => {
            next();
        });

        res.redirect('/dashboard/squad');

    } 
    catch(error){ 
        throw error;
    }
}

// Get Email Page

exports.getEmailArea = async (req, res) => {

    res.render("dashboard/email.hbs", {
        csrfToken: `${req.csrfToken()}`
    });

}

