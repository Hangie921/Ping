//get the route,call the appropriate module to handle the route, 
//then receive the result returned from the module and finally,
//render the right page

var express = require('express');
var router = express.Router();
var session = require('express-session');

router.use(require('./login_router'));
router.use(require('./logout_router'));
router.use(require('./dashboard_router'));
router.use(require('./dashboard_router'));
router.use(require('./user_router'));
router.use(require('./test_router'));
router.use(require('./company_router'));
router.use(require('./talent_router'));


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(__filename, req.session.user);
    if (req.session.user) {
        res.redirect('/dashboard');
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
