'use strict';


/* Controllers */

angular.module('app')
    // Chart controller
    .controller('controlroom', ['$scope', 'md5', 'socketIO', '$sce',  '$compile', '$rootScope', '$http', 'sessionInjector', 'Config', '$timeout', '$location', '$window', 
        function($scope, md5, socketIO, $sce,  $compile, $rootScope, $http, sessionInjector, config, $timeout, $location, $window) {
            var controllRoom = function(){
                $http.get(config.host + '/controlroom')
                .then(function(res) {
                    console.log("Res from controll room: " , JSON.stringify(res.data.items));
                    if(res.data.success === true){
                        $scope.datas = res.data.items;
                    }
                   
                });
            };
            controllRoom();




            socketIO.on('dashboard', function(data) {
                console.log("Dashboard socket data: " + JSON.stringify(data))
                controllRoom();
            });

            socketIO.on('controlroom', function(data) {
                console.log("controlroom from socket" + JSON.stringify(data));
                controllRoom();

                    swal(data.zoneName+" !", data.message, "warning");
                    setTimeout(function(){
                        swal.close();
                    }, 3000);
                



            });

  

        }
    ]);

