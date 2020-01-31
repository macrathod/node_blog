const path = require('path')
const Post = require('../database/models/Post')
const Cloudinary = require('cloudinary')

module.exports = (req, res) => {
	const { image } = req.files

	const upload_path = path.resolve(__dirname, '..', 'public/posts', image.name);

	image.mv(upload_path, (err) => {
		Cloudinary.v2.uploader.upload(upload_path, (err, result) => {
			if (err) {
				return res.redirect('/')
			}
			Post.create({
				...req.body,
				image: result.secure_url,
				author: req.session.user_id
			}, (err, post) => {
				res.redirect('/')
			})
		})
	})
}