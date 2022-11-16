const db = require('./config/database')

const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const flash = require('express-flash')
const session = require('express-session')

const passport = require('passport')
const passportSetup = require('./config/passport-setup')

const resturantSetup = require("./seed/resturant.seeder")

PORT = 3000

app.use(express.static('node_modules'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(session({
    secret: 'A21E14d4_g1fdz55415_6ZRT41641ZE_561erf1e_2g1fg1fg0_e',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60000 * 20}
}))


app.use(passport.initialize())
app.use(passport.session())

/**
* configuration for flash.
*/
app.use(flash())



/**
* Route for Home Page
*/
app.get('/', (req,res)=> {
    res.sendFile('index.html',{ root: __dirname });
 })

/**
* this config for user route
*/
const users = require('./routes/user.routes')
app.use('/user', users)

/**
* this config for resturant route
*/
const resturants = require('./routes/resturant.routes')
app.use('/resturants', resturants)


/**
* The 404 route page
*/
app.get('*', function(req, res){
    res.status(404).redirect('/');
});

/**
* listen to port
*/
app.listen(PORT, ()=> {
    console.log('this application is wokring on port ' + PORT)
})