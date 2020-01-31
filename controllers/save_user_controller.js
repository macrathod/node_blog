const User = require('../database/models/User')

module.exports = (req, res) => {
	User.create(req.body, function (err, user) {
		console.log(err)
		return res.redirect('/')
	})
}