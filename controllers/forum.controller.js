const Post = require('../models/post.model');
const Team = require('../models/team.model'); 
const Formation = require('../models/formation.model');

// Get Forum Page

exports.getIndexPage = async (req, res) => {

    const page = req.params.page || 1;
    const limit = 5;
    const skip = (page * limit) - limit;
    let query =  {team_id: null}; 

    const postsPromise = await Post.find(query).sort({
            created: -1 
    })
    .populate('author').skip(skip)
    .limit(limit); 

    const countPromise = await Post.count(query);

    const [posts, count] = await Promise.all([postsPromise, countPromise]);

    const pages = Math.ceil(count / limit);

    res.render('forum.hbs', {
        posts,
        page, 
        pages,
        count, 
        csrfToken:`${req.csrfToken()}`
    });
};

// Get Team Forum Page

exports.getTeamIndexPage = async (req, res) => {

	const page = req.params.page || 1;
	const limit = 5;
	const skip = (page * limit) - limit;

	if(res.locals.team != null) {

		query = {team_id: res.locals.team._id};

	}

	const postsPromise = await Post.find(query).sort({
		created: -1 
	})
	.populate('author')
	.skip(skip)
	.limit(limit); 

	const countPromise = await Post.count(query);

	const [posts, count] = await Promise.all([postsPromise, countPromise]);

	const pages = Math.ceil(count / limit);

	res.render('dashboard/forum.hbs', {
		posts,
		page, 
		pages,
		count, 
		teamName: res.locals.team.teamName, 
		csrfToken:`${req.csrfToken()}`
	}); 

};

// Get Posts by User

exports.getUserPosts = async (req, res) => {

	const posts = await Post.find({ 
		author: req.user._id
	});

	for(let i = 0; i < posts.length; i++){

		if(posts[i].team_id){

			let teamName = JSON.stringify(( await  Team.find({
				_id:posts[i].team_id
			}, 'teamName')));

			teamName = JSON.parse(teamName.slice(1, teamName.length -1 )); 
			teamName = JSON.stringify(teamName["teamName"]); 

			posts[i]["postType"] = teamName.slice(1, teamName.length- 1);

		}
		else {

			posts[i]["postType"] = "Public";

		}
	}
		
    Formation.find({ 
        author: req.user._id
    })
    .exec()
    .then(f => {

        res.render('account.hbs', {
            user: req.user, 
            posts, formations: f, 
            csrfToken:`${req.csrfToken()}`
        });

    })
    .catch(err => { 
        throw err
    });
};

// Create Post

exports.newPost = async (req, res) => {

	req.body.author = req.user._id;
	const post = await (new Post(req.body)).save();

	req.flash('success', `Successfully Created ${
		post.title
	}.`);

	res.redirect('/forum');
}; 

// Create Team Post

exports.TeamNewPost = async (req, res) => {

	req.body.author = req.user._id;

	if(res.locals.team) {

		req.body.team_id = res.locals.team._id;  

	}
	else {

		req.body.team_id = null;

	}

    const post = await (new Post(req.body)).save();

    req.flash('success', `Successfully Created ${
        post.title
    }.`);

    res.redirect('/dashboard/forum');
}; 

// Delete Post

exports.deletePost = async (req, res, next) => {

    let dash = false
    let post =  {id: req.body.id};

    if(post.team_id){

        dash = true;

    }

    Post.remove({
        _id: req.body.id
    }, err => {

        res.end();

    });

    res.redirect('/forum');
	
}; 

// Delete Team Post

exports.deleteTeamPost = async (req, res, next) =>
{
    let dash = false
    let post =  {id: req.body.id};

    if(post.team_id){

        dash = true;
    }

    Post.remove({
        _id: req.body.id
    }, err => {
        res.end();
    });

    res.redirect('/dashboard/forum');
	
}; 

// Get Post by Slug

