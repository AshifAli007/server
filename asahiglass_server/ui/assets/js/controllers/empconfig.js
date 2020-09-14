'use strict';

/* Controllers */
angular.module('app')
    .controller('empConfig', ['$scope', 'md5', '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window', 'fileUpload',
        function ($scope, md5, $rootScope, $http, sessionInjector, config, Sessioncheck, $timeout, $location, $window, fileUpload) {

            $scope.isedit = false;

            var datatable = function (empList) {
                if (empList.length > 0) {
                    $scope.showTable = false;
                } else {
                    $scope.showTable = true;
                }
                var table = $('#assetTable').DataTable({
                    data: empList,
                    "pageLength": 5,
                    "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
                    "bDestroy": true,
                    columns: [
                        {
                            "data": "name"
                        },
                        {
                            "data": "assetTypeName",
                        },
                        {
                            "data": "uniqueId"

                        },
                        {
                            "data": "asset_image",
                            render: function (data, type, row) {
                                if (data == null) {
                                    return "";
                                } else {
                                    return ' <img src="' + data + '" style="border: 3px solid grey;" alt="Asset Image" height="50" width="50">';
                                }
                            }
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

                $('#assetTable tbody').on('click', '#edit', function () {
                    $scope.isedit = true;
                    var data = table.row($(this).parents('tr')).data();
                    if (data == undefined) {
                        console.log("Click undefined");
                    } else {
                        $scope.assetType = data.type;                        
                        $scope.temp = [];
                        $scope.temp.push(JSON.parse(data.attribute_value));
                        $scope.Customers = [];
                        $scope.subTypeFeild = data.subType;
                        $scope.id = data.id
                        getSubType(data.type);
                        document.body.scrollTop = 0;
                        document.documentElement.scrollTop = 0;
                    }
                });
            }

            var getSubType = function (type) {
                $http.get(config.host + '/assetType/' + type + '/subType')
                    .then(function (res) {
                        if (res.data.success == true) {
                            if (res.data.data.subType.length > 0) {
                                $scope.subTypeArray = res.data.data.subType;
                            }
                            else {
                                $scope.subTypeArray = [];
                            }
                            $scope.Customers = JSON.parse(res.data.data.attribute_key);
                            $scope.angularData = {
                                'nameList': []
                            };
                            angular.forEach($scope.Customers, function (v, k) {
                                $scope.angularData.nameList.push({
                                    'name': v,
                                    'value': ""
                                });
                            });

                            for (var i = 0; i < $scope.angularData.nameList.length; i++) {
                                var value = $scope.Customers[i];
                                $scope.angularData.nameList[i].value = $scope.temp[0][value];
                            }
                            $scope.subType = res.data.data.subType[$scope.subTypeFeild - 1].id;;
                            //$scope.$apply();
                        }
                    });
            }

            var empList = function () {
                $http.get(config.host + '/employee')
                    .then(function (res) {
                        if (res.data.success == true) {
                            var empList = res.data.items;
                            datatable(empList);
                        }
                    });
            }

            empList();

            /**getSubTypeList */
            $scope.getSubTypeList = function (id) {
                $scope.Customers = [];

                if (id) {
                    $http.get(config.host + '/assetType/' + id + '/subType')
                        .then(function (res) {
                            if (res.data.success == true) {
                                if (res.data.data.subType.length > 0) {
                                    $scope.subTypeArray = res.data.data.subType;
                                }
                                else {
                                    $scope.subTypeArray = [];
                                }
                                $scope.Customers = JSON.parse(res.data.data.attribute_key);
                                $scope.angularData = {
                                    'nameList': []
                                };
                                angular.forEach($scope.Customers, function (v, k) {
                                    $scope.angularData.nameList.push({
                                        'name': v,
                                        'value': ""
                                    });
                                });
                                $scope.angularData.nameList[0]["important"] = "true";
                                $scope.angularData.nameList[1]["important"] = "true";
                                console.log($scope.angularData.nameList);
                            }
                        });
                }
            }

            /**getAssetTypeList */
            var getAssetTypeList = function () {
                $http.get(config.host + '/assetType')
                    .then(function (res) {
                        if (res.data.success == true) {
                            $scope.assetTypeListArray = res.data.items;
                            console.log($scope.assetTypeListArray);
                        }
                    });
            }

            getAssetTypeList();

            $scope.validateImgSize = function (file) {
                if (file.filesize > 80000) {
                    alert("File is too big!");
                    $scope.file = "";
                };
            }

            /** Add and Edit Emp */
            $scope.addUpdateEmp = function () {
                var assetData = {
                    "assetType": $scope.assetType,
                    "asset_image": $scope.file,
                    "assetSubType": $scope.subType
                }
                var result = {};
                for (var i = 0; i < $scope.angularData.nameList.length; i++) {
                    result[$scope.angularData.nameList[i].name] = $scope.angularData.nameList[i].value;
                }
                assetData["attributes"] = result;

                if (!$scope.isedit) {
                    $http.post(config.host + '/employee', assetData)
                        .then(function (res) {
                            console.log("Asset Data: " + JSON.stringify(assetData));
                            $scope.assetType = "";
                            $scope.subType = "";
                            $scope.subTypeArray = [];
                            $scope.file = "";
                            $scope.assetName = ""
                            $scope.assetId = "";
                            $scope.asset_image = "";
                            $scope.angularData.nameList = [];;
                            empList();
                        });
                }
                else {
                    $scope.isedit = false;
                    $http.put(config.host + '/employee/' + $scope.id, assetData)
                        .then(function (res) {
                            console.log("Asset Data: " + JSON.stringify(assetData));
                            $scope.assetType = "";
                            $scope.subType = "";
                            $scope.subTypeArray = [];
                            $scope.file = "";
                            $scope.assetName = ""
                            $scope.assetId = "";
                            $scope.asset_image = "";
                            $scope.angularData.nameList = [];;
                            empList();
                        });
                }

            }

            /**Upload Configuration */
            $scope.uploadCsv = function () {
                var file = $scope.myFile;
                console.log('file is ');
                console.dir(file);
                var uploadUrl = config.host + "/employee/uploadCsv";
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
    }]);;