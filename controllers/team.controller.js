const Team = require('../models/team.model');
const TeamUserRel = require('../models/team-user-relation.model');

// Get Team Not Found Page

exports.team404 = async (req, res) => {
    res.render('teams/team-404.hbs');
};

// Check if Team Exists

exports.checkForTeam = async (req, res, next) => {

    try {
        let existsIndicator = await Team.find({ teamCode: req.body.potentialTeamID }, { limit: 1 });

        if (existsIndicator.length) {
            next();
        } else {
            res.render('teams/teamNotFound.hbs');
            next();
        }
    } catch (error) {
        throw error;
    }

};

// Add User to Team

exports.userNewTeam = async (req, res) => {

    try {
        let genericTeam = await Team.find({ teamCode: req.body.potentialTeamID });
        if (genericTeam[0]) {
            let teamRes = await JSON.parse(JSON.stringify(genericTeam[0]));
            const teamResId = await teamRes._id;
            const playerId = await res.locals.user.id;
            let findIfJoinedAlready = await TeamUserRel.find({ 
                player: req.user.id, 
                team: teamResId 
            });

            if (findIfJoinedAlready[0]) {
                res.render('teams/team-already-joined.hbs', { 
                    teamxName: teamRes.teamName 
                });
            } 
            else {
                const genericTeamUserRel = await new TeamUserRel({
                    player: playerId,
                    team: teamResId,
                    relationType: false,
                    goals: 0,
                    assist: 0,
                    mom: 0,
                    clean_sheets: 0,
                    cards: 0
                })
                .save();
                res.redirect('/teams');
    
            }
        } else {
            res.render('teams/team-404.hbs');
        }
    } catch (error) {
        throw error;
    }
};

// Destroy Team Cookie

exports.destroyTeamCookie = async (req, res, next) => {

    if (res.cookie.team || res.locals.team) {
        res.clearCookie('team');
        res.locals.team = null;

    }
    next();
};

// Update Team

exports.updateTeam = async (req, res) => {

    const team = await Team.findOneAndUpdate(
        {
            _id: req.body.id,
        },
        req.body,
        { new: true, runValidatos: true },
    ).exec();

    await res.cookie("team", team);
    res.locals.team = team;

    res.redirect('/dashboard');

};

// Delete Team

exports.deleteTeam = async (req, res, next) => {

    Team.remove({ 
        _id: req.body.id
    });
    TeamUserRel.remove({ 
        team: req.body.id
     });

    next();

};

// Remove User from Team

exports.leaveTeam = async (req, res, next) => {

    TeamUserRel.remove({ 
        team: req.body.teamId, 
        player: req.body.userId 
    });

    next();
};

// Check User has Team

exports.hasTeam = async (req, res, next) => {

    const rel = await TeamUserRel.find({ 
        player: req.user 
    });

    if (rel.length) {
        next();
    } 
    else {
        res.redirect('/teams/new');
    }

};

// Check User has Current Team

exports.hasTeamCurrently = async (req, res, next) => {

    if (!res.locals.team && !res.cookie.team) {
        res.redirect('/teams');
    } 
    else {
        next();
    }

};

// Destroy Team Array Cookie

exports.destroyTeamArrayCookie = async (req, res, next) => {
    
    if (res.cookie.teamArr || res.locals.teamArr) {
        res.clearCookie("teamArr");
        res.locals.teamArr = null;
    }
    next();

};

// Set Team Array Cookie Driver

exports.setTeamArrayCookieDriver = async (req, res, next) => {

    try {
        const protoUser = req.user.id;
        let relationProtoType = await TeamUserRel.find({ player: protoUser });
        let continueInd = true;
        if (relationProtoType[0]) {
            const teamProtoArray = await JSON.parse(JSON.stringify(relationProtoType));
            var teamsArr = new Array();
            for (let i = 0; i < teamProtoArray.length; i++) {
                let genericTeam = await Team.find({ _id: teamProtoArray[i].team });
                let normalisedTeamObject = await JSON.parse(JSON.stringify(genericTeam[0]));
                teamsArr.push(normalisedTeamObject);
            }
            res.cookie("teamArr", teamsArr);
        }
        next();
    } 
    catch (error) {
        throw error
    }

};

// Create Team Array Cookie

exports.teamCookieDriver = async (req, res, next) => {

    try {
        const protoUser = req.user.id;
        let relationProtoType = await TeamUserRel.find({ player: protoUser });
        if (relationProtoType[0]) {
            let genericTeam = await Team.find({ _id: req.body.teamId });
            const teamNormalised = await JSON.parse(JSON.stringify(genericTeam[0]));
            await res.cookie("team", teamNormalised);
            res.locals.team = teamNormalised;
        }
        next();
    } 
    catch (error) {
        throw error;
    }

};

// Create Team

exports.addTeam = async (req, res) => {

    try {
        const protoJoinCode = getJoinCode();
        if (req.body.teamName.length > 20) {
            res.redirect('teams/new', { 
                msg: "Your team name is too long. Please try again with a name less than 20 characters " 
            });
        }

        req.body.teamCode = protoJoinCode;

        const team = await new Team({
            teamName: req.body.teamName,
            addr1: req.body.addr1,
            addr2: req.body.addr2,
            county: req.body.county,
            phNum: req.body.phNum,
            email: req.body.email,
            teamType: req.body.teamType,
            jerseyType: req.body.jerseyType,
            col1: req.body.col1,
            col2: req.body.col2,
            coach: req.user,
            teamCode: req.body.teamCode
        })
        .save();

        const genericTeamUserRel = new TeamUserRel({
            player: res.locals.user._id,
            team: team._id,
            relationType: true,
            goals: "0",
            assist: "0",
            mom: "0",
            clean_sheets: "0",
            cards: "0"
        })
        .save();

        res.redirect('/teams');
    } 
    catch (error) {
        throw error;
    }

};

// Create Manager Team Relation

exports.generateNewRelationForCoach = async (req, res) => {

    let genericTeam = await Team.find({ 
        coach: req.user 
    })
    .sort({ 
        created: -1 
    });

    if (TeamUserRel.find({ player: req.user.id, team: genericTeam[0].id })) {
        res.redirect("/teams");
    }

    const playerId = await res.locals.user.id;

    const genericTeamUserRel = new TeamUserRel({
        player: req.user.id,
        team: genericTeam[0].id,
        relationType: true,
        goals: "0",
        assist: "0",
        mom: "0",
        clean_sheets: "0",
        cards: "0"
    })
    .save();
    
    res.redirect("/teams");

};

// Create Team Join Code

function getJoinCode() {

    return Math.random().toString(36).slice(-5);

}

// Get Create Team Page

exports.showTeamCreationWizard = (req, res) => {

    if (req.user.userType == true) {

        res.render("teams/new-manager.hbs", { 
            csrfToken: `${req.csrfToken()}` 
        });

    } 
    else {

        res.render("teams/new-player.hbs", { 
            csrfToken: `${req.csrfToken()}` 
        });

    }
    
};