
const mongoose = require('mongoose');
const logger = require('./../config/logger');
const { mongo, env } = require('./vars');
/*
// set mongoose Promise to Bluebird
mongoose.Promise = Promise;

// Exit application on error
mongoose.connection.on('error', (err) => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

// print mongoose logs in dev env
if (env === 'development') {
  mongoose.set('debug', true);
}

*/
/**
* Connect to mongo db
*
* @returns {object} Mongoose connection
* @public
*//*

exports.connect = () => {
  mongoose.connect(mongo.uri, {
    keepAlive: 1,
    useNewUrlParser: true,
  });
  return mongoose.connection;
};
*/

 //Configuring MONGO connection...
  var options = {
useNewUrlParser: true ,
   autoIndex: false, // Don't build indexes
   reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
   reconnectInterval: 500, // Reconnect every 500ms
   poolSize: 100, // Maintain up to 100 socket connections
   bufferMaxEntries: 0
 };

 var getRequestString = function(callback){

        console.log('Connecting with Local Mongo Db');
        var requestString = 'mongodb://0.0.0.0:27017/asahiGlass';
        callback(requestString);

 }



 exports.makeConnection = function(callback){
     console.log('Making mongo connection');
     getRequestString(function(requestString){
     console.log('request String: '+requestString);
        mongoose.connect(requestString, options, function(error,result) {
            if(error){
                console.log('MongoDB connection error : ');
               console.log(error);
            }else{
              console.log('MongoDB connected ');
              //console.log(result)
            }

        });
        callback(mongoose)
     })
 }


