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

router.get(url + '/:username', function(req, res, next) {

    // user router's username to find a User , and find his company
    CompanyProfile.findOne({ username: req.params.username })
        .exec(function(err, company) {
            if (err) {
                next(new Error('CompanyProfile.findOne()'));

            } else if (company == null) {
                res.render('error', {
                    message: 'Can\'t find this user',
                    error: {}
                });

            } else {

                // res.json(company);
                res.render('company_profile', {
                    user: req.session.user,
                    company: company
                });
            }
        })
});

router.get(url + '/profile/edit', function(req, res) {
    var section = req.query.section;
    if (section === "detail") {
        res.render("company_profile_edit_detail", {
            user: req.session.user
        });

    } else if (section === "social") {
        res.render("company_profile_edit_social", {
            user: req.session.user
        });

    } else {
        res.render("company_profile_edit", {
            user: req.session.user
        });
    }
});

//  setting upload configs
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({ storage: storage }).single('uploadFile');

router.post(url + '/profile/edit', function(req, res, next) {
    console.log(__filename, req.get('Content-Type'));
    var resJson = { code: 200, data: {} };
    CompanyProfile.findOne({ username: req.session.user.custom._profile.username }, function(err, originCompany) {
        if (err) next(new Error('CompanyProfile.findOne()'));

        upload(req, res, (err) => {
            if (err) next(new Error('upload'));

            console.log(__filename, req.body);
            console.log(__filename, typeof req.body);

            if (req.file) {
                var fileType = ".jpg";
                if (req.file.mimetype === 'image/jpeg') {
                    fileType = '.jpg'
                } else if (req.file.mimetype === 'image/png') {
                    fileType = '.png'
                } else if (req.file.mimetype === 'image/gif') {
                    fileType = '.gif'
                } else {
                    resJson.code = 400;
                    resJson.errmsg = 'Can\'t recognize ' + req.file.originalname;
                    return res.json(resJson);
                }

                console.log(__filename, req.file);
                originCompany['pic'] = req.file.path;
            }

            console.log("before", originCompany)
                // update from req.body


            for (key in req.body) {
                // @To do: 統一上傳的格式,檔案或是其他input資料 都要統一
                // 狀況一：只有檔案
                // 狀況二：只有檔案之外的其他input
                // 狀況三：mixed

                if (key == 'links' || key == 'culture' || key == 'technology'|| key =='who_u_r') {
                    originCompany[key] = JSON.parse(req.body[key]);
                } else if (originCompany[key]) {
                    originCompany[key] = req.body[key];
                    // console.log('\n\noriginCompany[key]', JSON.parse(req.body[key]));
                }
                //判斷 key is object 
            }

            console.log("after", originCompany)

            CompanyProfile.update({ _id: originCompany._id }, originCompany, function(err, status) {
                if (err) next(new Error('CompanyProfile.update()'));
                // if change
                // { ok: 1, nModified: 1, n: 1 }
                // if not change
                // { ok: 0, n: 0, nModified: 0 }
                // get data but not change
                // { ok: 1, nModified: 0, n: 1 }
                resJson.data.company = status;
                req.session.user.custom._profile = originCompany;
                res.json(resJson);

            })
        })
    })
});

router.get(url, function(req, res) {
    CompanyProfile.find(function(err, companies) {
        res.render('companies', { companies: companies });
    })
});

module.exports = router;
