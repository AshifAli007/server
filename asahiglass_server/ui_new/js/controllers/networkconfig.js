'use strict';

/* Controllers */
angular.module('app')
    .controller('netConfig', ['$scope', '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window', 'toaster',
        function ($scope, $rootScope, $http, sessionInjector, config, Sessioncheck, $timeout, $location, $window, toaster) {            
            $scope.isedit = false;
            var dataTable = function () {
                $http.get(config.host + '/networks')
                    .then(function (res) {
                        if (res.data.success == true) {
                            var items = res.data.items;
                            if (items.length > 0) {
                                $scope.showTable = false;
                                var table = $('#networkList').DataTable({
                                    data: items,
                                    "pageLength": 5,
                                    "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
                                    "bDestroy": true,
                                    columns: [
                                        {
                                            "data": "networkName"
                                        },
                                        {
                                            "data": "meshUuid",
                                        },
                                        {
                                            "data": "gatewaySubAddress"

                                        },
                                        {
                                            "data": "gatewayPubAddress"
                                        },
                                        {
                                            "data": "gatewayHealthAddress"
                                        },
                                        {
                                            data: null,
                                            render: function (data, type, row) {
                                                if (type === 'display') {
                                                    // return '<button id="edit" title="Edit " class="btn btn-success">Edit</button> <button  id="delete" title="Delete" class="btn btn-info">Delete</button>';
                                                   return '<button id="edit" title="Edit " class="btn btn-success">Edit</button> ';
                                                }
                                                return data;
                                            }
                                        }
                                    ]
                                });

                                $('#networkList tbody').on('click', '#edit', function () {
                                    $scope.isedit = true;
                                    var data = table.row($(this).parents('tr')).data();
                                    if (data == undefined) {
                                        console.log("Click undefined");
                                    } else {
                                        $scope.networkName = data.networkName;
                                        $scope.netId = data.id;
                                        $scope.$apply();
                                    }
                                });

                                $('#networkList tbody').on('click', '#delete', function () {
                                    var data = table.row($(this).parents('tr')).data();
                                    if (data == undefined) {
                                        console.log("Click undefined");
                                    }
                                    else {
                                        var id = $(this).data('id');
                                        $('#deleteModal').data('id', id).modal('show');
                                        $scope.netId = data.id;
                                        $scope.$apply();
                                    }
                                });

                            } else {
                                $scope.showTable = true;
                            }
                        }
                    });
            };

            dataTable();

            $scope.deleteNetwork = function () {
                $http.delete(config.host + '/networks/' + $scope.netId)
                    .then(function (res) {
                        if (res.data.success == true) {
                            $scope.isedit = false;
                            var msg = res.data.message;
                            toaster.pop({
                                type: 'success',
                                body: msg,
                                timeout: 3000
                            });
                            $scope.networkName = '';
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

            $scope.addUpdateNetwork = function () {
                var parm = {
                    "networkName": $scope.networkName
                };
                if (!$scope.isedit) {
                    $http.post(config.host + '/networks', parm)
                        .then(function (res) {
                            if (res.data.success == true) {
                                var msg = res.data.message;
                                toaster.pop({
                                    type: 'success',
                                    body: msg,
                                    timeout: 3000
                                });
                                $scope.networkName = '';
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
                    $http.put(config.host + '/networks/' + $scope.netId, parm)
                        .then(function (res) {
                            if (res.data.success == true) {
                                $scope.isedit = false;
                                var msg = res.data.message;
                                toaster.pop({
                                    type: 'success',
                                    body: msg,
                                    timeout: 3000
                                });
                                $scope.networkName = '';
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