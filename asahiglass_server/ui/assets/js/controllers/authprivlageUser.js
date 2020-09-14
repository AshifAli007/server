'use strict';

/* Controllers */

angular.module('app')
    // Chart controller
    .controller('PrivlageAuthCtrl', ['$scope', 'md5', '$rootScope', '$http','sessionInjector', 'Config', '$timeout','$location', '$window',
    function($scope, md5, $rootScope, $http, sessionInjector, config, $timeout, $location, $window) {

      $scope.authLogin = function(user){
          
            var authData = {
                           "email": user.username,
                           "password": user.password
                           };
                $http.post(config.host + '/privilegeUser/login', authData)
                 .then(function (res) {
                    alert("responce: " + JSON.stringify(res.data));
                if(res.data.data.success == true){
                    $window.sessionStorage.setItem('token', res.data.accessToken);
                    $window.sessionStorage.setItem('userId', res.data.data.id);
                    $window.sessionStorage.setItem('user_type', res.data.data.userType);
                    $window.sessionStorage.setItem('user_name', res.data.data.name);
                    $window.sessionStorage.setItem("isPrivlage", true);

                    $location.url('/app/companyconfig');
                }else{
              
                        var errorMsg = "Email or password is wrong";
                        $('body').pgNotification({
                              style: 'flip',
                              message: errorMsg,
                              position: 'top-right',
                              timeout: 5000,
                              type: 'danger'
                        }).show();
                }
                    
                });
       }

    }]);
