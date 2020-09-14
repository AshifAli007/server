'use strict';

/* Controllers */
angular.module('app')
    .controller('floorConfig', ['$scope', 'md5', '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window', 'fileUpload', 'toaster',
        function ($scope, md5, $rootScope, $http, sessionInjector, config, Sessioncheck, $timeout, $location, $window, fileUpload, toaster) {
            $scope.isedit = false;
            $scope.IsVisible = true;

            //Floor List
            var floorList = function (type) {
                $http.get(config.host + '/floor')
                    .then(function (res) {
                        if (res.data.success == true) {
                            var deviceList = res.data.items;
                            if (deviceList.length > 0) {
                                $scope.showTable = false;
                            } else {
                                $scope.showTable = true;
                            }
                            var table = $('#floor').DataTable({
                                data: deviceList,
                                "pageLength": 5,
                                "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
                                "bDestroy": true,
                                columns: [
                                    {
                                        "data": "name"
                                    },
                                    {
                                        "data": "floorNo"
                                    },
                                    {
                                        "data": "floor_image",
                                        render: function (data, type, row) {
                                            if (data == null) {
                                                return "";
                                            } else {
                                           
                                                return ' <img id="imgBox" data-toggle="modal"  data-target="#floorlight" src="' + data + '?'+new Date().getTime()+'" style="border: 3px solid grey;" alt="Floor Image" height="100" width="100">';
                                            }
                                        }
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
                            $('#floor tbody').on('click', '#edit', function () {
                                $scope.isedit = true;
                                var data = table.row($(this).parents('tr')).data();
                                if (data == undefined) {
                                    console.log("Click undefined");
                                } else {
                                    $scope.name = data.name;
                                    $scope.floorno = data.floorNo + "";
                                    $scope.id = data.id
                                    $scope.myFile = "";
                                    $scope.$apply();
                                    document.body.scrollTop = 0;
                                    document.documentElement.scrollTop = 0;
                                }
                            });

                            $('#floor tbody').on('click', '#imgBox', function() {
                                var data = table.row($(this).parents('tr')).data();
                                if (data == undefined) {
                                    console.log("Click undefined");
                                } else {
                             
                                    $scope.img = data.floor_image;
                                    $scope.name_zone = data.name;
                                    $scope.$apply();
                                }
                            });                            
                        }
                    });
            }

            floorList();

            $scope.filterValue = function ($event) {
                var charCode = ($event.which) ? $event.which : $event.keyCode;
                if ((charCode > 31 && (charCode < 45 || charCode > 57 && !(charCode == 173)))) {
                    $event.preventDefault();
                }
            };


            //Add Floor
            $scope.addFloor = function () {
                var name = $scope.name;
                var floorno = $scope.floorno;
                var file = $scope.myFile;
                var uploadUrl = config.host + "/floor/uploadImage?name=" + name + "&floorNo=" + floorno;
                var fileUrl = fileUpload.uploadFileToUrl(file, uploadUrl);
                fileUrl.then(function (data) {
                    if (data.data.success == true) {
                        var msg = data.data.message;
                        toaster.pop({
                            type: 'success',
                            body: msg,
                            timeout: 3000
                        });
                        floorList();
                        $scope.name = "";
                        $scope.floorno = "";
                        $scope.myFile = "";
                    } else {
                        var msg = data.data.message;
                        toaster.pop({
                            type: 'warning',
                            body: msg,
                            timeout: 3000
                        });
                        $scope.name = "";
                        $scope.floorno = "";
                        $scope.myFile = "";
                    }
                });
            };

            /**Update the Floor */
            $scope.updateFloor = function () {
                var name = $scope.name;
                var floorno = $scope.floorno;
                var file = $scope.myFile;
                var uploadUrl = config.host + "/floor/" + $scope.id + "?name=" + name + "&floorNo=" + floorno;
                var fileUrl = fileUpload.uploadFileToUrlUpdate(file, uploadUrl);
                fileUrl.then(function (data) {
                    if (data.data.success == true) {
                        var msg = data.data.message;
                        toaster.pop({
                            type: 'success',
                            body: msg,
                            timeout: 3000
                        });
                        floorList();
                        $scope.name = "";
                        $scope.floorno = "";
                        $scope.myFile = "";
                        $scope.isedit = false;
                    } else {
                        var msg = data.data.message;
                        toaster.pop({
                            type: 'warning',
                            body: msg,
                            timeout: 3000
                        });
                        $scope.name = "";
                        $scope.floorno = "";
                        $scope.myFile = "";
                        $scope.isedit = false;
                    }
                });
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
            return $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }).then(function (data) {
                return data;
            });
        };
        this.uploadFileToUrlUpdate = function (file, uploadUrl) {
            var fd = new FormData();
            fd.append('file', file);
            return $http.put(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }).then(function (data) {
                return data;
            });
        };
    }]);