const User = require('../database/models/User')
module.exports = (req, res, next) => {
	User.findById(req.session.user_id, (err, user) => {
		if (err || !user) {
			console.log(err)
			return res.redirect('/')
		}
	})
	next()
}