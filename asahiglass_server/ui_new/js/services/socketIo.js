"use strict";
angular.module("app")
    .factory('socketIO', ['Config', '$window', function (Config, $window) {
        var cId = $window.sessionStorage.getItem('companyId');
        var uId = $window.sessionStorage.getItem('userId');
        // var socket = io(config.SOCKET_IO_HOST + '/',{secure:true});

        //  var socket = io('http://52.14.65.232:3000/',{secure:false});

        var socket = io(Config.socket_host, { secure: true });

        socket.on('connected', function () {

            socket.emit('register');
        });
        socket.on('connect', function () {
            var socketObj = {
                "cId": cId,
                "uId": uId
            };
            socket.emit('setUserId', socketObj);
        });

        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    console.log("event name" + eventName);
                    var args = arguments;
                    callback.apply(socket, args);
                });
            },
            
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    if (callback) {
                        callback.apply(socket, args);
                    }
                })
            }
        };
    }]);


