// app/routes.js

function randomDate(){
   var startDate = new Date(2014,1,1).getTime();
   var endDate =  new Date().getTime();
   var spaces = (endDate - startDate);
   var timestamp = Math.round(Math.random() * spaces);
   timestamp += startDate;
   return new Date(timestamp);
};

function formatDate(date){
    var month = randomDate().getMonth();
    var day = randomDate().getDate();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return String(date.getFullYear()) + '-' + month + '-' + day;
};

// load up models
// var User = require('../app/models/user-model');
var models = require('../app/models/user-model');

module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
       res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);

     // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/main', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('index.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

      app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/main', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/main', isLoggedIn, function(req, res) {
        res.render('main.ejs', {
            user : req.user // get the user out of session and pass to template
        });


        // ===================
        app.post('/addMind', function(req, res) {
                models.Mind.findOne({ activity: req.body.mindvalue}, function(err, mind) {

                    if (err) {
                        console.log(req.body.mindvalue + ' already exists');
                        return res.status(500);
                    }

                    if (mind) {
                        return res.status(200).json(null);
                    }

                    else {
                        var mind = new models.Mind();
                        mind.activity = req.body.mindvalue;
                        console.log(mind);
                        console.log('-------------');
                    }
        
                    mind.save(function(err) {
                            if (err)
                                res.status(500);
                            return res.render('main.ejs');
                        });
                });

        });

        // ===================

        app.post('/addBody', function(req, res) {
                models.Body.findOne({ activity: req.body.bodyvalue}, function(err, mind) {

                    if (err) {
                        console.log(req.body.bodyvalue + ' already exists');
                        return res.status(500);
                    }

                    if (body) {
                        return res.status(200).json(null);
                    }

                    else {
                        var body = new models.Body();
                        body.activity = req.body.bodyvalue;
                        console.log(body);
                        console.log('-------------');
                    }

                    body.save(function(err) {
                            if (err)
                                res.status(500);
                            return res.render('main.ejs');
                        });
                });

        });
    
        // ===================

        app.post('/addSoul', function(req, res) {

                models.Soul.findOne({ activity: req.body.soulvalue}, function(err, mind) {

                    if (err) {
                        console.log(req.body.soulvalue + ' already exists');
                        return res.status(500);
                    }

                    if (soul) {
                        return res.status(200).json(null);
                    }

                    else {
                        var soul = new models.Soul();
                        soul.activity = req.body.soulvalue;
                        console.log(soul);
                        console.log('-------------');
                    }
                    
                    soul.save(function(err) {
                            if (err)
                                res.status(500);
                            return res.render('main.ejs');
                        });
                });
        });


    });
    
    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/main',
            failureRedirect : '/'
        }));

     // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/main',
                    failureRedirect : '/'
            }));


// ==========================

app.get('/addMind', function (req, res) {
    console.log('get: ' + req.body);
    // res.render('main.ejs', { }
});




// ======================================
    app.get('/nasa', function(req, res) {
        var date = formatDate(randomDate());
        var url = "https://api.nasa.gov/planetary/apod?api_key=ul1h9pBDxKXZasQ7crI3gqduqlnms2VTs5w683FI&date=" + date;
        $(document).ajax({
             url: url,
             success: function(result) {
                res.render('main.ejs', result)
                console.log(result);
                
            }
        });

    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}