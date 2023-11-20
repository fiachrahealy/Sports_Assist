const mongoose = require('mongoose'); 
const Video = require('../models/video.model');

// Create Video

exports.addVideo = async (req, res) => {

    await (new Video(req.body)).save();
    res.redirect('/dashboard/video/');
  
};

// Get Video Page

exports.getVideoAnalysisPage = async (req, res) => {

	const teamID = res.locals.team._id;

	Video.find({team: mongoose.Types.ObjectId(teamID)}).exec().then(g => {

        if (g[0] != undefined) {

            let y = g.length;

            res.redirect('/dashboard/video/'+g[y-1].code);

        }
        else {

            res.render('dashboard/video.hbs',{
                csrfToken: `${req.csrfToken()}`
            }); 

        }

    });

}; 

// Delete Video

exports.deleteVideo = async (req, res, next) => {
    
    Video.remove({
        _id: req.body.vidID
    }, err => res.end());

     res.redirect('/dashboard/video')

    next();

}

// Get Video by Code

exports.getVideoByCode = async (req, res) => {

    const video = await Video.findOne({ 
        code: req.params.code 
    })
    .populate('author comments');

    const teamID = res.locals.team._id;

    if (!video) {
        res.redirect('/error'); 
        return;
    }

    if(teamID != video.team) { 
        res.render('prohibited.hbs'); 
        return;
    }

    Video.find({
        team: mongoose.Types.ObjectId(teamID)
    })
    .exec()
    .then(g => {
        res.render('dashboard/video/new.hbs', {
            videos: g.reverse(), 
            video, 
            csrfToken:`${req.csrfToken()}`
        });
    });

}

