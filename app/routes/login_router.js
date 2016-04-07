//get the route,call the appropriate module to handle the route, 
//then receive the result returned from the module and finally,
//render the right page

var express = require('express');
var router = express.Router();
var upload = require('multer')();
var user = require('../module/user.js');
var session = require('express-session');
// var userobj = require('../module/hr-sys/bean/users.js');
// var sessionManager = require('../module/hr-sys/interface/session.js');


process.on('uncaughtException', function(err) {
    console.info(err);
    console.error('Error caught in uncaughtException event:', err.Error);
    sessionManager.cleanSession(function (err,data) {});
});

/* GET users listing. */

router.post('/login', upload.single(), function(req, res, next) {

    // console.log(req.body.mem_acc); OOOO
    // console.log(req.body.mem_pwd); OOO
    var acc = req.body.mem_acc,
        pwd = req.body.mem_pwd;
    
    // var usrSearch = new userobj({
    //     system_parameter: 0,
    //     email: acc,
    //     pwd:pwd
    // });

    // sessionManager.login(usrSearch,function (err,data) {
    //     if(data[0]!== undefined){
    //         console.log("2345678",typeof data[0]);
    //         console.log(data[0].email);
    //         res.render('dashboard',data[0]);  
    //         // res.render('dashboard',{type:"talent"});
    //     }else{
    //         res.render('index',{title:"Ping",feedback_msg:"Cant find your email or password!"});
    //     }
        
    // });
    
    //攔截錯誤
    


    user.find(acc, pwd, function(status, user) {
        if (status) {
            //  If login success, save session in req, and direct to /dashboard
            req.session.user_acc = user.email;
            req.session.user_pwd = user.pwd;
            req.session.mem_type = user.mem_type
            res.render('dashboard',user);
        } else {
            console.log(status);
            console.log("sth happened");
            res.redirect('/');
        }

    });
    
});



module.exports = router;
