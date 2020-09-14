'use strict';

/* Controllers */
angular.module('app')
    .controller('assetZoneMapping', ['$scope', '$rootScope', '$http', 'toaster', 'FlashService', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window',
        function ($scope, $rootScope, $http, toaster, FlashService, sessionInjector, config, Sessioncheck, $timeout, $location, $window) {


            $scope.mapList = [];
            //Zone List
            $scope.getAssetList = function () {
                $http.get(config.host + '/employee')
                    .then(function (res) {
                        if (res.data.success == true) {
                            $scope.assets = res.data.items;
                        }
                        else {
                            var errorMessage = res.data.message;
                            FlashService.showError(errorMessage);
                        }
                    });

            }

            //Beacon Device list
            $scope.getZoneList = function () {
                $http.get(config.host + '/zone')
                    .then(function (res) {
                        if (res.data.success == true) {
                            $scope.zones = res.data.items;
                        }
                        else {
                            var errorMessage = res.data.message;
                            FlashService.showError(errorMessage);
                        }
                    });
            }

            //Emp List
            $scope.mapping = function () {
                $http.get(config.host + '/zone/assign/user')
                    .then(function (res) {
                        if (res.data.success == true) {
                            $scope.mapList = res.data.data;
                            var table = $('#mappiguserzone').DataTable({
                                data: $scope.mapList,
                                "pageLength": 5,
                                "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
                                "bDestroy": true,
                                columns: [
                                    {
                                        "data": "assetName"
                                    },
                                    {
                                        "data": "assetTypeName"
                                    },
                                    {
                                        "data": "subName"
                                    },
                                    {
                                        "data": "zoneName"
                                    },
                                    {
                                        data: null,
                                        render: function (data, type, row) {
                                            if (type === 'display') {
                                                return '<button id="edit" title="release " class="btn btn-success">Release</button>  ';
                                            }
                                            return data;
                                        }
                                    }
                                ]
                            });
                            $('#mappiguserzone tbody').on('click', '#edit', function () {
                                var data = table.row($(this).parents('tr')).data();
                                if (data == undefined) {
                                } else {
                                    $http.delete(config.host + '/zone/release/user/' + data.id)
                                        .then(function (res) {
                                            if (res.data.success == true) {
                                                var successMsg = res.data.message;
                                                FlashService.show(successMsg);
                                                $scope.mapping();
                                            } else {
                                                var warningMsg = res.data.message;
                                                FlashService.showWarning(warningMsg);
                                            }
                                        });
                                }
                            });
                        }
                    });
            }


            /**Add Mapping */
            $scope.mappingassetdevice = function () {
                var assetid = $scope.asset;
                var zoneid = $scope.zone;
                var mappingData = {
                    "userId": assetid
                }
                $http.post(config.host + '/zone/' + zoneid + '/assign/user', mappingData)
                    .then(function (res) {
                        if (res.data.success == true) {
                            var successMsg = res.data.message;
                            FlashService.show(successMsg);
                            $scope.asset = "";
                            $scope.zone = "";
                            $scope.mapping();
                        } else {
                            var errorMsg = res.data.message;
                            FlashService.showWarning(errorMsg);
                            $scope.asset = "";
                            $scope.zone = "";
                            $scope.mapping();
                        }


                    });
            }

            $scope.loadData = function () {
                $scope.getAssetList();
                $scope.getZoneList();
                $scope.mapping();
            }

        }
    ]);