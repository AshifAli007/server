'use strict';
/* Controllers */
angular.module('app')
    .controller('plantConfig', ['$scope', '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window', 'toaster',
        function ($scope, $rootScope, $http, sessionInjector, config, Sessioncheck, $timeout, $location, $window, toaster) {
            $scope.isedit = false;
            var dataTable = function () {
                $http.get(config.host + '/plants')
                    .then(function (res) {
                        if (res.data.success == true) {
                            var items = res.data.data;
                            if (items.length > 0) {
                                $scope.showTable = false;
                                var table = $('#plantConfig').DataTable({
                                    data: items,
                                    "pageLength": 5,
                                    "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
                                    "bDestroy": true,
                                    columns: [
                                        {
                                            "data": "name"
                                        },
                                        {
                                            "data": "plantTypeName",                                           
                                        },
                                        {
                                            "data": "address",
                                        },
                                        {
                                            "data": "latitude"

                                        },
                                        {
                                            "data": "longitude"
                                        },
                                        {
                                            data: null,
                                            render: function (data, type, row) {
                                                if (type === 'display') {
                                                    return '<button id="edit" title="Edit " class="btn btn-success">Edit</button>';
                                                    // return '<button id="edit" title="Edit " class="btn btn-success">Edit</button> <button  id="delete" title="Delete" class="btn btn-info">Delete</button>';
                                                }
                                                return data;
                                            }
                                        }
                                    ]
                                });
                                $('#plantConfig tbody').on('click', '#edit', function () {
                                    $scope.isedit = true;
                                    var data = table.row($(this).parents('tr')).data();
                                    if (data == undefined) {
                                        console.log("Click undefined");
                                    } else {
                                        $scope.plantName = data.name;
                                        $scope.plantType = "" + data.plantType;
                                        $scope.address = data.address;
                                        $scope.latitude = data.latitude;
                                        $scope.longitude = data.longitude;
                                        $scope.plantId = data.id;
                                        $scope.$apply();
                                        document.body.scrollTop = 0;
                                        document.documentElement.scrollTop = 0;
                                    }
                                });
                            } else {
                                $scope.showTable = true;
                            }
                        }
                    });
            };

            dataTable();

             /**getPlantType list */
             var getPlantType = function () {
                $http.get(config.host + '/planttypes')
                    .then(function (res) {
                        if (res.data.success == true) {
                            $scope.plantTypes = res.data.items;
                        }
                    });
            }

            getPlantType();

            $scope.addUpdatePlant = function () {
                var parm = {
                    "name": $scope.plantName,
                    "plantType": $scope.plantType,
                    "address": $scope.address,
                    "latitude": $scope.latitude,
                    "longitude": $scope.longitude
                };
                if (!$scope.isedit) {
                    $http.post(config.host + '/plants', parm)
                        .then(function (res) {
                            if (res.data.success == true) {
                                var msg = res.data.message;
                                toaster.pop({
                                    type: 'success',
                                    body: msg,
                                    timeout: 3000
                                });
                                $scope.plantName = '';
                                $scope.plantType = '';
                                $scope.address = '';
                                $scope.latitude = '';
                                $scope.longitude = '';

                                dataTable();
                            } else {
                                var msg = res.data.message;
                                toaster.pop({
                                    type: 'error',
                                    body: msg,
                                    timeout: 3000
                                });
                            }
                        });
                }
                else {
                    $http.put(config.host + '/plants/' + $scope.plantId, parm)
                        .then(function (res) {
                            if (res.data.success == true) {
                                $scope.isedit = false;
                                var msg = res.data.message;
                                toaster.pop({
                                    type: 'success',
                                    body: msg,
                                    timeout: 3000
                                });
                                $scope.plantName = '';
                                $scope.plantType = '';
                                $scope.address = '';
                                $scope.latitude = '';
                                $scope.longitude = '';
                                dataTable();
                            } else {
                                $scope.isedit = true;
                                var msg = res.data.message;
                                toaster.pop({
                                    type: 'error',
                                    body: msg,
                                    timeout: 3000
                                });
                            }
                        });
                }
            };
        }
    ]);