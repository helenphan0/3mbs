// app/routes.js

// load up models
var models = require('../app/models/user-model');

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var ytURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=35&';
ytURL += 'q=5-min+workout+easy&key=AIzaSyDnahmSz7sdcFj_jMe6pb-P5vPxdO9Me2A&r=json';

function todayIs() {
  var month = new Date().getMonth() + 1;
  var day = new Date().getDate();
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  var year = new Date().getFullYear();
  var date = month + "-" + day + "-" + year;
  return date;
};

function Completions(day) {
    this.day = day;
    this.Mind = [ 0, 0, 0],
    this.Body = [ 0, 0, 0],
    this.Soul = [ 0, 0, 0],
    this.mtotal = '',
    this.btotal = '',
    this.stotal = ''
}; 

var todayDate;
var daily;

var createDaily = function() {
    var dailies = new models.Dailies();
    dailies.day = todayDate;

    models.Mind.random(function(err, mind) {
        var mind1 = mind;
        dailies.MindActivities.push(mind1.activity);
        models.Mind.random(function(err, mind) {
            var mind2 = mind;
            if ( dailies.MindActivities[0] == mind2.activity) {
                models.Mind.random(function(err, mind) {
                    console.log('another mind option: ' + mind);
                    mind2 = mind;
                    dailies.MindActivities.push(mind2.activity);
                });
            }
            else {
                dailies.MindActivities.push(mind2.activity);
            }
            console.log(dailies.MindActivities[0]);
            console.log(dailies.MindActivities[1]);
        });

        models.Body.random(function(err, body) {
            var body1 = body;
            dailies.BodyActivities.push(body1.activity);
            models.Body.random(function(err, body) {
                var body2 = body;
                if ( dailies.BodyActivities[0] == body2.activity) {
                    models.Body.random(function(err, body) {
                        console.log('another body option: ' + body);
                        body2 = body;
                        dailies.BodyActivities.push(body2.activity);
                    });
                }
                else {
                    dailies.BodyActivities.push(body2.activity);
                }
                console.log(dailies.BodyActivities[0]);
                console.log(dailies.BodyActivities[1]);
            });

            models.Soul.random(function(err, soul) {
                var soul1 = soul;
                dailies.SoulActivities.push(soul1.activity);
                models.Soul.random(function(err, soul) {
                    var soul2 = soul;
                    if ( dailies.SoulActivities[0] == soul2.activity) {
                        models.Soul.random(function(err, soul) {
                            console.log('another soul option: ' + soul);
                            var soul3 = soul;
                        });
                        dailies.SoulActivities.push(soul3.activity);
                    }
                    else {
                        dailies.SoulActivities.push(soul2.activity);
                    }
                    console.log(dailies.SoulActivities[0]);
                    console.log(dailies.SoulActivities[1]);

                    dailies.save(function(err) {
                        if (err) {
                            res.status(500);
                        }
                        console.log(todayDate + "'s daily saved: ");
                        console.log('-------------------------------')
                        console.log(dailies);
                        daily = dailies;
                        return daily;
                    });
                }); 
            }); 
        }); 
    });
};


