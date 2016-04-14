//get the route,call the appropriate module to handle the route, 
//then receive the result returned from the module and finally,
//render the right page

var express = require('express');
var router = express.Router();
var session = require('express-session');

router.use(require('./login_router'));
router.use(require('./logout_router'));
router.use(require('./dashboard_router'));
router.use(require('./user_router'));
router.use(require('./find_talent_router'));
router.use(require('./result_talent_router'));
router.use(require('./find_project_router'));
router.use(require('./result_project_router'));
router.use(require('./test_router'));
router.use(require('./company_router'));

/* GET home page. */
router.get('/', function(req, res, next) {
    var error = "";
    var renderData = {
        title: 'Ping'
    }

    if (req.session.error) {
        renderData.error = req.session.error;
        delete req.session.error;
    }
    res.render('index', renderData);
});

module.exports = router;
