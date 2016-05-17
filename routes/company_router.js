// express
var express = require('express');
var router = express.Router();
var multer = require('multer');

// module
var CompanyProfile = require('../module/schema/profile.js').CompanyProfile;

// pinglib
var pinglib = require('pinglib');
var resCode = pinglib.response.codeEnum;
var PingUser = pinglib.User;
var UserService = pinglib.UserService;

// varaiables
var routerName = 'companies';
var url = '/' + routerName;
var urlApi = '/api' + url;

// @Todo 之後看是不是要放在更外層
router.get(url + '/*', function(req, res, next) {
    console.log(__filename, url + " middle");
    if (req.session.user == undefined) {
        return res.redirect('/login');
    }
    next();
});


// @Todo 之後看是不是要放在更外層
router.post(url + '/*', function(req, res, next) {
    console.log(__filename, url + " middle");
    if (req.session.user == undefined) {
        return res.json({ code: 200, errmsg: "no session.user" });
    }
    next();
});

router.get(url + '/:username', function(req, res, next) {

    // user router's username to find a User , and find his company
    CompanyProfile.findOne({ username: req.params.username })
        .exec(function(err, company) {
            if (err) {
                next(new Error('CompanyProfile.findOne()'));

            } else if (company === null) {
                res.render('pages/error', {
                    message: 'Can\'t find this user',
                    error: {}
                });

            } else {

                // res.json(company);
                res.render('pages/company_profile', {
                    user: req.session.user,
                    company: company
                });
            }
        });
});

router.get(url + '/profile/edit', function(req, res) {
    var section = req.query.section;
    if (section === "detail") {
        res.render("pages/company_profile_edit_detail", {
            user: req.session.user
        });

    } else if (section === "social") {
        res.render("pages/company_profile_edit_social", {
            user: req.session.user
        });

    } else {
        res.render("pages/company_profile_edit", {
            user: req.session.user
        });
    }
});

//  setting upload configs
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.mimetype.replace('image/', '.'));
    }
});
var upload = multer({ storage: storage }).fields([{
    name: 'pic',
    maxCount: 1
}, {
    name: 'cover_pic',
    maxCount: 1
}, {
    name: 'footer_pic',
    maxCount: 1
}]);

router.post(url + '/profile/edit', function(req, res, next) {
    console.log(__filename, req.get('Content-Type'));
    var resJson = { code: 200, data: {} };

    CompanyProfile.findOne({ username: req.session.user.custom._profile.username }, function(err, originCompany) {

        if (err) {
            // @todo add in logger
            console.log("in error CompanyProfile.findOne(): ", err);
            resJson.code = 400;
            resJson.errmsg = 'CompanyProfile.findOne() error';
            return res.json(resJson);
        }


        upload(req, res, (err) => {
            if (err) {
                // @todo add in logger
                console.log("in error upload: ", err);
                resJson.code = 400;
                resJson.errmsg = 'upload error';
                return res.json(resJson);
            }
            console.log(__filename, req.body);
            console.log(__filename, typeof req.body);

            for (var key in req.files) {
                if (req.files[key][0]) {
                    var fileType = ".jpg";
                    if (req.files[key][0].mimetype === 'image/jpeg') {
                        fileType = '.jpeg';
                    } else if (req.files[key][0].mimetype === 'image/png') {
                        fileType = '.png';
                    } else if (req.files[key][0].mimetype === 'image/gif') {
                        fileType = '.gif';
                    } else {
                        resJson.code = 400;
                        resJson.errmsg = 'Can\'t recognize ' + req.files[key][0].originalname;
                        return res.json(resJson);
                    }
                    console.log(__filename, req.files[key][0]);
                    originCompany[key] = '/' + req.files[key][0].path;
                }
            }


            // console.log("before", originCompany)

            // update from req.body
            for (var key in req.body) {

                // @To do: 統一上傳的格式,檔案或是其他input資料 都要統一
                // 狀況一：只有檔案
                // 狀況二：只有檔案之外的其他input
                // 狀況三：mixed

                if (key == 'links' || key == 'culture' || key == 'technology' || key == 'who_u_r' || key == 'what_u_do') {
                    console.log(key, ': ', req.body[key]);
                    originCompany[key] = JSON.parse(req.body[key]);
                } else {
                    console.log(key, 'no json: ', req.body[key]);
                    originCompany[key] = req.body[key];
                }



                //判斷 key is object 
            }

            console.log("after", originCompany);

            CompanyProfile.update({ _id: originCompany._id }, originCompany, function(err, status) {
                console.log("in update");
                if (err) {
                    // @todo add in logger
                    console.log("in error CompanyProfile.update ", err);
                    resJson.code = 400;
                    resJson.errmsg = 'CompanyProfile.update error';
                    return res.json(resJson);
                }
                // if change
                // { ok: 1, nModified: 1, n: 1 }
                // if not change
                // { ok: 0, n: 0, nModified: 0 }
                // get data but not change
                // { ok: 1, nModified: 0, n: 1 }
                resJson.data.company = status;
                req.session.user.custom._profile = originCompany;
                console.log("send json");
                res.json(resJson);

            });
        });
    });
});

router.get(url, function(req, res) {
    CompanyProfile.find(function(err, companies) {
        res.render('pages/companies', { companies: companies });
    });
});

module.exports = router;
