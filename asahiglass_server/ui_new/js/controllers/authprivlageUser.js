'use strict';

/* Controllers */

angular.module('app')
    // Chart controller
    .controller('PrivlageAuthCtrl', ['$scope',  '$rootScope', '$http','sessionInjector', 'Config', '$timeout','$location', '$window', 'toaster',
    function($scope,  $rootScope, $http, sessionInjector, config, $timeout, $location, $window, toaster) {

      $scope.authLogin = function(user){
          
            var authData = {
                           "email": user.username,
                           "password": user.password
                           };
                $http.post(config.host + '/privilegeUser/login', authData)
                 .then(function (res) {
                  
                if(res.data.success == true){

                    $window.sessionStorage.setItem('token', res.data.data.token);
                    $window.sessionStorage.setItem('userId', res.data.data.id);
                    $window.sessionStorage.setItem('user_type', res.data.data.userType);
                    $window.sessionStorage.setItem('user_name', res.data.data.name);
                    $window.sessionStorage.setItem("isPrivlage", true);

                    $location.url('/app/companyconfig');
                }else{
                    
                    var msg = res.data.message; 
                        toaster.pop({
                            type: 'error',
                            body: msg,
                            timeout: 3000
                        });
                }
                    
                });
       }

    }]);
