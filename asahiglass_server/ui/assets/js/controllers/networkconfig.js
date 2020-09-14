'use strict';

/* Controllers */
angular.module('app')
    .controller('netConfig', ['$scope', 'md5', '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window',  'toaster',
        function ($scope, md5, $rootScope, $http, sessionInjector, config, Sessioncheck, $timeout, $location, $window,  toaster) {
            $scope.showButton = true;    
            var dataTable = function(){
                $http.get(config.host + '/networks')
                .then(function (res) {
                    if (res.data.success == true) {
                        var items = res.data.items;
                        if(items.length > 0 ){
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
                                                return '<button id="edit" title="Edit " class="btn btn-success">Edit</button> <button  title="Delete " id="delete" class="btn btn-info">Delete</button> ';
                                            }
                                            return data;
                                        }
                                    }
                                ]
                            });

                            $('#networkList tbody').on('click', '#edit', function () {
                                $scope.showButton = false;
                                var data = table.row($(this).parents('tr')).data();
                                if (data == undefined) {
                                    console.log("Click undefined");
                                } else {
                                    $scope.networkName = data.networkName;
                                    $scope.netId = data.id;
                                    $scope.$apply();
                                }
                            });
                            delete

                            $('#networkList tbody').on('click', '#delete', function () {
                                $scope.showButton = false;
                                var data = table.row($(this).parents('tr')).data();
                                if (data == undefined) {
                                    console.log("Click undefined");
                                } else {
                                   
                                    $http.delete(config.host + '/networks/'+data.id)
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
                                        }else{
                                            var msg = res.data.message;
                                            toaster.pop({
                                                type: 'warning',
                                                body: msg,
                                                timeout: 3000
                                            });
                                            $scope.networkName = '';
                                            dataTable();
                                        }
                                    });
                                }
                            });
                        }else{
                            $scope.showTable = true;
                        }
                    }
                });
            };
            dataTable();

            $scope.addNetwork = function () {
           
                var parm = {
                    "networkName":$scope.networkName
                };
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
                    }else{
                        var msg = res.data.message;
                        toaster.pop({
                            type: 'warning',
                            body: msg,
                            timeout: 3000
                        });
                        $scope.networkName = '';
                        dataTable();
                    }
                });
            };

            $scope.updatenetwork = function(){
                var parm = {
                    "networkName":$scope.networkName
                };
                $http.put(config.host + '/networks/'+$scope.netId, parm)
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
                    }else{
                        var msg = res.data.message;
                        toaster.pop({
                            type: 'warning',
                            body: msg,
                            timeout: 3000
                        });
                        $scope.networkName = '';
                        dataTable();
                    }
                });
            }

        }
    ]);