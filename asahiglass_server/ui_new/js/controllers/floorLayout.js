'use strict';

/* Controllers */

angular.module('app')
    // Chart controller

    .controller('floorLayout', ['$scope', 'socketIO', '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window', 'FlashService',
        function ($scope, socketIO, $rootScope, $http, sessionInjector, config, Sessioncheck, $timeout, $location, $window, FlashService) {
            var canvs = document.getElementById("canvas");
            canvs.width = $("#imgcan").width();//1025;            
            canvs.height = $("#imgcan").height();
            var canvass = new fabric.Canvas('canvas');

            $scope.getFLoorList = function () {
                $scope.loading = true;
                $http.get(config.host + '/floor')
                    .then(function (res) {
                        if (res.data.success == true) {
                            $scope.floors = res.data.items;
                            $scope.loading = false;
                        }
                        else {
                            var errorMessage = res.data.message;
                            FlashService.showError(errorMessage);
                        }
                    });
            }

            $scope.showFloorPanel = function (data) {
                if (data) {
                    var result = JSON.parse(data),
                        floorId = result.id;
                    $scope.floorimg = result.floor_image;
                    $scope.floorName = result.name;

                    $scope.floorImage = {
                        'background-size': '100% 100%',
                        'background-image': 'url("' + result.floor_image + '")',
                        'background-repeat': "no-repeat",
                        "width": canvass.width,
                        "height": canvass.height
                    };

                    var plotLayer = function (points, zId, color, name) {
                        var nameNew = name.split(/[^A-Za-z0-9]/).join('\n');
                        var polygonCount = 1;
                        var ArrayLength;
                        var shape = "polygon" + polygonCount;
                        var point = points[0];
                        shape = new fabric.Polygon(points, {
                            fill: color,
                            PolygonNumber: polygonCount,
                            name: "Polygon",
                            id: zId,
                            selectable: true,
                            noofcircles: ArrayLength,
                            objectCaching: false
                        });

                        var text = new fabric.Text(nameNew, {
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
                        canvass.selection = false;
                        polygonCount++;
                        group.on('mousedown', function (params) {
                            group.set('selectable', true);
                            setTimeout(() => {
                                getMouse(zId);
                            }, 200);
                        });
                    }

                    $http.get(config.host + '/floor/' + floorId + '/zones')
                        .then(function (res) {
                            if (res.data.success == true) {
                                canvass.clear();
                                var zoneData = res.data.data.zones;
                                // console.log("Zone Data: " + JSON.stringify(zoneData));
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
                    $scope.showpanel = true;
                }
                else {
                    $scope.showpanel = false;
                }
            };

            function getMouse(params) {
                $window.sessionStorage.setItem('selectedZoneId', params);
                $window.location.href = '/#/app/dashboard';
            }

            // canvass.on('object:click', function (option) {
            //     console.log("Option is :", option);
            // });

            // canvass.on('object:moving', function (option) {
            //     var object = option.target;
            //     canvass.forEachObject(function (obj) {
            //         if (obj.name == "Polygon") {
            //             if (obj.PolygonNumber == object.polygonNo) {
            //                 var points = window["polygon" + object.polygonNo].get("points");
            //                 // console.log("Per Points: " + points)
            //                 points[object.circleNo - 1].x = object.left;
            //                 points[object.circleNo - 1].y = object.top;
            //                 window["polygon" + object.polygonNo].set({
            //                     points: points
            //                 });
            //             }
            //         }
            //     })
            //     canvass.renderAll();
            // });
            canvass.on('mouse:down', function (e) {
                canvass.selection = true;
            });
            canvass.on('mouse:down', function (e) {
                if (e.e.button == 1) {
                    canvass.selection = false;
                };
            });

            // socketIO.on('dashboard', function (data) {
            //     console.log("Dashboard socket data: " + JSON.stringify(data))
            // });

            $scope.loadData = function () {
                $scope.getFLoorList();
            }
        }
    ]);