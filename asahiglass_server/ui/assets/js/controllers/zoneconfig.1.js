'use strict';

/* Controllers */

angular.module('app')
    // Chart controller

    .controller('zoneConfig', ['$scope', 'md5', '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window', 'fileUpload',
        function($scope, md5, $rootScope, $http, sessionInjector, config, Sessioncheck, $timeout, $location, $window, fileUpload) {

            var canvs = document.getElementById("canvas");
            canvs.width = $("#imgcan").width();
            canvs.height = $("#imgcan").height();

            $http.get(config.host + '/floor')
                .then(function(res) {
                    if (res.data.success == true) {
                        $scope.floors = res.data.items;
                    }
                });
            var floorData;
            $scope.showFloorPanel = function(data) {

                if (Object.keys(data).length > 0) {
                    floorData = JSON.parse(data);
                    $scope.showPanel = true;

                    $scope.floorImage = {
                        'background-size': '100% 100%',
                        'background-image': 'url("' + floorData.floor_image + '")',
                        'background-repeat': "no-repeat",
                        "width": JSON.stringify(canvs.width),
                        "height": JSON.stringify(canvs.height)
                    };



                } else {

                    $scope.showPanel = false;
                }

            };



            $scope.filterValue = function($event){
                var charCode = ($event.which) ? $event.which : $event.keyCode;
                if ((charCode > 31 && (charCode < 45 || charCode > 57))) {
                    $event.preventDefault();
            }
        }
            //Zone List
            var zoneList = function(type) {

                $http.get(config.host + '/zone')
                    .then(function(res) {
                        if (res.data.success == true) {
                            var deviceList = res.data.data;
                            console.log("Zone data: " + JSON.stringify(deviceList));
                            var table = $('#zone').DataTable({
                                data: deviceList,
                                "pageLength": 5,
                                "lengthMenu": [
                                    [5, 10, 25, 50, -1],
                                    [5, 10, 25, 50, "All"]
                                ],
                                "bDestroy": true,
                                columns: [

                                    {
                                        "data": "name"
                                    },

                                    {
                                        "data": "maxUsers"
                                    },

                                    {
                                        "data": "floorName"
                                    },
                                    {
                                        "data": "zone_image",
                                        render: function(data, type, row) {
                                            if (data == null) {
                                                return "";
                                            } else {
                                                return ' <img src="' + data + '" style="border: 3px solid grey;" alt="Zone Image" height="100" width="100">';
                                            }
                                        }
                                    },

                                    {
                                        data: null,
                                        render: function(data, type, row) {
                                            if (type === 'display') {
                                                return '<button id="edit" title="Edit cellsite" class="btn btn-success">Edit</button> <button  title="Delete Device" id="delete" class="btn btn-info">Delete</button> ';
                                            }
                                            return data;
                                        }

                                    }

                                ]
                            });

                        }
                    });

            };

            zoneList()




            var canvass = new fabric.Canvas('canvas');

            var polygonCount = 1;
            var startDrawingPolygon;
            var ArrayLength;
            var addTexture = false;
            var circleCount = 1;
            var fillColor = "rgba(46, 240, 56, 0.5)";
            var imageObj = new Image();


            var points = [];
            $scope.done = function() {
                imageObj.src = floorData.floor_image;
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
                console.log("croods point: " + JSON.stringify(points));
                // var width = 1201;
                // var height = 1005;
                // var pointss= [{

                //   "x": 994,
                //   "y": 60
                // }, {
                //   "x": 1146,
                //   "y": 58
                // }, {
                //   "x": 1148,
                //   "y": 239
                // }, {
                //   "x": 995,
                //   "y": 238
                // }];  //[{"x": 320, "y": 65}, {"x": 517, "y": 61}, {"x": 517, "y": 240}, {"x": 325, "y": 239}];
                // var newPoints;
                // if(width != canvs.width || height !=canvs.height){
                //   var newP = [];
                //   pointss.forEach(element => {
                //       var temObj = {};
                //       var x = element.x;
                //       var y = element.y;
                //       var a = x * canvs.width;
                //       var newX = a/width;
                //       var b = y * canvs.height;
                //       var newY = b/height;
                //       temObj.x = newX;
                //       temObj.y = newY;
                //       newP.push(temObj);
                //   });
                //   console.log("New X and Y axis: " + JSON.stringify(newP));
                //   newPoints = newP;
                // }else{
                //   console.log("Ponts in else: " + JSON.stringify(pointss));
                //   newPoints = pointss;
                // }


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

            $scope.Addpolygon = function() {
                startDrawingPolygon = true;
            }

            canvass.on('object:moving', function(option) {

                var object = option.target;
                canvass.forEachObject(function(obj) {
                    if (obj.name == "Polygon") {
                        if (obj.PolygonNumber == object.polygonNo) {
                            var points = window["polygon" + object.polygonNo].get("points");
                            console.log("Per Points: " + points)
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

            canvass.on('mouse:down', function(option) {

                if (option.target && option.target.name == "draggableCircle") {
                    return;
                } else {
                    if (addTexture) {
                        console.log(option);
                    }
                    if (startDrawingPolygon) {
                        var img = floorData.floor_image;
                        var pointer = canvass.getPointer(option.e);
                        console.log("dasd: " + JSON.stringify(pointer));
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


            //Add Device
            $scope.addZone = function() {
                var name = $scope.zoneName;
                var maxCount = $scope.maxCount;
                var floorData = $scope.floor;
                var floor = JSON.parse(floorData)
                var crood = points;
                console.log("all data name: " + name + " maxCount: " + maxCount + " floorId: " + floor.id + " crood: " + crood)
                var file = $scope.myFile;
                console.log('file is ');
                console.dir(file);
                var uploadUrl = config.host + "/zone?name=" + name + "&maxUsers=" + maxCount + "&floorId=" + floor.id + "&crood=" + JSON.stringify(crood) + "&width=" +canvs.width + "&height="+canvs.height;
                fileUpload.uploadFileToUrl(file, uploadUrl);

            }


        }
    ]).directive('fileModel', ['$parse', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function() {
                    scope.$apply(function() {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]).service('fileUpload', ['$http', function($http) {
        this.uploadFileToUrl = function(file, uploadUrl) {
            var fd = new FormData();
            fd.append('file', file);

            $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                })
                .success(function() {

                })
                .error(function() {});
        }
    }]);