'use strict';

/* Controllers */

angular.module('app')
    .controller('deviceConfig', ['$scope', '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window', 'fileUpload', 'toaster', 'FlashService',
        function ($scope, $rootScope, $http, sessionInjector, config, Sessioncheck, $timeout, $location, $window, fileUpload, toaster, FlashService) {

            $scope.isBuzz = false;
            $scope.isedit = false;

            $http.get(config.host + '/employee')
                .then(function (res) {
                    if (res.data.success == true) {
                        var empData = res.data.data;
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
                                    return "Receiver";
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
                                else {
                                    return "";
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
                                    return '<button id="edit" title="Edit cellsite" class="btn btn-success">Edit</button>';
                                    // return '<button id="edit" title="Edit cellsite" class="btn btn-success">Edit</button> <button  title="Delete Device" id="delete" class="btn btn-info">Delete</button> ';
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
                        $scope.deviceType = "" + data.deviceType;
                        $scope.deviceName = data.name;
                        $scope.deviceSerial = data.serial.match(/.{1,2}/g).join(':');
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
                            datatable(deviceList);
                        }
                    });
            }

            deviceList();

            $scope.serialNoFormat = function (deviceSerial) {
                var deviceSerialNo = deviceSerial;

                if (deviceSerialNo) {
                    var deviceSerialColonRemove = deviceSerialNo.replace(/:/g, '');
                    if (deviceSerialColonRemove.length <= 12) {
                        $scope.deviceSerial = deviceSerialColonRemove.match(/.{1,2}/g).join(':');
                    }
                }
                else {
                    console.log('undefined serial number');
                }

                console.log("Device Serial Number is :", $scope.deviceSerial );
            }



            /**addUpdateDevice */
            $scope.addUpdateDevice = function () {
                var deviceData;
                $scope.deviceSerial = $scope.deviceSerial.replace(/[:]/g, "");
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
                        // "zones": $scope.zone
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
                                    type: 'error',
                                    body: msg,
                                    timeout: 3000
                                });
                            }
                        });
                }
                else {
                    $http.put(config.host + '/device/' + $scope.id, deviceData)
                        .then(function (res) {
                            if (res.data.success == true) {
                                $scope.isedit = false;
                                var msg = res.data.message;
                                toaster.pop({
                                    type: 'success',
                                    body: msg,
                                    timeout: 3000
                                });
                                deviceList();
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
                $scope.deviceType = "";
                $scope.deviceName = "";
                $scope.deviceSerial = "";
                $scope.isBuzz = false;
                deviceList();
            }

            /**function for adding : after every 2 charcters starts */
            // $("#mac").on("keyup", function (event) {

            //     var limitField = $(this).val().trim().length;
            //     var limit = "17";

            //     if (event.keyCode != 8) {
            //         var mac_value = $(this).val().trim().concat(':');
            //         switch (limitField) {
            //             case 2:
            //             case 5:
            //             case 8:
            //             case 11:
            //             case 14:
            //                 $("#mac").val(mac_value);
            //                 break;
            //         }
            //     }
            //     if (limitField > limit) {
            //         $("#mac").val($(this).val().trim().substring(0, limit));
            //     }
            // });



            /**function for adding : after every 2 charcters ends */

            /**code for samplecsv starts */
            $(document).ready(function () {
                function JSONToCSVConvertor(JSONData, ShowLabel) {
                    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
                    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
                    var CSV = '';
                    //This condition will generate the Label/Header
                    if (ShowLabel) {
                        var row = "";
                        //This loop will extract the label from 1st index of on array
                        for (var index in arrData[0]) {
                            //Now convert each value to string and comma-seprated
                            row += index + ',';
                        }
                        row = row.slice(0, -1);
                        //append Label row with line break
                        CSV += row + '\r\n';
                    }
                    //1st loop is to extract each row
                    for (var i = 0; i < arrData.length; i++) {
                        var row = "";
                        //2nd loop will extract each column and convert it in string comma-seprated
                        for (var index in arrData[i]) {
                            row += '"' + arrData[i][index] + '",';
                        }
                        row.slice(0, row.length - 1);
                        //add a line break after each row
                        CSV += row + '\r\n';
                    }
                    if (CSV == '') {
                        alert("Invalid data");
                        return;
                    }
                    //Generate a file name       
                    var fileName = "SampleDeviceCSV";
                    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
                    var link = document.createElement("a");
                    link.href = uri;
                    //set the visibility hidden so it will not effect on your web-layout
                    link.style = "visibility:hidden";
                    link.download = fileName + ".csv";
                    //this part will append the anchor tag and remove it after automatic click
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
                // This must be a hyperlink
                $("#downloadSampleCsv").on('click', function (event) {
                    var JsonData = [{ "name": "", "serial": "", "deviceType": "", "nodeId": "", "isBuzz": "", "genericId": "", "subAddress": "", "pubAddress": "", "healthAddress": "" }];
                    JSONToCSVConvertor(JsonData, true);
                });
            });
            /**code for sample csv ends */

            /** Upload CSV for Bulk Provisioning*/
            $scope.uploadCsv = function () {
                if ($scope.myFile) {
                    var file = $scope.myFile;
                    var uploadUrl = config.host + "/device/uploadCsv";
                    fileUpload.uploadFileToUrl(file, uploadUrl);
                    $scope.myFile = '';
                    angular.element("input[type='file']").val(null);
                }
                else {
                    toaster.pop({
                        type: 'error',
                        body: "No file choosen",
                        timeout: 3000
                    });
                    return;
                }
            }

            //Device Change
            $scope.deviceChange = function (type) {
                deviceList(type);
            };

            $scope.$on('reloadTable', function (event) {
                console.log("Inside eventListner method");
                deviceList();
            })
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
    }]).service('fileUpload', ['$http', 'FlashService', '$rootScope', function ($http, FlashService, $rootScope) {
        this.uploadFileToUrl = function (file, uploadUrl) {
            var fd = new FormData();
            fd.append('file', file);

            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
                .success(function (res, error) {
                    if (res.success) {
                        FlashService.show(res.message);
                        $rootScope.$broadcast('reloadTable');
                    }
                    else {
                        FlashService.showError(res.message);
                        $rootScope.$broadcast('reloadTable');
                    }
                })
                .error(function () {
                });
        }
    }]);