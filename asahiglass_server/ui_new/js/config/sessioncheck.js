"use strict";
angular.module("app")
    .service('Sessioncheck', function ($window, $state) {
        return {


            setString: function (value) {
                alert("set string: " + value);
                if (value == 3) {
                    sessionStorage.clear();
                    $window.location = "access.login";
                    $state.go("access.login");
                }

            }
        }
    });


