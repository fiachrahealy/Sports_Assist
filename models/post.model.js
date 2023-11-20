const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const slug = require('slugs');
var date = new Date();

const postSchema = new mongoose.Schema({
    title: {
        type: String
    },
    slug: {
        type: String
    },
    content: {
        type: String
    },
    team_id: { 
        type: mongoose.Schema.ObjectId, 
        ref: 'Team'
    }, 
    tags: {
        type: Array
    },
    created: {
        type: String,
        default: date.toDateString()
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
});

postSchema.index({
    title: 'text',
    description: 'text',
});

postSchema.pre('save', async function (next) {

    if (!this.isModified('title')) {
        next();
        return;
    }

    this.slug = slug(this.title);
    const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
    const postWithSlug = await this.constructor.find({ slug: slugRegEx });

    if (postWithSlug.length) {
        this.slug = `${this.slug}-${postWithSlug.length + 1}`;
    }

    next();

});

postSchema.statics.getTagsList = function () {

    return this.aggregate([
    { 
        $unwind: '$tags' 
    },
    {
        $group: { 
            _id: '$tags', 
            count: { 
                $sum: 1 
            } 
        } 
    },
    { 
        $sort: { 
            count: -1 
        } 
    },
    ]);

};

postSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'article',
});

module.exports = mongoose.model('Post', postSchema);