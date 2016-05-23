var list = {
    Unknown_Error: {
        code: 999,
        errmsg: "Unknown Error"
    },
    OK: {
        code: 200,
        msg: "OK"
    },
    Bad_Request: {
        code: 400,
        errmsg: "Bad Request"
    },
    Unauthorized: {
        code: 401,
        errmsg: "Unauthorized"
    },
    Not_Found: {
        code: 404,
        errmsg: "Not Found"
    },
    Already_Exists: {
        code: 601,
        errmsg: "Already Exists"
    },
    Password_Error: {
        code: 602,
        errmsg: "Password Error"
    },
    No_Results: {
        code: 603,
        errmsg: "No Results"
    },
    Internal_Error: {
        code: 500,
        errmsg: "Internal Error"
    }
};


var code = {};
code.OK = function(data) {
    var resData = data || "";
    return { code: 200, data: resData };
};

// var resCode = require('../module/utils/response.js');
module.exports = code;
