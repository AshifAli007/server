'use strict';

/* Controllers */
angular.module('app')
    .controller('foodcartConfig', ['$scope', '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window', 'fileUpload', 'toaster',
        function ($scope, $rootScope, $http, sessionInjector, config, Sessioncheck, $timeout, $location, $window, fileUpload, toaster) {

            $scope.isBuzz = false;
            $scope.isedit = false;
            //Datatable
            var datatable = function (foodCartList) {
                if (foodCartList.length > 0) {
                    $scope.showTable = false;
                } else {
                    $scope.showTable = true;
                }
                var table = $('#foodCart').DataTable({
                    data: foodCartList,
                    "pageLength": 5,
                    "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
                    "bDestroy": true,
                    columns: [
                        {
                            "data": "foodCartNo"
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
                                    return '<button id="edit" title="Edit cellsite" class="btn btn-success">Edit</button>';
                                    // return '<button id="edit" title="Edit cellsite" class="btn btn-success">Edit</button> <button  title="Delete Device" id="delete" class="btn btn-info">Delete</button> ';
                                }
                                return data;
                            }
                        }
                    ]
                });
                $('#foodCart tbody').on('click', '#edit', function () {
                    $scope.isedit = true;
                    var data = table.row($(this).parents('tr')).data();
                    if (data == undefined) {
                        console.log("Click undefined");
                    } else {
                        $scope.foodCartNo = data.foodCartNo;
                        $scope.venderName = data.venderName;
                        $scope.gateWay = data.gatewayId
                        $scope.id = data.id
                        $scope.$apply();
                        document.body.scrollTop = 0;
                        document.documentElement.scrollTop = 0;
                    }
                });
            }

            /** foodCart List */
            var getfoodCartList = function () {
                $http.get(config.host + '/foodCart')
                    .then(function (res) {
                        if (res.data.success == true) {
                            var foodCartList = res.data.items;
                            console.log("Device data: " + JSON.stringify(foodCartList));
                            datatable(foodCartList);
                        }
                    });
            }

            getfoodCartList();

            /** Add/Update foodCart*/
            var getFoodCartGateway = function () {
                $http.get(config.host + '/device/getFoodCartGateway')
                    .then(function (res) {
                        if (res.data.success == true) {
                            $scope.foodGatewayList = res.data.items;
                        }
                    });
            }

            getFoodCartGateway();

            $scope.addUpdatefoodCart = function () {
                if (!$scope.isedit) {
                    var foodCartData = {
                        "foodCartNo": $scope.foodCartNo,
                        "venderName": $scope.venderName,
                        "gatewayId": $scope.gateWay
                    };
                    $http.post(config.host + '/foodCart', foodCartData)
                        .then(function (res) {
                            if (res.data.success == true) {
                                var msg = res.data.message;
                                toaster.pop({
                                    type: 'success',
                                    body: msg,
                                    timeout: 3000
                                });
                                getfoodCartList();
                                $scope.foodCartNo = "";
                                $scope.venderName = "";
                                $scope.gateWay = "";
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
                    var foodCartData = {
                        "foodCartNo": $scope.foodCartNo,
                        "venderName": $scope.venderName,
                        "gatewayId": $scope.gateWay
                    };
                    console.log("Device Id: " + $scope.id)
                    console.log("Device Data: " + JSON.stringify(foodCartData));
                    $http.put(config.host + '/foodCart/' + $scope.id, foodCartData)
                        .then(function (res) {
                            if (res.data.success == true) {
                                $scope.isedit = false;
                                var msg = res.data.message;
                                toaster.pop({
                                    type: 'success',
                                    body: msg,
                                    timeout: 3000
                                });
                                getfoodCartList();
                                $scope.foodCartNo = "";
                                $scope.venderName = "";
                                $scope.gateWay = "";
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
            }

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
                    var fileName = "SampleFoodCartCSV";
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
                    var JsonData = [{ "foodCartNo": "", "venderName": "" }];
                    JSONToCSVConvertor(JsonData, true);
                });
            });
            /**code for sample csv ends */

            /** Upload CSV for Bulk Provisioning*/
            $scope.uploadCsv = function () {
                if ($scope.myFile) {
                    var file = $scope.myFile;
                    console.dir("Selected File Name: " + file.name);
                    console.dir(file);
                    var uploadUrl = config.host + "/foodCart/uploadCsv"
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
            $scope.$on('reloadTable', function (event) {
                console.log("Inside eventListner method");
                getfoodCartList();
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
        }
    }]);