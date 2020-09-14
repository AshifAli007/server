'use strict';

/* Controllers */
angular.module('app')
    .controller('assettypeConfig', ['$scope', '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window', 'fileUpload', 'toaster',
        function ($scope, $rootScope, $http, sessionInjector, config, Sessioncheck, $timeout, $location, $window, fileUpload, toaster) {
            $scope.IsVisible = true;
            $scope.isBuzz = false;
            $scope.isedit = false;
            $scope.icons = config.font_awsom_icon;

            $scope.selectIcon = function (cls) {
                $scope.assetIcon = cls;
            };

            var datatable = function (assetList) {
                if (assetList.length > 0) {
                    $scope.showTable = false;
                } else {
                    $scope.showTable = true;
                }
                var table = $('#assettype').DataTable({
                    data: assetList,
                    "pageLength": 5,
                    "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
                    "bDestroy": true,
                    columns: [
                        {
                            "data": "name"
                        },
                        {
                            "data": "icon",
                            render: function (data, type, row) {
                                if (type === 'display') {
                                    return '<i class="' + data + '" style="font-size: 41px;"></i>';
                                }
                                return data;
                            }
                        },
                        {
                            "data": "attribute_key",
                            render: function (data, type, row) {
                                return data;
                            }
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

                $('#assettype tbody').on('click', '#edit', function () {
                    $scope.isedit = true;
                    var data = table.row($(this).parents('tr')).data();
                    if (data == undefined) {
                        console.log("Click undefined");
                    } else {
                        $scope.assetTypeName = data.name;
                        $scope.assetIcon = data.icon;
                        $scope.id = data.id
                        $scope.Customers = [];
                        // iterate over each element in the array
                        for (var i = 0; i < JSON.parse(data.attribute_key).length; i++) {
                            var customer = {};
                            customer.Name = JSON.parse(data.attribute_key)[i];
                            $scope.Customers.push(customer);
                        }
                        $scope.$apply();
                        document.body.scrollTop = 0;
                        document.documentElement.scrollTop = 0;
                    }
                });
            }

            /**default atrributes array */
            $scope.Customers = [
                {
                    Name: "name"
                },
                {
                    Name: "uniqueId"
                }
            ];

            $scope.Add = function () {
                //Add the new item to the Array.
                var customer = {};
                customer.Name = $scope.Name;
                // iterate over each element in the array
                for (var i = 0; i < $scope.Customers.length; i++) {
                    // look for the entry with a matching `Name` value
                    if (($scope.Customers[i].Name).toLowerCase() == ($scope.Name).toLowerCase()) {
                        toaster.pop({
                            type: 'error',
                            body: $scope.Name + ' attribute is already exists, Please choose different attribute name.',
                            timeout: 3000
                        });
                        // alert($scope.Name + ' attribute is already exists, Please choose different attribute name.')
                        return;
                    }
                }
                $scope.Customers.push(customer);
                //Clear the TextBox.
                $scope.Name = "";
            };


            $scope.Remove = function (index) {
                //Find the record using Index from Array.
                $scope.attributeName = $scope.Customers[index].Name;
                $scope.attributeId = index;
                $('#deleteModal').modal('show');
            }

            $scope.Confirm = function () {
                $scope.Customers.splice($scope.attributeId, 1);
            }

            var assetTypeList = function () {
                $http.get(config.host + '/assetType')
                    .then(function (res) {
                        if (res.data.success == true) {
                            var assetList = res.data.items;
                            datatable(assetList);
                        }
                    });
            }

            assetTypeList();

            /** Add/Update assetTypes*/
            $scope.addUpdateAssetType = function (Customers) {
                if (!$scope.isedit) {
                    console.log("Inside Add AssetType: " + JSON.stringify(Customers));
                    var tempObj = {};
                    tempObj["assetTypeName"] = $scope.assetTypeName;
                    tempObj["icon"] = $scope.assetIcon;
                    var data = tempObj;
                    data["attributes"] = [];
                    var attributesArray = [];
                    for (var i = 0; i < Customers.length; i++) {
                        attributesArray.push(Customers[i].Name);
                    }
                    data["attributes"] = attributesArray;
                    console.log("data new: " + JSON.stringify(data));
                    $http.post(config.host + '/assetType', data)
                        .then(function (res) {
                            if (res.data.success == true) {
                                var msg = res.data.message;
                                toaster.pop({
                                    type: 'success',
                                    body: msg,
                                    timeout: 3000
                                });
                                $scope.assetTypeName = "";
                                $scope.assetIcon = "";
                                Customers.splice(2);
                                assetTypeList();
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
                    console.log("Inside Update AssetType: " + JSON.stringify(Customers));
                    var tempObj = {};
                    tempObj["assetTypeName"] = $scope.assetTypeName;
                    tempObj["icon"] = $scope.assetIcon;
                    var data = tempObj;
                    data["attributes"] = [];
                    var attributesArray = [];
                    for (var i = 0; i < Customers.length; i++) {
                        attributesArray.push(Customers[i].Name);
                    }
                    data["attributes"] = attributesArray;
                    console.log("data new: " + JSON.stringify(data));
                    $http.put(config.host + '/assetType/' + $scope.id, data)
                        .then(function (res) {
                            if (res.data.success == true) {
                                $scope.isedit = false;
                                var msg = res.data.message;
                                toaster.pop({
                                    type: 'success',
                                    body: msg,
                                    timeout: 3000
                                });
                                $scope.assetTypeName = "";
                                $scope.assetIcon = "";
                                Customers.splice(2);
                                assetTypeList();
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
            /**Upload CSV */
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