module.exports = function(app, passport, unirest) { 
    todayDate = todayIs();

    models.Dailies.findOne({day: todayDate}, function(err, dailies) {
        if (err) {
            return res.status(500);
        }

        if (!dailies) {
            console.log('------ new daily generated ------');
            daily = createDaily();
        }

        else {
            daily = dailies;

        }
//    console.log(daily);    
    return daily;
    });


    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
       res.render('index.ejs', { message: req.flash('signupMessage') } ); 
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
   
        var completed = new Completions(todayDate);
        console.log('---------  the dailies for today ----------');
        console.log(daily);
        console.log('---------  --------------------- ----------');

    //  for new users, create a daily record for today
    //  for existing user, check if most recent daily is today's, 
    //  if not, add today's daily to their record
        if (req.user.completion.length == 0 || req.user.completion[0].day != todayDate) {
            req.user.completion.unshift(completed);
        }

        req.user.save(function(err) {
            if (err){
                res.status(500);
            }
            console.log('user saved, view their daily');
            console.log(req.user.completion[0]);
            return;
        });

        res.render('main.ejs', {
            user : req.user, 
            video: '', 
            picture: '',
            completed: completed,
            dailies: daily
        });


     //   user activity completions are tracked and saved here

        app.post('/mindComplete', function(req, res) {
            req.user.completion[0].mtotal += 1;
            req.user.completion[0].Mind[req.body.index] = req.body.activity;
        
            console.log('mind activity update successful');
            console.log(req.user.completion[0].Mind);
            req.user.markModified('completion');
       
            req.user.save(function(err) {
                if (err) {
                    res.status(500);
                }
                console.log('user mind activity updated');
                console.log(req.user.completion[0].Mind);
                return res.json(req.user).end();
            });  
        });

        app.post('/bodyComplete', function(req, res) {
            console.log(req.body);
            req.user.completion[0].btotal += 1;
            req.user.completion[0].Body[req.body.index] = req.body.activity;
                
            console.log('body activity update successful');
            console.log(req.user.completion[0].Body);
            req.user.markModified('completion');
       
            req.user.save(function(err) {
                if (err) {
                    res.status(500);
                }
                console.log('user body activity updated');
                return res.json(req.user).end();
            });  
        });

        app.post('/soulComplete', function(req, res) {
            req.user.completion[0].stotal += 1;
            req.user.completion[0].Soul[req.body.index] = req.body.activity;
                
            console.log('soul activity update successful');
            console.log(req.user.completion[0].Soul);
            req.user.markModified('completion');
       
            req.user.save(function(err) {
                if (err) {
                    res.status(500);
                }
                console.log('user soul activity updated');
                return res.json(req.user).end();
            });
        });
      

        //  user created activities are saved here
        //  daily activities will pull from same collection

        // ===================
        app.post('/addMind', function(req, res) {
            models.Mind.findOne({ activity: req.body.mindvalue}, function(err, mind) {

                if (err) {
                    return res.status(500);
                }

                if (req.body.mindvalue == '') {
                    return false;
                }

                if (mind) {
                    console.log(mind.activity + ' already exists');
                    return res.status(200).json(null);
                }

                else {
                    var mind = new models.Mind();
                    mind.activity = req.body.mindvalue;
                }
    
                mind.save(function(err) {
                    if (err) {
                        res.status(500);
                    }
                    console.log('saved activity for mind: ' + mind.activity);
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

                if (req.body.bodyvalue == '') {
                    return false;
                }

                if (body) {
                    console.log(body.activity + ' already exists');
                    return res.status(200).json(null);
                }

                else {
                    var body = new models.Body();
                    body.activity = req.body.bodyvalue;
                }

                body.save(function(err) {
                    if (err) {
                        res.status(500);
                    }
                    console.log('saved activity for body: ' + body.activity);
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

                if (req.body.soulvalue == '') {
                    return false;
                }

                if (soul) {
                    console.log(soul.activity + ' already exists');
                    return res.status(200).json(null);
                }

                else {
                    var soul = new models.Soul();
                    soul.activity = req.body.soulvalue;
                }
                
                soul.save(function(err) {
                    if (err){
                        res.status(500);
                    }
                    console.log('saved activity for soul: ' + soul.activity);
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
                    res.render('youtube.ejs', {user: req.user, picture: '', video: item, completed: completed, dailies: daily});
                }
                else {
                    res.status(500);
                }
            }); 

            app.get('/return', function(req, res){
                req.user.completion[0].btotal += 1;
                req.user.completion[0].Body[2] = "Do a 5-minute workout";
                req.user.markModified('completion');

                req.user.save(function(err) {
                    console.log('user saved after youtube vid');
                    res.redirect('/main');
                });
            });
        });

        // ======================================
        app.get('/main/nasa', function(req, res) {
            var url = "https://api.nasa.gov/planetary/apod?api_key=ul1h9pBDxKXZasQ7crI3gqduqlnms2VTs5w683FI";
            unirest.get(url)
                 .end(function(response) {
                    if (response.ok) {
                        var picture = response.body;
                        res.render('nasa.ejs', {user: req.user, picture: picture, video: '', completed: completed, dailies: daily});
                    }
                    else {
                        res.status(500);
                    }
                });
            app.get('/back', function(req, res){
                req.user.completion[0].mtotal += 1;
                req.user.completion[0].Mind[2] = "Check out NASA's photo of the day";
                req.user.markModified('completion');

                req.user.save(function(err) {
                    console.log('user saved after nasa picture');
                    res.redirect('/main');
                });

            });
        });
    

    });
    
    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    // add permissions to scope array for additional fields
    // 'public_profile' SHOULD be added to the scope, contrary to facebook developer documentation
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email', 'public_profile', 'publish_actions'] }));

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