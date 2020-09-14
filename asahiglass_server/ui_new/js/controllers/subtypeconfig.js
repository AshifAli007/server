'use strict';

/* Controllers */

angular.module('app')
    // Chart controller

    .controller('subtypeConfig', ['$scope', '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window', 'fileUpload', 'toaster',
        function ($scope, $rootScope, $http, sessionInjector, config, Sessioncheck, $timeout, $location, $window, fileUpload, toaster) {
            $scope.IsVisible = true;
            $scope.isBuzz = false;
            $scope.isedit = false;
            //Datatable
            var datatable = function (assetTypeList) {
                if (assetTypeList.length > 0) {
                    $scope.showTable = false;
                } else {
                    $scope.showTable = true;
                }
                var table = $('#subtype').DataTable({
                    data: assetTypeList,
                    "pageLength": 5,
                    "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
                    "bDestroy": true,
                    columns: [
                        {
                            "data": "assetTypeName"
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
                $('#subtype tbody').on('click', '#edit', function () {
                    $scope.isedit = true;
                    var data = table.row($(this).parents('tr')).data();
                    if (data == undefined) {
                        console.log("Click undefined");
                    } else {
                        $scope.IsVisible = false;
                        $scope.assetType = "" + data.assetTypeId;
                        $scope.subType = data.name;
                        $scope.id = data.id
                        $scope.$apply();
                        document.body.scrollTop = 0;
                        document.documentElement.scrollTop = 0;
                    }
                });
            }

            //AssetSubType List 
            var getAssetSubTypeList = function () {
                $http.get(config.host + '/assetType/subType')
                    .then(function (res) {
                        if (res.data.success == true) {
                            var assetTypeList = res.data.items;
                            datatable(assetTypeList);
                        }
                    });
            }

            getAssetSubTypeList();

            var asstTypeList = function () {
                $http.get(config.host + '/assetType')
                    .then(function (res) {
                        if (res.data.success == true) {
                            $scope.assetTypeListArray = res.data.items;
                        }
                    });
            }

            asstTypeList();

            /** Add/Update Asset SubType Configuration*/
            $scope.addUpdateAssetSubtype = function () {
                if (!$scope.isedit) {
                    var parms = {
                        "name": $scope.subType
                    }
                    $http.post(config.host + '/assetType/' + $scope.assetType + '/subType', parms)
                        .then(function (res) {
                            if (res.data.success == true) {
                                var msg = res.data.message;
                                toaster.pop({
                                    type: 'success',
                                    body: msg,
                                    timeout: 3000
                                });
                                $scope.assetType = "";
                                $scope.subType = "";
                                getAssetSubTypeList();
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
                    var parms = {
                        "name": $scope.subType
                    }
                    $http.put(config.host + '/assetType/' + $scope.assetType + '/subType/' + $scope.id, parms)
                        .then(function (res) {
                            if (res.data.success == true) {
                                $scope.isedit = false;
                                var msg = res.data.message;
                                toaster.pop({
                                    type: 'success',
                                    body: msg,
                                    timeout: 3000
                                });
                                $scope.assetType = "";
                                $scope.subType = "";
                                getAssetSubTypeList();
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