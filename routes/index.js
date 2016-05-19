//get the route,call the appropriate module to handle the route, 
//then receive the result returned from the module and finally,
//render the right page

var express = require('express');
var router = express.Router();
var session = require('express-session');
var multer = require('multer');

// @Todo need add production setting
var ifDebug = true;

if (ifDebug) {
    router.use(require('./test_router'));
}

router.use(require('./auth_router'));
router.use(require('./search_router'));
router.use(require('./user_router'));
router.use(require('./company_router'));
router.use(require('./talent_router'));
router.use(require('./contact_router'));


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('pages/index');
});

// static partials jade for Angular.js
router.get('/partials/:name', function(req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
});

// static pages jade for Angular.js
router.get('/pages/:name', function(req, res) {
    var name = req.params.name;
    res.render('pages/' + name);
});

// static pages jade for Angular.js
router.get('/modules/:name', function(req, res) {
    var name = req.params.name;
    res.render('modules/' + name);
});

var fs = require('fs');
var dir = './uploads';

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}


module.exports = router;