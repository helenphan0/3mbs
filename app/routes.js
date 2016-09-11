// app/routes.js

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var ytURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=35&';
ytURL += 'q=5-min+workout+easy&key=AIzaSyDnahmSz7sdcFj_jMe6pb-P5vPxdO9Me2A&r=json';


// load up models
var models = require('../app/models/user-model');

module.exports = function(app, passport, unirest) {


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
            user : req.user, // get the user of the session and pass to template
            video: '', 
            picture: ''
        });


        // ===================

        app.post('/addMind', function(req, res) {
                models.Mind.findOne({ activity: req.body.mindvalue}, function(err, mind) {

                    if (err) {
                        return res.status(500);
                    }

                    if (mind) {
                        console.log(req.body.mindvalue + ' already exists');
                        return res.status(200).json(null);
                    }

                    else {
                        var mind = new models.Mind();
                        mind.activity = req.body.mindvalue;
                        console.log(mind);
                        console.log('-------------');
                    }
        
                    mind.save(function(err) {
                            if (err) {
                                res.status(500);
                            }
                            console.log('saved activity: ' + mind);
                            return res.redirect('/main');
                        });
                });

        });

        // ===================

        app.post('/addBody', function(req, res) {
                models.Body.findOne({ activity: req.body.bodyvalue}, function(err, mind) {

                    if (err) {
                        return res.status(500);
                    }

                    if (body) {
                        console.log(req.body.bodyvalue + ' already exists');
                        return res.status(200).json(null);
                    }

                    else {
                        var body = new models.Body();
                        body.activity = req.body.bodyvalue;
                        console.log(body);
                        console.log('-------------');
                    }

                    body.save(function(err) {
                            if (err) {
                                res.status(500);
                            }
                            console.log('saved activity: ' + body);
                            return res.redirect('/main');
                        });
                });

        });
    
        // ===================

        app.post('/addSoul', function(req, res) {

                models.Soul.findOne({ activity: req.body.soulvalue}, function(err, mind) {

                    if (err) {
                        return res.status(500);
                    }

                    if (soul) {
                        console.log(req.body.soulvalue + ' already exists');
                        return res.status(200).json(null);
                    }

                    else {
                        var soul = new models.Soul();
                        soul.activity = req.body.soulvalue;
                        console.log(soul);
                        console.log('-------------');
                    }
                    
                    soul.save(function(err) {
                            if (err){
                                res.status(500);
                            }
                            console.log('saved activity: ' + soul);
                            return res.redirect('/main');
                        });
                });
        });


        // ======================================

         app.get('/main/youtube', function(req, res) {
            unirest.get(ytURL)
            .end(function(response) {
                if (response.ok) {
                    var x = getRandom(0, response.body.items.length);
                    console.log(x);
                    var item = response.body.items[x];
                    console.log(item);
                    res.render('main.ejs', {user: req.user, picture: '', video: item});
                    res.end();
                }
                else {
                    res.status(500);
                }
            }); 
         });

         // ======================================
        app.get('/nasa', function(req, res) {
            var url = "https://api.nasa.gov/planetary/apod?api_key=ul1h9pBDxKXZasQ7crI3gqduqlnms2VTs5w683FI";
            unirest.get(url)
                 .end(function(response) {
                    if (response.ok) {
                        var picture = response.body;
                        res.render('main.ejs', {user: req.user, picture: picture, video: ''});
                    }
                    else {
                        res.status(500);
                    }
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
/*



*/


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