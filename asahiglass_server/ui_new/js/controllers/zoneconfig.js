'use strict';

/ Controllers /
angular.module('app')
    .controller('zoneConfig', ['$scope', '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window', 'fileUpload', 'toaster', '$filter',
        function ($scope, $rootScope, $http, sessionInjector, config, Sessioncheck, $timeout, $location, $window, fileUpload, toaster, $filter) {
            $scope.isedit = false;
            $scope.isClear = false;
            var canvs = document.getElementById("canvas");
            canvs.width = $("#imgcan").width();
            canvs.height = $("#imgcan").height();

            var canvass = new fabric.Canvas('canvas');
            $scope.leds = config.Leds;

            var floors = function () {
                $http.get(config.host + '/floor')
                    .then(function (res) {
                        if (res.data.success == true) {
                            $scope.floors = res.data.items;
                        }
                    });
            }

            floors();

            var network = function () {
                $http.get(config.host + '/networks')
                    .then(function (res) {
                        if (res.data.success == true) {
                            $scope.networks = res.data.items;
                        }
                    });
            }

            network();

            var plotLayer = function (points, zId, color, name) {
                var polygonCount = 1;
                var ArrayLength;
                var shape = "polygon" + polygonCount;
                var point = points[0];
                shape = new fabric.Polygon(points, {
                    fill: color,
                    PolygonNumber: polygonCount,
                    name: "Polygon",
                    id: zId,
                    noofcircles: ArrayLength,
                    objectCaching: false
                });
                // console.log(shape);
                var text = new fabric.Text(name, {
                    fontSize: 20,
                    // left: point.x + shape.width/2, 
                    // top: point.y + shape.height/2, 
                    left: (shape.left + shape.width / 2) - 38,
                    top: shape.top + shape.height / 2,
                    fill: 'black'
                });
                var group = new fabric.Group([shape, text], {
                    selectable: false,
                });
                //canvass.remove(canvass.getActiveObject());
                canvass.add(group);
                canvs.setAttribute('id', zId);
                canvass.sendToBack(group);
                canvass.renderAll();
                polygonCount++;
            }

            var loadImg = function (data) {
                $scope.floors.forEach(function (key, val) {
                    if (data == key.id) {
                        $scope.showPanel = true;
                        $scope.floorImage = {
                            "width": canvass.width,
                            "height": canvass.height,
                            'background-size': '100% 100%',
                            'background-image': 'url("' + key.floor_image + '")',
                            'background-repeat': "no-repeat",
                        };
                        return;
                    }
                    else {

                    }
                });
            }

            var floorData;
            $scope.showFloorPanel = function (data) {
                if (data) {
                    try {
                        // var floorDatas = JSON.parse(data);
                        $scope.getSingleFLoorDetails(data);

                        var id = data;
                        $http.get(config.host + '/floor/' + id + '/zones')
                            .then(function (res) {
                                if (res.data.success == true) {
                                    canvass.clear();
                                    var zoneData = res.data.data.zones;
                                    var colors = ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(51,255,102,0.3)', 'rgba(255,0,255,0.3)', 'rgba(128,0,55,0.3)', 'rgba(0,0,153,0.3)', 'rgba(255,255,51,0.3)', 'rgba(153,255,0,0.3)', 'rgba(255,102,255,0.3)', 'rgba(51,0,0,0.3)', 'rgba(102,51,255,0.3)', 'rgba(153,255,0,0.3)', 'rgba(255,51,255,0.3)', 'rgba(255,255,51,0.3)'];
                                    var clrId = 0;
                                    zoneData.forEach(element => {
                                        var width = element.zone_width;
                                        var height = element.zone_height;
                                        var zId = element.id;
                                        var zName = element.name;
                                        var zoneCrood = JSON.parse(element.zone_crood);
                                        var newP = [];
                                        clrId++
                                        zoneCrood.forEach(element => {
                                            var temObj = {};
                                            var x = element.x;
                                            var y = element.y;
                                            var a = x * canvs.width;
                                            var newX = a / width;
                                            var b = y * canvs.height;
                                            var newY = b / height;
                                            temObj.x = newX;
                                            temObj.y = newY;
                                            newP.push(temObj);
                                        });
                                        plotLayer(newP, zId, colors[clrId - 1], zName);
                                    });
                                }
                            });
                    } catch (err) {
                        console.log(err)
                    }
                    loadImg(data);
                }
                else {
                    $scope.showPanel = false;
                    $scope.zoneName = "";
                    $scope.maxCount = "";
                    $scope.floor = "";
                    $scope.led = "";
                    $scope.network = "";
                    $scope.file = "";
                    angular.element("input[type='file']").val(null);
                    $scope.resetPoints();
                }
            };

            $scope.filterValue = function ($event) {
                var charCode = ($event.which) ? $event.which : $event.keyCode;
                if ((charCode > 31 && (charCode < 45 || charCode > 57))) {
                    $event.preventDefault();
                }
            }

            /**Zone List */
            var zoneList = function (type) {
                $http.get(config.host + '/zone')
                    .then(function (res) {
                        if (res.data.success == true) {
                            var deviceList = res.data.items;
                            if (deviceList.length > 0) {
                                $scope.showTable = false;
                            } else {
                                $scope.showTable = true;
                            }
                            var table = $('#zone').DataTable({
                                data: deviceList,
                                "pageLength": 5,
                                "lengthMenu": [
                                    [5, 10, 25, 50, -1],
                                    [5, 10, 25, 50, "All"]
                                ],
                                "bDestroy": true,
                                columns: [{
                                    "data": "floorName"
                                },
                                {
                                    "data": "name"
                                },
                                {
                                    "data": "zone_image",
                                    render: function (data, type, row) {
                                        if (data == null) {
                                            return "";
                                        } else {
                                            return ' <img id="imgBox" data-toggle="modal"  data-target="#floorlight" src="' + data + '?' + new Date().getTime() + '" style="border: 3px solid grey;" alt="Floor Image" height="100" width="100">';
                                        }
                                    }
                                },
                                {
                                    data: null,
                                    render: function (data, type, row) {
                                        if (type === 'display') {
                                            return '<button id="edit" title="Edit" class="btn btn-success">Edit</button>';
                                            // return '<button id="edit" title="Edit" class="btn btn-success">Edit</button> <button  title="Delete Device" id="delete" class="btn btn-info">Delete</button> ';
                                        }
                                        return data;
                                    }
                                }
                                ]
                            });
                            $('#zone tbody').on('click', '#imgBox', function () {
                                var data = table.row($(this).parents('tr')).data();
                                if (data == undefined) {
                                    console.log("Click undefined");
                                } else {
                                    $scope.img = data.zone_image;
                                    $scope.name_zone = data.name;
                                    $scope.$apply();
                                }
                            });
                            $('#zone tbody').on('click', '#edit', function () {
                                $scope.isedit = true;
                                var data = table.row($(this).parents('tr')).data();
                                if (data == undefined) {
                                    console.log("Click undefined");
                                } else {
                                    canvass.clear();
                                    $scope.getSingleFloorData = data;
                                    var filteredFloor = [];
                                    $scope.floors.forEach(function (key, val) {
                                        if (data.floorId == key.id) {
                                            filteredFloor = $scope.floors[val];
                                            return;
                                        }
                                        else {
                                            return;
                                        }
                                    });
                                    floorData = {
                                        "id": filteredFloor.id,
                                        "name": filteredFloor.name,
                                        "floorNo": filteredFloor.floorNo,
                                        "floor_image": filteredFloor.floor_image,
                                        "object": null,
                                        "entity": null,
                                        "creatorId": filteredFloor.creatorId
                                    };

                                    $scope.floor = "" + floorData.id;
                                    var colors = ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(51,255,102,0.3)', 'rgba(255,0,255,0.3)', 'rgba(128,0,55,0.3)', 'rgba(0,0,153,0.3)', 'rgba(255,255,51,0.3)', 'rgba(153,255,0,0.3)', 'rgba(255,102,255,0.3)', 'rgba(51,0,0,0.3)', 'rgba(102,51,255,0.3)', 'rgba(153,255,0,0.3)', 'rgba(255,51,255,0.3)', 'rgba(255,255,51,0.3)'];
                                    var zId = data.id;
                                    var zoneName = data.name;
                                    var zoneCrood = JSON.parse(data.zone_crood);
                                    $scope.zoneEditCroodPoints = zoneCrood;
                                    $scope.croodLength = zoneCrood.length;
                                    var newP = [];
                                    var clrId = 0;
                                    zoneCrood.forEach(element => {
                                        clrId++
                                        var temObj = {};
                                        var x = element.x;
                                        var y = element.y;
                                        temObj.x = x;
                                        temObj.y = y;
                                        newP.push(temObj);
                                    });
                                    loadImg($scope.floor);
                                    plotLayer(newP, zId, colors[clrId - 1], zoneName);
                                    $scope.removeButton = true;
                                    $scope.zoneName = zoneName;
                                    $scope.led = data.led;
                                    $scope.file = "";
                                    $scope.id = data.id
                                    $scope.network = data.networkId;
                                    $scope.$apply();
                                    document.body.scrollTop = 0;
                                    document.documentElement.scrollTop = 0;
                                }
                            });
                        }
                    });
            };
            zoneList();

            var polygonCount = 1;
            var startDrawingPolygon;
            var ArrayLength;
            var addTexture = false;
            var circleCount = 1;
            var fillColor = "rgba(46, 240, 56, 0.5)";
            var imageObj = new Image();
            var points = [];
            $scope.done = function () {
                if ($scope.isClear) {
                    points = [];
                    $scope.isClear = false;
                }
                $scope.croodLength = 0;
                imageObj.src = $scope.getSingleFloorData.floor_image;
                startDrawingPolygon = false;
                ArrayLength = circleCount;
                circleCount = 1;
                var tempCount = 0;
                var objects = canvass.getObjects();
                for (var i = 0; objects.length > i; i++) {
                    if (objects[i].polygonNo === polygonCount) {
                        points.push({
                            x: objects[i].left,
                            y: objects[i].top
                        });
                        canvass.renderAll();
                    }
                }

                $scope.croodLength = points.length;
                window["polygon" + polygonCount] = new fabric.Polygon(points, {
                    fill: fillColor,
                    PolygonNumber: polygonCount,
                    name: "Polygon",
                    selectable: false,
                    noofcircles: ArrayLength,
                    objectCaching: false
                });
                canvass.add(window["polygon" + polygonCount]);
                canvass.sendToBack(window["polygon" + polygonCount])
                canvass.renderAll();
                polygonCount++;
            }

            $scope.addPolygon = function () {
                startDrawingPolygon = true;
            }

            canvass.on('object:moving', function (option) {
                var object = option.target;
                canvass.forEachObject(function (obj) {
                    if (obj.name == "Polygon") {
                        if (obj.PolygonNumber == object.polygonNo) {
                            var points = window["polygon" + object.polygonNo].get("points");
                            // console.log("Per Points: " + points)
                            points[object.circleNo - 1].x = object.left;
                            points[object.circleNo - 1].y = object.top;
                            window["polygon" + object.polygonNo].set({
                                points: points
                            });
                        }
                    }
                })
                canvass.renderAll();
            });

            canvass.on('mouse:down', function (option) {
                if (option.target && option.target.name == "draggableCircle") {
                    return;
                } else {
                    if (addTexture) {
                        console.log(option);
                    }
                    if (startDrawingPolygon) {
                        var img = $scope.getSingleFloorData.floor_image;
                        var pointer = canvass.getPointer(option.e);
                        var circle = new fabric.Circle({
                            left: pointer.x,
                            top: pointer.y,
                            radius: 7,
                            hasBorders: false,
                            hasControls: false,
                            polygonNo: polygonCount,
                            name: "draggableCircle",
                            circleNo: circleCount,
                            fill: "rgba(0, 0, 0, 0.5)",
                            hasRotatingPoint: false,
                            originX: 'center',
                            originY: 'center'
                        });
                        canvass.add(circle);
                        circleCount++;
                    }
                }
            });

            $scope.resetPoints = function () {
                plotLayer([], '', '', '');
                $scope.isClear = true;
                $scope.croodLength = 0;
                canvass.clear();
            }

            /**AddUpdate Zone */
            $scope.addUpdateZone = function () {
                if (!$scope.isedit) {
                    var name = $scope.zoneName;
                    var maxCount = $scope.maxCount;
                    var floorData = $scope.floor;
                    var networkId = $scope.network;
                    var led
                    if ($scope.led === undefined || $scope.led === "") {
                        led = null;
                    } else {
                        led = $scope.led;
                    }
                    var floor = JSON.parse(floorData)
                    var crood = points;
                    var isImageUpload = 1;
                    var file = $scope.myFile;
                    var uploadUrl = config.host + "/zone?name=" + name + "&maxUsers=" + maxCount + "&floorId=" + floor + "&crood=" + JSON.stringify(crood) + "&width=" + canvs.width + "&height=" + canvs.height + "&networkId=" + networkId + "&isImageUpload=" + isImageUpload;
                    var fileU = fileUpload.uploadFileToUrl(file, uploadUrl, $scope.isedit);
                    fileU.then(function (data) {
                        if (data.data.success == true) {
                            var msg = data.data.message;
                            toaster.pop({
                                type: 'success',
                                body: msg,
                                timeout: 3000
                            });
                            $scope.isClear = true;
                            zoneList();
                            floors();
                            $scope.showPanel = false;
                            $scope.zoneName = "";
                            $scope.maxCount = "";
                            $scope.floor = "";
                            $scope.led = "";
                            $scope.network = "";
                            $scope.file = "";
                            $scope.myFile = "";
                            $scope.croodLength = 0;
                            angular.element("input[type='file']").val(null);
                        } else {
                            alert("HI")
                            var msg = data.data.message;
                            toaster.pop({
                                type: 'error',
                                body: msg,
                                timeout: 3000
                            });
                        }
                    });
                } else {
                    var name = $scope.zoneName;
                    var maxCount = $scope.maxCount;
                    var floorData = $scope.floor;
                    var networkId = $scope.network;
                    var led
                    if ($scope.led === undefined || $scope.led === "") {
                        led = null;
                    } else {
                        led = $scope.led;
                    }
                    var floor = JSON.parse(floorData);
                    if (points.length == 0) {
                        var crood = $scope.zoneEditCroodPoints;
                    }
                    else {
                        var crood = points;
                    }
                    var file = $scope.myFile;
                    if ((file == undefined) || (file == '')) {
                        var isImageUpload = 0;
                    }
                    else {
                        var isImageUpload = 1;
                    }
                    // var uploadUrl = config.host + "/zone/" + $scope.id + "?name=" + name + "&maxUsers=" + maxCount + "&floorId=" + floor + "&crood=" + JSON.stringify(crood) + "&width=" + canvs.width + "&height=" + canvs.height + "&led=" + led + "&networkId=" + networkId;
                    var uploadUrl = config.host + "/zone/" + $scope.id + "?name=" + name + "&maxUsers=" + maxCount + "&floorId=" + floor + "&crood=" + JSON.stringify(crood) + "&width=" + canvs.width + "&height=" + canvs.height + "&networkId=" + networkId + "&isImageUpload=" + isImageUpload;
                    var fileU = fileUpload.uploadFileToUrl(file, uploadUrl, $scope.isedit);
                    fileU.then(function (data) {
                        if (data.data.success == true) {
                            $scope.isedit = false;
                            var msg = data.data.message;
                            toaster.pop({
                                type: 'success',
                                body: msg,
                                timeout: 3000
                            });
                            $scope.isClear = true;
                            zoneList();
                            floors();
                            $scope.showPanel = false;
                            $scope.zoneName = "";
                            $scope.maxCount = "";
                            $scope.floor = "";
                            $scope.led = "";
                            $scope.network = "";
                            $scope.file = "";
                            $scope.myFile = "";
                            $scope.croodLength = 0;
                            // canvass.clear();
                            angular.element("input[type='file']").val(null);
                        } else {
                            $scope.isedit = true;
                            var msg = data.data.message;
                            toaster.pop({
                                type: 'error',
                                body: msg,
                                timeout: 3000
                            });
                        }
                    });
                }
            }


            $scope.getSingleFLoorDetails = function (data) {
                $scope.floors.forEach(function (key, val) {
                    if (data == key.id) {
                        $scope.getSingleFloorData = $scope.floors[val];
                        return;
                    }
                    else {
                        return;
                    }
                });
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
        this.uploadFileToUrl = function (file, uploadUrl, isEdit) {
            var fd = new FormData();
            fd.append('file', file);
            if (!isEdit) {
                return $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined }
                }).then(function (data) {
                    return data;
                });
            }
            else {
                return $http.put(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined }
                }).then(function (data) {
                    return data;
                });
            }
        };
    }]);