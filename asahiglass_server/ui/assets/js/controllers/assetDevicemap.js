'use strict';

/* Controllers */

angular.module('app')
    // Chart controller

    .controller('assetDeviceMapping', ['$scope', 'md5', '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window', 
        function($scope, md5, $rootScope, $http, sessionInjector, config, Sessioncheck, $timeout, $location, $window) {

            //Beacon Device list
            $http.get(config.host + '/device/beacon')
            .then(function(res) {
                if(res.data.success == true){
                    var baeconList = res.data.data;
                    console.log("Beacon data: " + JSON.stringify(baeconList));  
                    $scope.beacons = baeconList;
                }    
            });


            //Zone List
            $http.get(config.host + '/employee')
            .then(function(res) {
                if(res.data.success == true){
                    var assetData = res.data.data;
                    console.log("Asset data: " + JSON.stringify(assetData));  
                    $scope.assets = assetData;
                }    
            });

            //Emp List
            var mapping = function(){


                $http.get(config.host + '/device/mapAssetAndDevice')
                .then(function(res) {
                    if(res.data.success == true){
                        var mapList = res.data.data;
                        
                        var table = $('#mappiguserzone').DataTable({
                            data: mapList,
                            "pageLength": 5,
                            "lengthMenu": [ [5, 10, 25, 50, -1], [5, 10, 25, 50, "All"] ],
                            "bDestroy": true,
                            columns: [
                                {
                                    "data": "assetName"
                             
                                },
                                {
                                    "data": "assetType",
                                    render: function(data, type, row) {
                                        if(data == 1){
                                            return "Machine";
                                        }else{
                                            return "Person";
                                        }
                                    }
                                },
                                {
                                    "data": "name"
                                },
                                {
                                    "data": "isBuzz",
                                    render: function(data, type, row) {
                                        if(data == 1){
                                            return "True";
                                        }else{
                                            return "False";
                                        }
                                    }
                                },

                                {
                                    data: null,
                                    render: function(data, type, row) {
                                        if (type === 'display') {
                                            return '<button id="edit" title="release " class="btn btn-success">Release</button>  ';
                                        }
                                        return data;
                                    }
                                   
                                }
            
                            ]            
                        });
                   
                    }    
                });
                
            }

            mapping()


            //Add Mapping
            $scope.mappingassetdevice = function(){
                var assetid = $scope.asset;
                var beaconId = $scope.beacon

                
                var mappingData = {
                    "assetId": assetid
                }
                console.log("Mapping Data: " + JSON.stringify(mappingData))
            
                $http.post(config.host + '/device/'+beaconId+'/mapAssetAndDevice', mappingData)
                .then(function (res) {
                    console.log("Res data: " + JSON.stringify(res));
                    $scope.asset = "";
                    $scope.beacon = "";
                    mapping();
                });
            }


        }
    ]);