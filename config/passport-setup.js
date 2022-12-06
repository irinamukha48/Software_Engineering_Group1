const User = require('../models/User')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy

/**
* passport serializeUser
*/
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

/**
* passport deserializeUser
*/
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
});

/**
* register user using passport
*/
passport.use('register', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req,email,password, done)=> {
    //if (req.body.password != req.body.confirm_password) {
    //    return done(null, false, req.flash('error', 'Passwords do not match'))
    //}
    //else {
        // find user by email
        User.findOne({email: email}, (err,user)=> {
            if(err) {
                return done(err)
            }
            if(user) {
                console.log("Email already exists")
                return done(null,false,{message:'Email already exists'})
                //return done(null,false,req.flash('error','Email already exists'))
            }
            if (!user) {
                // create new User object
                
                let newUser = new User()
                //newUser.first_name = req.body.firstname
                //newUser.last_name = req.body.lastname
                //newUser.phone = req.body.phone
                newUser.email    = req.body.email
                newUser.password = newUser.generateEncryptedPassword(req.body.password)
                newUser.deliveryAddress  = req.body.address
                newUser.username = req.body.username
                newUser.vendor   = req.body.vendor
                newUser.name     = req.body.name
                //newUser.avatar = "profile.png"
                //newUser.role = req.body.role
                newUser.created_at = Date.now()
                newUser.save ((err,user)=> {
                    if(!err) {
                        console.log('New User Added')
                    } else {
                        console.log(err)
                    }
                })

                return done(null,newUser);
            }
        })
    //}
}))


/**
* login strategy using passport
*/
passport.use('login', new localStrategy({
    usernameField : 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req,email,password, done)=> {

    // find user by email
    User.findOne({email: email}, (err,user)=> {

        if (err) {
            return done(err)
        }
        if(!user) {
            // return the wrong user back

            let wrongUser = new User();
            //newUser.first_name = req.body.firstname
            //newUser.last_name = req.body.lastname
            //newUser.phone = req.body.phone
            wrongUser.email = req.body.email;
            wrongUser.password = wrongUser.generateEncryptedPassword(req.body.password);
            //newUser.avatar = "profile.png"
            //newUser.role = req.body.role
            wrongUser.created_at = Date.now();

            console.log("User Not Found");
            return done(null, false,{message:"This User Does not Exist"});
            //return done(null, wrongUser, req.flash('error', 'user not found'))
        }
        if (user) {
            // compare password
            if (user.validatePassword(password, user.password)) {
                console.log("Logged In");
                return done(null,user, req.flash('success', 'Welcome Back ' + user.email));

            } else {
                console.log("Incorrect password");
                //return done(null, false,{message:"Wrong Password"});
                return done(null,false, req.flash('error', 'please check your password'))

            }
        }
    })
}))
