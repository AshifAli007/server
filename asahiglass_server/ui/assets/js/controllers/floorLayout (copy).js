'use strict';

/* Controllers */

angular.module('app')
    // Chart controller

    .controller('floorLayout', ['$scope', 'socketIO', 'md5', '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window',
        function ($scope, socketIO, md5, $rootScope, $http, sessionInjector, config, Sessioncheck, $timeout, $location, $window) {
            var canvs = document.getElementById("canvas");
            var ctx = canvs.getContext("2d");
            canvs.width = $("#imgcan").width();//1025;            
            canvs.height = $("#imgcan").height();

            $http.get(config.host + '/floor')
                .then(function (res) {
                    if (res.data.success == true) {
                        $scope.floors = res.data.items;
                    }
                });

            $scope.showFloorPanel = function (data) {
                if (data.length > 0) {
                    $scope.showpanel = true;
                } else {
                    $scope.showpanel = false;
                }

                var result = JSON.parse(data),
                    floorId = result.id;
                $scope.floorimg = result.floor_image;
                $scope.floorName = result.name;
                $scope.floorImage = {
                    'background-size': '100% 100%',
                    'background-image': 'url("' + result.floor_image + '")',
                    'background-repeat': "no-repeat",
                    "width": JSON.stringify(canvs.width),
                    "height": JSON.stringify(canvs.height)
                };
                var canvass = new fabric.Canvas('canvas');
                //var canvas = new fabric.CanvasEx('canvas');
                var polygonCount = 1;
                //var fillColor = "rgba(46, 240, 56, 0.5)";
                var fillColor = "rgb(255,0,255)";
                var ArrayLength;

                var plotLayer = function (points, zId, color) {
                    //alert(points)

                    var shape = "polygon" + polygonCount;
                    shape = new fabric.Polygon(points, {
                        fill: color,
                        PolygonNumber: polygonCount,
                        name: "Polygon",
                        id: zId,
                        selectable: true,
                        noofcircles: ArrayLength,
                        objectCaching: false,
                    });

                    var text = new fabric.Text('hello world', {
                       
                        fontSize: 30,
                        originX: 'center',
                        originY: 'center'

                    });

                    var group = new fabric.Group([ shape,text  ], {

                          left: 150,
  top: 100,
  angle: -10
                      });

                    canvass.add(group);
                    canvs.setAttribute('id', zId);
                    canvass.sendToBack(group);
                    canvass.renderAll();
                    polygonCount++;
                    group.on('selected', function (params) {
                        shape.set('selectable', false);
                        setTimeout(() => {
                            getMouse(zId);
                        }, 200);
                    });
                }

                $http.get(config.host + '/floor/' + floorId + '/zones')
                    .then(function (res) {
                        if (res.data.success == true) {
                            var zoneData = res.data.data.zones;
                            console.log("Zone Data: " + JSON.stringify(zoneData));
                            var colors = ['red', 'green', 'blue', 'cyan'];
                            
                            zoneData.forEach(element => {
                                var width = element.zone_width;
                                var height = element.zone_height;
                                var zId = element.id;
                                var zoneCrood = JSON.parse(element.zone_crood);
                                var newP = [];
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
                                plotLayer(newP, zId, colors[zId - 1]);
                            });
                        }
                    });
            };

            function getMouse(params) {
                // $window.sessionStorage.setItem('ZoneId', params);
                // $window.location.href = '/#/app/zonedetail';
            }
            socketIO.on('dashboard', function (data) {
                console.log("Dashboard socket data: " + JSON.stringify(data))
            });
        }
    ]);