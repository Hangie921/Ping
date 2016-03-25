//get the route,call the appropriate module to handle the route, 
//then receive the result returned from the module and finally,
//render the right page


var express = require('express');
var router = express.Router();

router.use(require('./login_router'));
router.use(require('./logout_router'));
router.use(require('./dashboard_router'));
router.use(require('./find_talent_router'));
router.use(require('./user_router.js'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ping' });
});

router.get('/users', function(req, res, next) {
});


module.exports = router;
