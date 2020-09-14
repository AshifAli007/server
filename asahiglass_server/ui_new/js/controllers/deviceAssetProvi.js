'use strict';
angular.module('app')
    .controller('DeviceAssetProvi', ['$scope', 'socketIO', '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window', 'toaster', 'FlashService',
        function ($scope, socketIO, $rootScope, $http, sessionInjector, config, Sessioncheck, $timeout, $location, $window, toaster, FlashService) {
            $scope.showMsg = false;
            $scope.errMsg = false;
            $scope.showMsgSpinner = false;
            $scope.ScanDisable = false;
            $scope.showBtn = false;

            $scope.getProvisioningDevice = function () {
                $scope.loading = true;
                $http.get(config.host + '/device/provisioningdevice')
                    .then(function (res) {
                        if (res.data.success == true) {
                            $scope.loading = false;
                            $scope.proDevices = res.data.items;
                        }else {
                            $scope.loading = false;
                        }
                    });
            }

            $scope.getAssetDetails = function () {
                $scope.loading = true;
                $http.get(config.host + '/employee')
                    .then(function (res) {
                        if (res.data.success == true) {
                            $scope.loading = false;
                            $scope.assetDetails = res.data.items;
                        } else {
                            $scope.loading = false;
                        }
                    });
            }

            $scope.deviceDataList = function () {
                $scope.loading = true;
                $http.get(config.host + '/device/provisioneddevice')
                    .then(function (res) {
                        if (res.data.success == true) {
                            var table = $('#proDevices').DataTable({
                                data: res.data.items,
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
                                                return "Gateway";
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
                                        "data": "deviceName"
                                    }
                                ]
                            });
                            $scope.loading = false;
                        }
                        else {
                            $scope.loading = false;
                        }
                    });
            }

            var socketData = function (data) {
                $window.localStorage.setItem('gatewaySerial', "");
                $window.localStorage.setItem('deviceType', "");
                if (data.success === true) {
                    $scope.deviceSerial = data.serialNo;
                    $scope.deviceName = data.name;
                    $scope.showMsg = false;
                    $scope.showBtn = true;
                    $scope.showMsgSpinner = false;
                    $scope.$apply();
                } else {
                    $scope.showMsgSpinner = false;
                    $scope.ScanDisable = false;
                    $scope.showMsg = false;
                    console.log("warning: ", data.message);
                    FlashService.showError(data.message);
                    $scope.$apply();
                }
            };

            $scope.ScanDevice = function () {
                var device;
                $scope.errMsg = false;
                $scope.showMsg = true;

                if ($scope.deviceType == 5) {
                    device = "RFID Card";
                } else {
                    device = "Bluetooth Beacon";
                }
                if ($scope.gateway && $scope.deviceType) {
                    FlashService.show('Scan started..');
                    var parms = {
                        "gatewaySerial": $scope.gateway,
                        "type": $scope.deviceType
                    };
                    console.log("Start Scan: " + JSON.stringify(parms));
                    if (Object.keys(parms).length == 2) {
                        $http.post(config.host + '/provision', parms)
                            .then(function (res) {
                                if (res.data.success == true) {
                                    $scope.showMsgSpinner = true;
                                    $scope.ScanDisable = true;
                                    $scope.showBtn = false;
                                    $scope.msg = "Please put RFID Card/Bluetooth Beacon on Provisioning Device & don't refresh the page";
                                    $scope.disabled = true;
                                    $window.localStorage.setItem('gatewaySerial', $scope.gateway);
                                    $window.localStorage.setItem('deviceType', $scope.deviceType);
                                }
                            });
                    }
                    else {
                        alert("Please select all mandatory fields");
                    }
                } else {
                    FlashService.showError('Please select Device Type & Gateway');
                }
            };

            var checkScaning = function () {
                var gwSerial = $window.localStorage.getItem('gatewaySerial');
                var deviceType = $window.localStorage.getItem('deviceType');
                $http.get(config.host + '/provision?id=' + gwSerial)
                    .then(function (res) {
                        if (res.data.success == true) {
                            var provData = res.data.items;
                            console.log("Responce: ", JSON.stringify(provData));
                            if (provData.length) {
                                $scope.gateway = res.data.items[0].deviceSerial;
                                $scope.deviceType = res.data.items[0].type;
                                $scope.showMsgSpinner = true;
                                $scope.ScanDisable = true;
                                $scope.showMsg = true;
                                $scope.msg = "Please put RFID Card/Bluetooth Beacon on Provisioning Device & don't refresh the page";
                                //$scope.$apply();
                            } else {
                                $window.localStorage.setItem('gatewaySerial', "");
                                $window.localStorage.setItem('deviceType', "");
                                $scope.deviceType = "";
                                $scope.deviceSerial = "";
                                $scope.showMsgSpinner = false;
                                $scope.ScanDisable = false;
                                $scope.showMsg = false;
                            }
                        }
                        console.log("gwSerial: ", JSON.stringify(res));
                        console.log("gwSerial & deviceType ", gwSerial, ' ,', deviceType);
                    });

            };

            checkScaning();

            var reset_all = function () {
                $scope.deviceType = "";
                $scope.deviceName = "";
                $scope.deviceSerial = "";
                $scope.assetId = "";
                $scope.gateway = "";
                $scope.showBtn = false;
                $scope.showMsgSpinner = false;
                $scope.disabled = false;
                $scope.ScanDisable = false;
            };

            $scope.saveDevice = function () {
                if ($scope.deviceType && $scope.deviceName && $scope.deviceSerial && $scope.assetId) {
                    var parms = {
                        "deviceType": $scope.deviceType,
                        "name": $scope.deviceName,
                        "serial": $scope.deviceSerial,
                        "assetId": $scope.assetId
                    };
                    $http.post(config.host + '/device/createAndMapDevice', parms)
                        .then(function (res) {                           
                            if (res.data.success === true) {
                                reset_all();
                                $scope.deviceDataList();
                                FlashService.show(data.message);
                            } else {
                                FlashService.showError(data.message);
                            }
                        });
                } else {
                    FlashService.showError('Please enter all mandatory fields');
                }
            };

            $scope.resetAll = function () {
                reset_all();
                $scope.deviceDataList();
            };

            socketIO.on('provisioning', function (data) {
                console.log("provisioning from socket" + JSON.stringify(data));
                socketData(data);
            });


            $scope.loadData = function () {
                $scope.deviceDataList();
                $scope.getProvisioningDevice();
                $scope.getAssetDetails();
            }
        }
    ]);

