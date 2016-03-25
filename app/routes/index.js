//get the route,call the appropriate module to handle the route, 
//then receive the result returned from the module and finally,
//render the right page


var express = require('express');
var router = express.Router();

router.use(require('./login_router'));
router.use(require('./logout_router'));
router.use(require('./dashboard_router'));
router.use(require('./find_talent_router'));

// router.use('/dashboard',require('./dashboard_router'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ping' });
});

var user = require('../module/user.js');
router.get('/users', function(req, res, next) {
    user.findUsers(function(status, users) {
        res.render('users', { member: users });
        console.log("status ", status);

    });
});


module.exports = router;
