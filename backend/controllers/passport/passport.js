
const validator = require('validator');

const  { User }  = require('../models/User/User');
const LocalStrategy = require('passport-local').Strategy;



const _localauth  = (passport) =>{
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });


        // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        reset_passwordField: 'reset_password',
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function (req, email, password, done) {
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(function () {
            User.findOne({
                'local.email': email
            }, function (err, user) {
               
                // if there are any errors, return the error
                if (err)
                    return done(err);
               
                // if no user is found, return the message
                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'User Not found.'));
                } else if (!user.validPassword(password)) {
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                } else if (user.local.lock_user === "true") {
                    return done(null, false, req.flash('loginMessage', 'Oops! User is Locked Pls contect Admin'));
                } else if (user.local.reset_password === "true") {
                    return done(null, user);
                }


                // all is well, return user
                else {
                    console.log(`${user.local.email} login`)
                    return done(null, user);
                }
            });
        });

    }));

// =========================================================================
// LOCAL SIGNUP ============================================================
// =========================================================================
passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        nameField: 'username',
        telFiled: 'tel',
        levelFiled: 'level',
        rest_passwordFild: 'rest_password',
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function (req, email, password, done) {
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
        // asynchronous
        process.nextTick(function () {
            // if the user is not already logged in:

            if (validator.isEmail(email) === false) {
                return done(null, false, req.flash('signupMessage', 'Oops! Wrong Email or Password'));
            } else if (validator.isEmail(email) === false) {
                return done(null, false, req.flash('signupMessage', 'Email is locked Please contact Admin '));
            } else {
                User.findOne({
                    'local.email': email
                }, function (err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {

                        // create the user
                        var newUser = new User();
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.local.username = req.body.username;
                        newUser.local.tel = req.body.tel;
                        newUser.local.level = req.body.level;
                        newUser.local.lock_user = "false";
                        newUser.local.reset_password = "false";

                        newUser.save(function (err) {
                            if (err)
                                return done(err);

                            return done(null, newUser);
                        });
                    }

                });
            } 

        });

    }));

}

module.exports  ={
     localauth : _localauth
}