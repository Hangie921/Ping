var express = require('express');
var router = express.Router();
var session = require('express-session');

// @Todo need add production setting
var ifDebug = true;

if (ifDebug) {
    router.use(require('./test_router'));
}

router.all('/api/search*', function(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        console.log(__filename, "search middle");
        return res.json({ code: 401, errmsg: "no session.user" });
    }
});

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
