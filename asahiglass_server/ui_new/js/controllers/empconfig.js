'use strict';
/* Controllers */
angular.module('app')
    .controller('empConfig', ['$scope', '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window', 'fileUpload', 'toaster',
        function ($scope, $rootScope, $http, sessionInjector, config, Sessioncheck, $timeout, $location, $window, fileUpload, toaster) {

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
                                    if (data.startsWith('http')) {
                                        return ' <img src="' + data + '?' + new Date().getTime() + '" style="border: 3px solid grey;" alt="Asset Image" height="50" width="50">';
                                    }
                                    else {
                                        return ' <i class="f-20  ' + data + '" ></i>'
                                    }

                                }
                            }
                        },
                        {
                            data: null,
                            render: function (data, type, row) {
                                if (type === 'display') {
                                    return '<button id="edit" title="Edit " class="btn btn-success">Edit</button>';
                                    // return '<button id="edit" title="Edit " class="btn btn-success">Edit</button> <button  title="Delete " id="delete" class="btn btn-info">Delete</button> ';
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
                        $scope.assetType = "" + data.type;
                        $scope.temp = [];
                        $scope.temp.push(JSON.parse(data.attribute_value));
                        $scope.Customers = [];
                        $scope.subTypeFeild = "" + data.subType;
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
                                $scope.subTypeArray.unshift({ id: "", name: "Select Subtype" });
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
                            // $scope.subType = res.data.data.subType[$scope.subTypeFeild - 1].id;;
                            //$scope.$apply();

                            for (var j = 0; j < $scope.subTypeArray.length; j++) {
                                if ($scope.subTypeFeild == $scope.subTypeArray[j].id) {
                                    $scope.subType = $scope.subTypeArray[j].id;
                                }

                            }
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
                                    $scope.samplecsvHeaders = JSON.parse(res.data.data.attribute_key);
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

                if (($scope.file == undefined) || ($scope.file == '')){
                    var isImageUpload = 0;
                }
                else{
                    var isImageUpload = 1;
                }

                if (!$scope.isedit) {
                    $http.post(config.host + '/employee' + "?isImageUpload=" + isImageUpload , assetData)
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
                                $scope.subTypeArray = [];
                                $scope.file = "";
                                $scope.assetName = ""
                                $scope.assetId = "";
                                $scope.asset_image = "";
                                $scope.angularData.nameList = [];
                                empList();
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
                    $http.put(config.host + '/employee/' + $scope.id + "?isImageUpload=" + isImageUpload , assetData)
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
                                $scope.subTypeArray = [];
                                $scope.file = "";
                                $scope.assetName = ""
                                $scope.assetId = "";
                                $scope.asset_image = "";
                                $scope.angularData.nameList = [];;
                                empList();
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
                    var fileName = "SampleAssetCSV";
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
                    var json = {};
                    $scope.samplecsvHeaders.splice(2, 0, "type");
                    $scope.samplecsvHeaders.splice(3, 0, "subType");
                    $scope.samplecsvHeaders.map(item => json[item] = "");
                    JSONToCSVConvertor([json], true);
                });
            });
            /**code for samplecsv ends */

            /** Upload CSV for Bulk Provisioning*/
            $scope.uploadCsv = function () {
                if ($scope.myFile) {
                    var file = $scope.myFile;
                    console.dir("Selected File Name: " + file.name);
                    console.dir(file);
                    var uploadUrl = config.host + "/employee/uploadCsv?assetTypeId=" + $scope.assetType + "";
                    fileUpload.uploadFileToUrl(file, uploadUrl);
                    $scope.myFile = "";
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
                empList();
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
    }]);;