//get the route,call the appropriate module to handle the route, 
//then receive the result returned from the module and finally,
//render the right page

var express = require('express');
var router = express.Router();
var session = require('express-session');
var multer = require('multer');

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

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var fs = require('fs');
var dir = './uploads';

if (!fs.existsSync(dir)) {
    // fs.mkdirSync(dir);
}
var upload = multer({ storage: storage }).single('uploadFile');
router.post('/', function(req, res, next) {
	console.log(req.method);
    // var upload = multer({ dest: 'uploads/' })
    // router.put('/', upload.single('uploadFile'), function(req, res, next) {
    upload(req, res, (err) => {

        console.log("PUT: /");
        console.log(req.body);
        console.log(req.file);
        res.json("I am in");
    })
});

module.exports = router;
