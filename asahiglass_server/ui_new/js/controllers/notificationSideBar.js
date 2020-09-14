'use strict';

/* Controllers */
angular.module('app')

    .controller('notificationSideBarCtrl', ['$document', '$scope', '$state', 'socketIO', '$sce', '$compile', '$rootScope', '$http', 'sessionInjector', 'Config', '$timeout', '$location', '$window', 'FlashService',
        function ($document, $scope, $state, socketIO, $sce, $compile, $rootScope, $http, sessionInjector, config, $timeout, $location, $window, FlashService) {

            $scope.notificationList = [];
            $scope.showValidationError = false;

            $scope.cls = "header-user-list";
            var s = true;
            $scope.openMe = function () {

                if (s === true) {
                    $scope.cls = "header-user-list open";
                    s = false;
                } else {
                    $scope.cls = "header-user-list";
                    s = true;
                }
            }

            $scope.logout = function () {
                sessionStorage.clear();
                $state.go("access.login");
            }

            $scope.loadNotification = function () {
                var time = moment.duration("12:00:00");
                var endDate = new Date();
                endDate = endDate.getTime();
                var startDate = moment(endDate);
                startDate.subtract(time);
                $http.get(config.host + '/notification?startDate=' + startDate + '&endDate=' + endDate)
                    .then(function (res) {
                        if (res.data.success == true) {
                            var datas = res.data.items;
                            var resData = [];
                            datas.forEach(data => {
                                var tempObj = {};
                                tempObj.zoneName = data.zoneName;
                                tempObj.empName = data.empName;
                                tempObj.empId = data.empId;
                                tempObj.assetTypeName = data.assetTypeName;
                                tempObj.assetSubTypeName = data.assetSubTypeName;
                                tempObj.message = data.message;
                                var edate = parseInt(data.entryTime);
                                if (data.exitTime == 0) {
                                    tempObj["exitTime"] = "";
                                } else {
                                    tempObj["exitTime"] = moment(parseInt(data.exitTime)).format("DD MMM YY (hh:mm a)");
                                }
                                // var exdate = new Date(parseInt(data.exitTime));
                                tempObj["fromnow"] = moment(edate).fromNow();
                                tempObj["entryTime"] = moment(edate).format("DD MMM YY (hh:mm a)");

                                resData.push(tempObj);
                                if (resData.length === datas.length) {
                                    $scope.notificationList = resData;
                                }
                            });


                        } else {
                            var errorMessage = res.data.message;
                            // FlashService.showError(errorMessage);
                        }
                    });
            }
            socketIO.on('notification', function (data) {
                $scope.loadNotification();
            });

            // search list
            $("#search-friends").on("keyup", function () {
                var e = $(this).val().toLowerCase();
                $(".header-user-list .userlist-box .media-body .chat-header").each(function () {
                    var s = $(this).text().toLowerCase();
                    $(this).closest(".userlist-box")[-1 !== s.indexOf(e) ? "show" : "hide"]()
                })
            })

            $scope.searchOnlineAsset = function (searchAssetName) {
                if (searchAssetName) {
                    $http.get(config.host + '/employee/searchonlineasset?name=' + searchAssetName)
                        .then(function (res) {
                            if (res.data.success == true) {
                                $scope.assetList = res.data.items;
                            } else {
                                $scope.assetList = res.data.items;
                            }
                            $scope.showAssetList = true;
                        });
                }
                else {

                }
            }

            $scope.getOnlineAssetDetails = function (event, asset) {
                this.search.searchAssetName = asset.empName;
                $rootScope.onlineAsset = asset;
                $scope.assetList = [];
                $window.sessionStorage.setItem('searchOnlineAsset', true);
                if ($state.current.name == 'app.dashboard') {
                    $rootScope.$emit('searchAsset', $rootScope.onlineAsset);
                }
                else {
                    $state.transitionTo("app.dashboard");
                }
            }

            $scope.init = function () {
                $scope.loadNotification();
            }

            $scope.hideLoginContainer = function () {
                $scope.showAssetList = false;
            };
        }
    ]);

angular.module('app')
    .directive('hideLogin', ['$document', function ($document) {
        return {
            restrict: 'A',
            link: function (scope, elem, attr, ctrl) {
                elem.bind('click', function (e) {
                    e.stopPropagation();
                });
                $document.bind('click', function () {
                    scope.$apply(attr.hideLogin);
                })
            }
        }
    }]);



