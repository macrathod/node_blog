const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		require: true
	},
	title: String,
	description: String,
	content: String,
	image: String,
	created_at: {
		type: Date,
		default: new Date()
	}
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;