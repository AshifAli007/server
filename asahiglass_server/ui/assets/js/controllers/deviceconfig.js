'use strict';

/* Controllers */

angular.module('app')
    .controller('deviceConfig', ['$scope', 'md5', '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window', 'fileUpload', 'toaster',
        function ($scope, md5, $rootScope, $http, sessionInjector, config, Sessioncheck, $timeout, $location, $window, fileUpload, toaster) {

            $scope.isBuzz = false;
            $scope.isedit = false;

            $http.get(config.host + '/employee')
                .then(function (res) {
                    if (res.data.success == true) {
                        var empData = res.data.data;
                        console.log("Emp data: " + JSON.stringify(empData));
                        $scope.empData = empData;
                    }
                });

            $http.get(config.host + '/zone')
                .then(function (res) {
                    if (res.data.success == true) {
                        $scope.zones = res.data.items;
                    }
                });

            $scope.deviceTypes = config.Devices;

            //Datatable
            var datatable = function (deviceList) {
                if (deviceList.length > 0) {
                    $scope.showTable = false;
                } else {
                    $scope.showTable = true;
                }
                var table = $('#device').DataTable({
                    data: deviceList,
                    "pageLength": 5,
                    "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
                    "bDestroy": true,
                    columns: [
                        {
                            "data": "name"
                        },
                        {
                            "data": "deviceType",
                            render: function (data, type, row) {

                                if (data == null) {
                                    return "";
                                } else if (data == 1) {
                                    return "Beacon";
                                } else if (data == 2) {
                                    return "Reciver";
                                } else if (data == 3) {
                                    return "Zone Gateway";
                                } else if (data == 4) {
                                    return "Test Beacon";
                                } else if (data == 5) {
                                    return "RFID Card";
                                } else if (data == 6) {
                                    return "Bus Gateway";
                                } else if (data == 7) {
                                    return "Food Cart Gateway";
                                } else if (data == 8) {
                                    return "Control Room Gateway";
                                } else if (data == 9) {
                                    return "Provisioning Device Gateway";
                                }
                            }
                        },
                        {
                            "data": "serial"
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
                $('#device tbody').on('click', '#edit', function () {
                    $scope.isedit = true;
                    var data = table.row($(this).parents('tr')).data();
                    if (data == undefined) {
                        console.log("Click undefined");
                    } else {
                        $scope.isedit = true;
                        $scope.deviceType = data.deviceType;
                        $scope.deviceName = data.name;
                        $scope.deviceSerial = data.serial;                        
                        $scope.id = data.id
                        $scope.$apply();
                        document.body.scrollTop = 0;
                        document.documentElement.scrollTop = 0;
                    }
                });
            }

            //Device List
            var deviceList = function (type) {
                var url;
                if (!type) {
                    url = '/device'
                } else if (type == 1) {
                    url = '/device/beacon'
                } else if (type == 2) {
                    url = '/device/reciver'
                } else {
                    url = '/device/gateway'
                }

                $http.get(config.host + url)
                    .then(function (res) {
                        if (res.data.success == true) {
                            var deviceList = res.data.data;
                            console.log("Device data: " + JSON.stringify(deviceList));
                            datatable(deviceList);
                        }
                    });
            }

            deviceList();

            /**addUpdateDevice */
            $scope.addUpdateDevice = function () {
              
                var deviceData;
                console.log("$scope.deviceTypesadas: " + typeof ($scope.deviceType));
                if ($scope.deviceType == "1") {
                    deviceData = {
                        "deviceType": $scope.deviceType,
                        "name": $scope.deviceName,
                        "serial": $scope.deviceSerial,
                        "isBuzz": $scope.isBuzz
                    };
                } else if ($scope.deviceType == "8") {
                    deviceData = {
                        "deviceType": $scope.deviceType,
                        "name": $scope.deviceName,
                        "serial": $scope.deviceSerial,
                        "zones": $scope.zone
                    };
                } else {
                    deviceData = {
                        "deviceType": $scope.deviceType,
                        "name": $scope.deviceName,
                        "serial": $scope.deviceSerial
                    };
                }
                if (!$scope.isedit) {
                    $http.post(config.host + '/device', deviceData)
                        .then(function (res) {                            
                            if (res.data.success == true) {
                                var msg = res.data.message;
                                toaster.pop({
                                    type: 'success',
                                    body: msg,
                                    timeout: 3000
                                });
                                deviceList();
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
                else {
                    $scope.isedit = false;
                    $http.put(config.host + '/device/' + $scope.id, deviceData)
                        .then(function (res) {
                            if (res.data.success == true) {
                                var msg = res.data.message;
                                toaster.pop({
                                    type: 'success',
                                    body: msg,
                                    timeout: 3000
                                });
                                deviceList();
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
                $scope.deviceType = "";
                $scope.deviceName = "";
                $scope.deviceSerial = "";
                $scope.isBuzz = false;
                deviceList();
            }


            //Upload CSV
            $scope.uploadCsv = function () {               
                var file = $scope.myFile;
                console.log('file is ');
                console.dir(file);
                var uploadUrl = config.host + "/device/uploadCsv";
                fileUpload.uploadFileToUrl(file, uploadUrl);
            }

            //Device Change
            $scope.deviceChange = function (type) {
                deviceList(type)
            };
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