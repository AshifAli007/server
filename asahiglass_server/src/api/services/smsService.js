var logger = require('./../../config/logger.js');
const request = require('request');
const SMS_API_KEY = "A13d8f1df3ce1ef7d6f73b4f6f623c7e1";
const SMS_AUTO_KEY = "V15ORM+O+jR";
const sender_id = "SKLBOX";
const db = require('../../config/mysql');
var dbFunc = require('../../config/mysql-function');
var errHandler = function(err) {
	logger.error('ErrorHandler: ', err);
}
function smsSender(messageBody){

   // var mobileNo = 9818022337;
   db.query(`select * from userInfo where companyId=5`, (err, rows, fields) => {
    if (err) {
        logger.error("Mysql error: ",err);
        dbFunc.connectionReleas;
        
    }else{
        var zoneName = messageBody.zoneName;
        var empname = messageBody.name;
        var msg = messageBody.msg;
        var type = messageBody.type;
        var time = messageBody.time;
        var mobileNo = rows[0].contactNo;
        var msgTmp;
        if(type === "Asset"){
             msgTmp = 'Asset rule violation Asset Name: '+empname+' Zone Name: '+zoneName+' Rule: '+msg+' on: '+time+'';
        }else{
             msgTmp = 'Zone rule violation Zone Name: '+zoneName+' Rule: '+msg+' on: '+time+'';
        }
        console.log("Msg tem: ", msgTmp);
         var url = "https://api-alerts.kaleyra.com/v4/?api_key="+SMS_API_KEY+"&method=sms&message="+encodeURIComponent(msgTmp)+"&to="+mobileNo+"&sender="+sender_id;
         console.log("Sms Url: ", url)
         request(url, function(err, res, body) {
             console.log("send sms body: ", body);
             console.log("send sms body err: ", err);
         });
    }
    });


}

module.exports = {
    smsSender:smsSender
}
