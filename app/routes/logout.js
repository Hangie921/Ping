//get the route,call the appropriate module to handle the route, 
//then receive the result returned from the module and finally,
//render the right page

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/logout', function(req, res, next) {
  res.render("index");
});

module.exports = router;