//get the route,call the appropriate module to handle the route, 
//then receive the result returned from the module and finally,
//render the right page


var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
