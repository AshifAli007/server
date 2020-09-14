'use strict';

/* Controllers */

angular.module('app')
    // Chart controller
    .controller('AuthCtrl', ['$scope', '$rootScope', '$http', 'sessionInjector', 'Config', '$timeout', '$location', '$window', 'toaster',
        function ($scope, $rootScope, $http, sessionInjector, config, $timeout, $location, $window, toaster) {

            $http.get(config.host + '/company')
                .then(function (res) {
                    if (res.data.success == true) {
                        $scope.companys = res.data.items;
                    }
                });

            $scope.authLogin = function (user) {

                var authData = {
                    "email": user.username,
                    "password": user.password,
                    "companyId": user.companyId
                };

                $http.post(config.host + '/auth/login', authData)
                    .then(function (res) {
                        if (res.data.success == true) {
                            /// alert("Logo : " + JSON.stringify(res.data.data.company));
                            $window.sessionStorage.setItem('token', res.data.data.token);
                            $window.sessionStorage.setItem('userId', res.data.data.id);
                            $window.sessionStorage.setItem('user_type', res.data.data.userType);
                            $window.sessionStorage.setItem('user_name', res.data.data.name);
                            $window.sessionStorage.setItem('companyId', res.data.data.company.id);
                            $window.sessionStorage.setItem('companyName', res.data.data.company.name);
                            $window.sessionStorage.setItem('companyLogo', res.data.data.company.logo);

                            if (res.data.data.userType == 0) {
                                $location.url('/app/dashboard');
                            }
                            else if (res.data.data.userType == 1) {
                                $location.url('/app/dashboard');
                            }
                            else if (res.data.data.userType == 3) {
                                $location.url('/app/reporting');
                            } else if (res.data.data.userType == 5) {
                                $location.url('/access/controlroom');
                            }
                            else {
                                $location.url('/app/supervisordashboard');
                            }
                        } else {
                            var msg = res.data.message;                            
                            toaster.pop({
                                type: 'error',
                                body: msg,
                                timeout: 3000
                            });
                        }
                    });
            };

            // $scope.onEnterKeyPress = function (event, user) {
            //     if (event.charCode == 13) //if enter is ht then call ValidateInputvalue().
            //         $scope.authLogin(user);
            // }
        }]);
