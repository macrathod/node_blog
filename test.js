const mongoose = require('mongoose');

const Post = require('./database/models/Post');

mongoose.connect('mongodb://localhost/node_blog_test');

Post.findByIdAndUpdate('5e1317f56967393d444dea80', {
	title: '123123'
}, (err, res) => {
	console.log(err, res);
});

// Post.findById('5e1317f56967393d444dea80', (error, post) => {
// 	console.log(error, post);
// });

// Post.find({
// 	// title: 'Some title'
// }, (error, posts) => {
// 	console.log(error, posts);
// });

// Post.create({
// 	title: 'Some title',
// 	description: 'some desc',
// 	content: 'some content'
// }, (error, post) => {
// 	console.log(error, post);
// });