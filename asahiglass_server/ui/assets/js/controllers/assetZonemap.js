'use strict';

/* Controllers */
angular.module('app')
    .controller('assetZoneMapping', ['$scope', 'md5', '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window', 'toaster',
        function ($scope, md5, $rootScope, $http, sessionInjector, config, Sessioncheck, $timeout, $location, $window, toaster) {

            //Beacon Device list
            $http.get(config.host + '/zone')
                .then(function (res) {
                    if (res.data.success == true) {
                        var zoneData = res.data.items;
                        console.log("Zone Data: " + JSON.stringify(zoneData));
                        $scope.zones = zoneData;
                    }
                });

            //Zone List
            $http.get(config.host + '/employee')
                .then(function (res) {
                    if (res.data.success == true) {
                        var assetData = res.data.items;
                        $scope.assets = assetData;
                    }
                });

            //Emp List
            var mapping = function () {
                $http.get(config.host + '/zone/assign/user')
                    .then(function (res) {
                        if (res.data.success == true) {
                            var mapList = res.data.data;
                            var table = $('#mappiguserzone').DataTable({
                                data: mapList,
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
                                    console.log("Click undefined");
                                } else {
                                    console.log("Release: ", JSON.stringify(data));
                                    $http.delete(config.host + '/zone/release/user/' + data.id)
                                    .then(function (res) {
                                        if (res.data.success == true) {
                                            var msg = res.data.message;
                                            toaster.pop({
                                                type: 'success',
                                                body: msg,
                                                timeout: 3000
                                            });
                                            mapping();
                                        } else {
                                            var msg = res.data.message;
                                            toaster.pop({
                                                type: 'warning',
                                                body: msg,
                                                timeout: 3000
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
            }

            mapping();

            /**Add Mapping */
            $scope.mappingassetdevice = function () {
                var assetid = $scope.asset;
                var zoneid = $scope.zone;
                var mappingData = {
                    "userId": assetid
                }
                console.log("Mapping Data: " + JSON.stringify(mappingData))
                $http.post(config.host + '/zone/' + zoneid + '/assign/user', mappingData)
                    .then(function (res) {
                        if (res.data.success == true) {
                            var msg = res.data.message;
                            toaster.pop({
                                type: 'success',
                                body: msg,
                                timeout: 3000
                            });
                            $scope.asset = "";
                            $scope.zone = "";
                            mapping();
                        } else {
                            var msg = res.data.message;
                            toaster.pop({
                                type: 'warning',
                                body: msg,
                                timeout: 3000
                            });
                            $scope.asset = "";
                            $scope.zone = "";
                            mapping();
                        }

  
                    });
            }
        }
    ]);