exports.getPostBySlug = async (req, res) => {

	const post = await Post.findOne({ slug: req.params.slug }).populate('author comments');

	let author = JSON.stringify(post.author._id);
	let currUser = JSON.stringify(req.user._id);
	let originalAuthorInd = false; 

	if(author == currUser){

		originalAuthorInd = true; 

	} 

	if (!post) {

		res.redirect('/error'); 
		return;

	}

	if(post.team_id) {

		if(res.locals.team._id != post.team_id) { 
			res.render('prohibited.hbs');

		}
		else {
			res.render('dashboard/forum/post.hbs', { 
				originalAuthor: originalAuthorInd, 
				post, 
				csrfToken:`${req.csrfToken()}`
			}); 
		}

	}
	else if (!res.locals.team && post.team_id) {
		
		res.render('prohibited.hbs');

	} 
	else {
	
		res.render('forum/post.hbs', {
			post, csrfToken:`${req.csrfToken()}`
		});

	}

};

// Get Post to Update

exports.getPostToUpdate = async (req, res) => {

	let query =  {slug: req.params.slug, author: req.user._id };

	const post = await Post.findOne(query).populate('author');

	if (!post) {

		res.redirect('/error'); 
		return;

	}

	res.render('forum/edit.hbs', { 
		post,  
		csrfToken:`${req.csrfToken()}`
	});

};

// Get Team Post to Update

exports.TeamGetPostToUpdate = async (req, res) => {

	let query =  {slug: req.params.slug, author: req.user._id };

	if(res.locals.team) {
		
		query = {
			slug: req.params.slug, 
			author: req.user._id, 
			team_id: res.locals.team._id
		}; 

	}

	const post = await Post.findOne(query).populate('author');

	if (!post) {

		res.redirect('/error'); 
		return;

	}

	res.render('dashboard/forum/edit.hbs', { 
		post,  
		csrfToken:`${req.csrfToken()}`
	});

};

// Verify Post

exports.verifyPost = async (req, res, next) => {

	const post = await Post.findOne({
		_id: req.body.id, 
		author: req.user._id 
	});

	if (!post) {

		res.redirect('/error'); 
		return;

	}

	next();

};

// Update Post

exports.updatePost = async (req, res) => {

    const post = await Post.findOneAndUpdate({
    _id: req.body.id,
    }, req.body, { 
    new: true, 
    runValidatos: true
    })
    .exec();

    req.flash('success', `Successfully updated ${post.title}`);

    res.redirect(`/forum/post/${post.slug}`);

};

// Update Team Post

exports.updatePostTeam = async (req, res) => {

	const post = await Post.findOneAndUpdate({
		_id: req.body.id,
    },
    req.body,
    { 
        new: true, 
        runValidatos: true 
    })
    .exec();

    req.flash('success', `Successfully updated ${post.title}`);
    
    res.redirect(`/dashboard/forum/post/${post.slug}`);

};

// Search Posts

exports.searchPost = async (req, res) => {
	
    const searchTerm = req.query.q;

	const posts = await Post.find({ 
		team_id:null, 
		$text: {
			$search: req.query.q,
		},
	}, 
    {
		score: { $meta: 'textScore' },
	})
    .sort({
		score: { $meta: 'textScore' },
	})
    .sort({
        created: -1 
    })
    .populate('author');

	res.render('forum/search.hbs', { 
        pageTitle: searchTerm, 
        posts 
    });
};

// Search Team Posts

exports.TeamSearchPost = async (req, res) => {

	const searchTerm = req.query.q;
	let query = null;

	if(res.locals.team) {
		query = res.locals.team._id;
	}
    
	const posts = await Post.find({ 
		team_id:query, 
		$text: {
		$search: req.query.q,
		},

	},
    {
	    score: { $meta: 'textScore' },
	})
    .sort({
		score: { $meta: 'textScore' },
	})
    .sort({
        created: -1 
    })
    .populate('author');

	res.render('dashboard/forum/search.hbs', { 
        pageTitle: searchTerm, 
        posts
    });
};