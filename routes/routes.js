const express = require('express');

const router = express.Router();

// Controllers

const formationController = require('../controllers/formation.controller'); 
const forumController = require('../controllers/forum.controller');
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const teamController = require('../controllers/team.controller'); 
const trainingController = require('../controllers/training.controller'); 
const videoController = require ('../controllers/video.controller'); 
const commentController = require('../controllers/comment.controller');
const squadController = require('../controllers/squad.controller'); 
const dashboardController = require('../controllers/dashboard.controller'); 
const gymController = require('../controllers/gym.controller');
const nutritionController = require('../controllers/nutrition.controller');
const noticeController = require('../controllers/notice.controller');

// Landing

router.get('/', authController.isNotLoggedIn, userController.getLandingPage);

// Login

router.post('/login', authController.isNotLoggedIn, authController.login, teamController.setTeamArrayCookieDriver,);
router.get('/login',authController.isNotLoggedIn,authController.getLoginPage,);

// Signup

router.post('/signup',authController.isNotLoggedIn,userController.checkUserExists,userController.registerUser,authController.login,);
router.get('/signup',authController.isNotLoggedIn,userController.getRegisterPage,);

// Logout

router.get('/logout',authController.isLoggedIn,teamController.destroyTeamCookie, teamController.destroyTeamArrayCookie, authController.logout,);

// Account

router.get('/account',authController.isLoggedIn,forumController.getUserPosts,);
router.post('/account',authController.isLoggedIn, userController.updateUser,);
router.post('/account/delete',authController.isLoggedIn, userController.deleteUser);
router.get('/account/delete',authController.isLoggedIn,userController.getDeletePage,);

// Teams

router.get('/teams',authController.isLoggedIn, teamController.hasTeam, teamController.destroyTeamCookie,teamController.setTeamArrayCookieDriver, userController.teamListGen,);

// Teams Related Pages

router.get('/teams/new', teamController.showTeamCreationWizard,); 
router.post('/addTeam', teamController.addTeam,); 
router.post('/teams/new', teamController.userNewTeam, teamController.setTeamArrayCookieDriver,); 
router.get('/teamNotFound', teamController.team404,); 
router.get('/generateNewRelationForCoach',userController.isManager ,teamController.generateNewRelationForCoach,); 

// Forum

router.get('/forum', forumController.getIndexPage); 

// Forum Related Pages

router.post('/forum/add',authController.isLoggedIn,forumController.newPost);
router.get('/forum/post/:slug',forumController.getPostBySlug);
router.post('/comment', authController.isLoggedIn,commentController.newComment);
router.get('/forum/post/:slug/edit', authController.isLoggedIn,forumController.getPostToUpdate);
router.post('/forum/post/:slug/edit', authController.isLoggedIn,forumController.verifyPost,forumController.updatePost);
router.get('/forum/search',forumController.searchPost);
router.get('forum/page/:page',forumController.getIndexPage);
router.post('/deletePost',authController.isLoggedIn,forumController.deletePost);

// Dashboard

router.get('/dashboard', authController.isLoggedIn, teamController.hasTeamCurrently, dashboardController.dashboardGen,);
router.post('/dashboard', teamController.teamCookieDriver, dashboardController.dashboardGen,);

// Dashboard Related Pages

router.get('/dashboard/email', squadController.getEmailArea,);
router.get('/dashboard/details',authController.isLoggedIn,teamController.hasTeamCurrently, dashboardController.detailsGen,);
router.get('/dashboard/leave',authController.isLoggedIn,teamController.hasTeamCurrently, dashboardController.leaveGen,);
router.get('/dashboard/gym',authController.isLoggedIn, teamController.hasTeamCurrently, gymController.getGymPage,);
router.get('/dashboard/formations',teamController.hasTeamCurrently, formationController.getUsersFormations,); 
router.get('/dashboard/training',authController.isLoggedIn,teamController.hasTeamCurrently,dashboardController.trainingGen,);
router.get('/dashboard/forum',authController.isLoggedIn,teamController.hasTeamCurrently,forumController.getTeamIndexPage);
router.get('/dashboard/squad', authController.isLoggedIn,teamController.hasTeamCurrently, squadController.hubGen);
router.post('/dashboard/leave',authController.isLoggedIn,teamController.hasTeamCurrently,teamController.leaveTeam,teamController.destroyTeamArrayCookie, teamController.destroyTeamCookie, authController.isNotLoggedIn,);

//Dashboard/Nutrition Related Pages

router.get('/dashboard/nutrition',authController.isLoggedIn,teamController.hasTeamCurrently,nutritionController.getNutritionPage,);
router.post('/dashboard/nutrition',authController.isLoggedIn, nutritionController.addNutrition,);

// Dashboard/Results Related Pages

router.get('/dashboard/results',authController.isLoggedIn,dashboardController.resultsGen,);
router.post('/dashboard/results',dashboardController.addResult);
router.post('/dashboard/results/delete',dashboardController.deleteResult);

// Dashboard/Fixtures Related Pages

router.get('/dashboard/fixtures',authController.isLoggedIn, teamController.hasTeamCurrently, dashboardController.fixturesGen,);
router.post('/dashboard/fixtures',dashboardController.addFixture,);
router.post('/dashboard/fixtures/delete',authController.isLoggedIn, userController.isManager,teamController.hasTeamCurrently,dashboardController.deleteFixture);

// Dashboard/Video Related Pages

