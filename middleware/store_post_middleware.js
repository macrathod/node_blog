module.exports = (req, res, next) => {
	console.log('middleware is working')
	if (!req.files || !req.body.user_name || !req.body.title || !req.body.description || !req.body.content) {
		return res.redirect('/post/new')
	}
	next()
}