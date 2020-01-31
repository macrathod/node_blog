const path = require('path')
const Post = require('../database/models/Post')
module.exports = (req, res) => {
	const { image } = req.files

	image.mv(path.resolve(__dirname, '..', 'public/posts', image.name), (err) => {
		Post.create({
			...req.body,
			image: `/posts/${image.name}`,
			author: req.session.user_id
		}, (err, post) => {
			res.redirect('/')
		})
	})
}