router.get('/dashboard/video',authController.isLoggedIn,teamController.hasTeamCurrently, videoController.getVideoAnalysisPage,); 
router.post('/dashboard/video',authController.isLoggedIn,userController.isManager,teamController.hasTeamCurrently,videoController.addVideo);
router.post('/dashboard/video/delete',authController.isLoggedIn,userController.isManager,teamController.hasTeamCurrently,videoController.deleteVideo);
router.get('/dashboard/video/:code',authController.isLoggedIn,teamController.hasTeamCurrently, videoController.getVideoByCode);

// Dashboard/Settings Related Pages

router.get('/dashboard/settings',authController.isLoggedIn,userController.isManager,teamController.hasTeamCurrently,dashboardController.settingsGen,)
router.post('/dashboard/settings',authController.isLoggedIn, userController.isManager,teamController.hasTeamCurrently,teamController.updateTeam,);
router.get('/dashboard/settings/delete',authController.isLoggedIn,userController.isManager,teamController.hasTeamCurrently,dashboardController.deleteGen,);
router.post('/dashboard/settings/delete',authController.isLoggedIn,userController.isManager,teamController.hasTeamCurrently,teamController.deleteTeam,teamController.destroyTeamArrayCookie, teamController.destroyTeamCookie, authController.isNotLoggedIn,);

// Dashboard/Forum Related Pages

router.get('/dashboard/forum/post/:slug/edit', authController.isLoggedIn,teamController.hasTeamCurrently, forumController.TeamGetPostToUpdate); 
router.get('/dashboard/forum/post/:slug',authController.isLoggedIn,teamController.hasTeamCurrently,forumController.getPostBySlug);
router.get('/dashboard/forum/search',authController.isLoggedIn,teamController.hasTeamCurrently,forumController.TeamSearchPost);
router.post('/dashboard/forum/add',authController.isLoggedIn,teamController.hasTeamCurrently,forumController.TeamNewPost);
router.post('/dashboard/forum/post/:slug/edit',authController.isLoggedIn,teamController.hasTeamCurrently,forumController.verifyPost,forumController.updatePostTeam);
router.post('/deletePostTeam',authController.isLoggedIn,teamController.hasTeamCurrently,forumController.deleteTeamPost);

// Dashboard/Formations Related Pages

router.post('/newFormation', authController.isLoggedIn,teamController.hasTeamCurrently, formationController.addFormation,); 
router.post('/dashboard/copyFormation',  authController.isLoggedIn,teamController.hasTeamCurrently,formationController.copyFormation,);
router.get('/dashboard/formations/:id', authController.isLoggedIn, teamController.hasTeamCurrently, formationController.getFormationWithId,); 
router.delete('/dashboard/formations/:_id', authController.isLoggedIn,teamController.hasTeamCurrently, formationController.deleteFormation,); 
router.put('/dashboard/formations/:_id', authController.isLoggedIn,teamController.hasTeamCurrently, formationController.saveFormation,); 
router.post('/dashboard/formations/:id', authController.isLoggedIn,teamController.hasTeamCurrently, formationController.addCommentFormation,);

// Dashboard/Training Related Pages

router.get('/dashboard/training', authController.isLoggedIn, teamController.hasTeamCurrently, trainingController.getIndividual,); 
router.get('/dashboard/training/individual', authController.isLoggedIn, teamController.hasTeamCurrently, trainingController.getIndividual,); 
router.get('/dashboard/training/team', authController.isLoggedIn, teamController.hasTeamCurrently, trainingController.getTeam,); 
router.get('/dashboard/training/team/warmup', authController.isLoggedIn, teamController.hasTeamCurrently, trainingController.getWarmup,); 
router.get('/dashboard/training/individual/create', authController.isLoggedIn,teamController.hasTeamCurrently, trainingController.getTrainingCreator,)
router.post('/dashboard/training/individual/create', authController.isLoggedIn,teamController.hasTeamCurrently, trainingController.postTraining,);  
router.get('/dashboard/training/team/shooting', authController.isLoggedIn, teamController.hasTeamCurrently, trainingController.getShooting,); 
router.get('/dashboard/training/team/passing', authController.isLoggedIn, teamController.hasTeamCurrently, trainingController.getPassing,); 
router.get('/dashboard/training/team/keeping', authController.isLoggedIn, teamController.hasTeamCurrently, trainingController.getKeeping,); 
router.get('/dashboard/training/team/dribbling',authController.isLoggedIn, teamController.hasTeamCurrently, trainingController.getDribbling,); 
router.get('/dashboard/training/team/defending',authController.isLoggedIn, teamController.hasTeamCurrently, trainingController.getDefending,);
router.get('/dashboard/training/team/cooldown',authController.isLoggedIn, teamController.hasTeamCurrently, trainingController.getCooldown,);
router.post('/dashboard/training/individual/sessions',authController.isLoggedIn, teamController.hasTeamCurrently, trainingController.getTrainings,); 
router.get('/dashboard/training/team',authController.isLoggedIn,teamController.hasTeamCurrently,dashboardController.teamTrainingGen);
router.get('/dashboard/training/individual',authController.isLoggedIn,teamController.hasTeamCurrently,dashboardController.individualTrainingGen);

// Dashboard/Email Related Pages

router.post('/dashboard/email', squadController.sendTeamEmail,);

// Dashboard/Gym Related Pages

router.post('/dashboard/gym', gymController.addWorkout,);

// Dashboard/Squad Related Pages

router.post('/dashboard/squad', squadController.updateProc,);
 
// Dashboard/Noticeboard Related Pages

router.get('/dashboard/noticeboard/create', noticeController.createNoteGen);
router.post('/dashboard/noticeboard/create', noticeController.addNewNote);  
router.post('/dashboard/noticeboard', noticeController.noticeboardGen);

module.exports = router;
