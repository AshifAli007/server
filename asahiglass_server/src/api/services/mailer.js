var logger = require('./../../config/logger.js');
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');
var path = require('path');
const db = require('../../config/mysql');
var dbFunc = require('../../config/mysql-function');
var errHandler = function(err) {
	logger.error('ErrorHandler: ', err);
}
var readHTMLFile = function(path, callback) {
 fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
 if (err) {
 throw err;
 callback(err);
 }
 else {
 callback(null, html);
 }
 });
};


smtpTransport = nodemailer.createTransport(smtpTransport({
 host: 'smtp.gmail.com',
 port: 465,
 secure: true,
 auth: {
    user: "mushirahmed22@gmail.com",
    pass: "mushir@0511"
 }
}));

function mail(messageBody){
    console.log("Message Body: ", JSON.stringify(messageBody));
   // console.log("Email path: ", __dirname + '../email_tpl/reg.html');

   db.query(`select * from userInfo where companyId=5`, (err, rows, fields) => {
    if (err) {
        logger.error("Mysql error: ",err);
        dbFunc.connectionReleas;
        
    }else{
        logger.debug("Company data: ", JSON.stringify(rows));

        readHTMLFile(path.resolve(__dirname + '/../email_tpl/reg.html'), function(err, html) {
            var template = handlebars.compile(html);
            var replacements = {
                user: messageBody.name,
                rule: messageBody.msg,
                time: messageBody.time,
                zonename:messageBody.zoneName,
                type: messageBody.type
            };
            var htmlToSend = template(replacements);
            var mailOptions = {
                from: 'mushirahmed22@gmail.com',
                to : rows[0].email,
                //to: 'harinderj@gmail.com',
                subject : 'Rule Broken',
                html : htmlToSend
            };
            smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
        //        callback(error);
            }
            });
            });
    }
    });


}
module.exports = {
 mail:mail
}
