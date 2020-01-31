const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
	user_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
})

userSchema.pre('save', function (next) {
	const user = this
	bcrypt.hash(user.password, 10, function (err, encrtypted) {
		user.password = encrtypted
		next()
	})
})

module.exports = mongoose.model('User', userSchema)