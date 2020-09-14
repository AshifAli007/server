'use strict';

/* Controllers */
angular.module('app')
    .controller('busConfig', ['$scope', 'md5', '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window', 'fileUpload', 'toaster',
        function ($scope, md5, $rootScope, $http, sessionInjector, config, Sessioncheck, $timeout, $location, $window, fileUpload, toaster) {

            $scope.isBuzz = false;
            $scope.isedit = false;
            //Datatable
            var datatable = function (busList) {
                if (busList.length > 0) {

                    $scope.showTable = false;
                } else {

                    $scope.showTable = true;
                }
                var table = $('#bus').DataTable({
                    data: busList,
                    "pageLength": 5,
                    "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
                    "bDestroy": true,
                    columns: [
                        {
                            "data": "busNo"
                        },
                        {
                            "data": "venderName"
                        },
                        {
                            "data": "uniqueId"
                        },
                        {
                            "data": "name"
                        },
                        {
                            data: null,
                            render: function (data, type, row) {
                                if (type === 'display') {
                                    return '<button id="edit" title="Edit cellsite" class="btn btn-success">Edit</button> <button  title="Delete Device" id="delete" class="btn btn-info">Delete</button> ';
                                }
                                return data;
                            }
                        }
                    ]
                });
                $('#bus tbody').on('click', '#edit', function () {
                    $scope.isedit = true;
                    var data = table.row($(this).parents('tr')).data();
                    if (data == undefined) {
                        console.log("Click undefined");
                    } else {
                        $scope.busNumber = data.busNo;
                        $scope.venderName = data.venderName;
                        $scope.gateWay = data.gatewayId
                        $scope.id = data.id
                        $scope.$apply();
                        document.body.scrollTop = 0;
                        document.documentElement.scrollTop = 0;
                    }
                });
            }

            //Device List
            var getBusList = function () {
                $http.get(config.host + '/bus')
                    .then(function (res) {
                        if (res.data.success == true) {
                            var busList = res.data.items;
                            console.log("Device data: " + JSON.stringify(busList));
                            datatable(busList);
                        }
                    });
            }

            getBusList();

            //Device List
            var getBusGateway = function () {
                $http.get(config.host + '/device/getBusGateway')
                    .then(function (res) {
                        if (res.data.success == true) {
                            $scope.busGatewayList = res.data.items;
                        }
                    });
            }

            getBusGateway();

            /** Add/Update Bus*/
            $scope.addUpdateBus = function () {
                if (!$scope.isedit) {
                    var busData = {
                        "busNo": $scope.busNumber,
                        "venderName": $scope.venderName,
                        "gatewayId": $scope.gateWay
                    };
                    console.log("Bus Data: " + JSON.stringify(busData));
                    $http.post(config.host + '/bus', busData)
                        .then(function (res) {
                            if (res.data.success == true) {
                                var msg = res.data.message;
                                toaster.pop({
                                    type: 'success',
                                    body: msg,                                    
                                    timeout: 3000
                                });
                                getBusList();
                                $scope.busNumber = "";
                                $scope.venderName = "";
                                $scope.gateWay = "";
                            } else {
                                var msg = res.data.message;
                                toaster.pop({
                                    type: 'warning',
                                    body: msg,
                                    timeout: 3000
                                });
                                console.log("Res data: " + JSON.stringify(res));
                                $scope.busNumber = "";
                                $scope.venderName = "";
                                $scope.gateWay = "";
                            }
                        });
                }
                else {
                    $scope.isedit = false;
                    var busData = {
                        "busNo": $scope.busNumber,
                        "venderName": $scope.venderName,
                        "gatewayId": $scope.gateWay
                    };
                    console.log("Device Id: " + $scope.id)
                    console.log("Device Data: " + JSON.stringify(busData));
                    $http.put(config.host + '/bus/' + $scope.id, busData)
                        .then(function (res) {
                            if (res.data.success == true) {
                                var msg = res.data.message;
                                toaster.pop({
                                    type: 'success',
                                    body: msg,
                                    timeout: 3000
                                });
                                getBusList();
                                $scope.busNumber = "";
                                $scope.venderName = "";
                                $scope.gateWay = "";
                            } else if (res.data.code == "ER_DUP_ENTRY") {
                                toaster.pop({
                                    type: 'warning',
                                    body: 'Bus no. or Gateway already exits',
                                    timeout: 3000
                                });
                            }
                            else {
                                var msg = res.data.message;
                                toaster.pop({
                                    type: 'warning',
                                    body: msg,
                                    timeout: 3000
                                });
                                $scope.busNumber = "";
                                $scope.venderName = "";
                                $scope.gateWay = "";
                            }
                        });
                }
            }

            //Upload CSV
            $scope.uploadCsv = function () {
                var file = $scope.myFile;
                console.log('file is ');
                console.dir(file);
                var uploadUrl = config.host + "/bus/uploadCsv";
                fileUpload.uploadFileToUrl(file, uploadUrl);
            }
        }
    ]).directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]).service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function (file, uploadUrl) {
            var fd = new FormData();
            fd.append('file', file);

            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
                .success(function () {

                })
                .error(function () {
                });
        }
    }]);