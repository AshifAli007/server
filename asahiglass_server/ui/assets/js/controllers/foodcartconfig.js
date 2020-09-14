'use strict';

/* Controllers */
angular.module('app')
    .controller('foodcartConfig', ['$scope', 'md5', '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window', 'fileUpload', 'toaster',
        function ($scope, md5, $rootScope, $http, sessionInjector, config, Sessioncheck, $timeout, $location, $window, fileUpload, toaster) {

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
                                    return '<button id="edit" title="Edit cellsite" class="btn btn-success">Edit</button> <button  title="Delete Device" id="delete" class="btn btn-info">Delete</button> ';
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
                                    type: 'warning',
                                    body: msg,
                                    timeout: 3000
                                });
                                $scope.foodCartNo = "";
                                $scope.venderName = "";
                                $scope.gateWay = "";
                            }
                        });
                }
                else {
                    $scope.isedit = false;
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
                                    type: 'warning',
                                    body: msg,
                                    timeout: 3000
                                });
                                console.log("Res data: " + JSON.stringify(res));
                                $scope.foodCartNo = "";
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
                var uploadUrl = config.host + "/foodCart/uploadCsv";
                fileUpload.uploadFileToUrl(file, uploadUrl);
                getfoodCartList();
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