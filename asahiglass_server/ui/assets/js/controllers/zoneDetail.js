'use strict';

/* Controllers */

angular.module('app')
    // Chart controller

    .controller('zoneDetail', ['$scope', 'socketIO', 'md5', '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window', 
        function($scope, socketIO, md5, $rootScope, $http, sessionInjector, config, Sessioncheck, $timeout, $location, $window) {
           
           var zoneId =  $window.sessionStorage.getItem('ZoneId');
          //  alert(zoneId)

            //Zone List
            $http.get(config.host + '/zone/'+zoneId)
            .then(function(res) {
                if(res.data.success == true){
                    var zoneData = res.data.data;
                 //   alert("Zone data: " + JSON.stringify(zoneData));
                    $scope.zoneDetail = zoneData[0];
                    $scope.zoneName = zoneData[0].name;
                }    
            });
            var ids = []; 
            $scope.openTost = function(a){
                ids.push(a);                

                ids.forEach(element => {
                    console.log("ele: ", element)
                    if(element != a){
                        document.getElementById(element).style.display = "none";
                    }else{
                        document.getElementById(a).style.display = "block";
                    }
                });

            };

            $scope.CloseToast = function(a){
                document.getElementById(a).style.display = "none";
            };
            //Zone Detail
            var listEnterasset = function(){
                $http.get(config.host + '/zone/'+zoneId+'/listEnteredAssets')
                .then(function(res) {
                    if(res.data.success == true){
                        var data = res.data.items;
                       
                       var arr = [];
                        data.forEach(asset => {
                            var tempObj = {};
                            tempObj["assetName"] = asset.name;
                            var date = new Date(parseInt(asset.entryTime));
                            tempObj["fromnow"] = moment(date).fromNow();
                            tempObj["message"] = asset.message;
                            tempObj["icon"] = asset.icon;
                            tempObj["assetImg"] = asset.asset_image;
                            tempObj["assetType"] = asset.type;
                            tempObj["isAllowed"] = asset.isAllowed;
                            tempObj["assetType"] = asset.assetTypeName;
                            tempObj['id'] = asset.id;
                            tempObj['subType'] = asset.subTypeName;
                            var clr;
                            if(asset.isAllowed == 1){
                                clr = {
                                    "font-size": "20px",
                                    "padding": "8px",
                                    "border-radius": "59%",
                                    "color":"white",
                                    "background": "green"
                                }
                            }else{
                                clr = {
                                    "font-size": "20px",
                                    "padding": "8px",
                                    "border-radius": "59%",
                                    "color":"white",
                                    "background": "red"
                                }
                            }
                            tempObj['clr'] = clr;
                            arr.push(tempObj);
                       });
                       
                      
                       $scope.assetData = arr;
                        
                    }    
                });
            }
            listEnterasset();


            socketIO.on('dashboard', function(data) {
                console.log("Dashboard socket data: " + JSON.stringify(data))
                listEnterasset();
            });

        }
    ]);