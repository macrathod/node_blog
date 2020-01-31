module.exports = (req, res, next) => {
	if (!req.body.user_name || !req.body.email || !req.body.password) {
		console.log('User Middleware')
		return res.redirect('/auth/register')
	}
	next()
}