const Comment = require('../models/comment.model');

// Create Comment

exports.newComment = async (req, res) => {

  req.body.author = req.user._id;
  req.body.name = req.user.name;

  await (new Comment(req.body)).save();

  res.redirect('back');

};
