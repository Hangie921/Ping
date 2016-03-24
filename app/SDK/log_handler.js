//This is the log module that log basic info , debug and error information
//to the file that is set in the error_handler_config.json
var path = require("path");
var log4js = require('log4js');
var dir_path = path.dirname(path.dirname(process.argv[1]));
console.log(dir_path);
log4js.configure({
  "appenders":[
    {
      "type":"file",
      "filename": path.join(dir_path,"FrontEnd","logs","info.log"),
      "maxLogSize": 20480,
      "backups": 3,
      "category": "info"
    },
    {
      "type":"file",
      "filename": path.join(dir_path,"FrontEnd","logs","debug.log"),
      "maxLogSize": 20480,
      "backups": 3,
      "category": "debug"
    },
    {
      "type": "logLevelFilter",
          "level": "ERROR",
          "appender": {
            "type": "file",
            "filename": path.join(dir_path,"FrontEnd","logs","errors.log")
          }
    }
  ]
});





function logInfo(msg){
	var logger = log4js.getLogger('info');
	logger.info(msg);
}
function logDebug(msg){
	var logger = log4js.getLogger('debug');
	logger.setLevel('info');   //cancel this line would start to log the debug msg
	logger.debug(msg);
}

function logError(msg){
	var logger = log4js.getLogger('error');
	logger.error(msg);
	
}

exports.info = logInfo;
exports.debug = logDebug;
exports.error = logError;
