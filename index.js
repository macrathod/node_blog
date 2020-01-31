const express = require('express')
const edge = require('edge.js')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const session = require('express-session')
const connectMongo = require('connect-mongo')
const connectFlash = require('connect-flash')
const cloudinary = require('cloudinary')

const PostController = require('./controllers/create_post')
const homepageController = require('./controllers/homepage_controller')
const savePostController = require('./controllers/save_post_controller')
const viewPostController = require('./controllers/view_post_controller')
const registerController = require('./controllers/register_controller')
const saveUserController = require('./controllers/save_user_controller')
const loginController = require('./controllers/login_controller')
const loginUserController = require('./controllers/login_user_controller')
const logoutController = require('./controllers/logout_controller')

const storePost = require('./middleware/store_post_middleware')
const saveUser = require('./middleware/save_user_middleware')
const auth = require('./middleware/auth_middleware')
const isLoggedIn = require('./middleware/redirect_if_authenticated_middleware')

const { config, engine } = require('express-edge')
const app = new express()

mongoose.connect('mongodb://localhost/node_blog', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
})

const mongoStore = connectMongo(session)


app.use(fileUpload())
app.use(express.static('public'))
app.use(engine)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
	secret: 'secret',
	store: new mongoStore({
		mongooseConnection: mongoose.connection
	})
}))
app.use('*', (req, res, next) => {
	edge.global('auth', req.session.user_id)
	next()
})
app.use(connectFlash())

cloudinary.config({
	api_key: '867823998822749',
	api_secret: 'lBYmdJPfzEi1nByYiE9BrKtqcDk',
	cloud_name: 'db4dwaubq'
})

app.set('views', `${__dirname}/views`)

app.get('/', homepageController)
app.get('/post/new', auth, PostController)
app.post('/post/save', auth, storePost, savePostController)
app.get('/post/:id', viewPostController)
app.get('/auth/register', isLoggedIn, registerController)
app.post('/users/save', saveUser, saveUserController)
app.get('/auth/login', isLoggedIn, loginController)
app.post('/users/login', loginUserController)
app.get('/auth/logout', auth, logoutController)
app.use((req, res) => res.render('404'))

app.listen(4000, () => {
	console.log('app listening 4k')
})