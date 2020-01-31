const Post = require('../database/models/Post')
module.exports = async (req, res) => {
	posts = await Post.find({}).populate('author')
	res.render('index', {
		posts: posts
	})
}