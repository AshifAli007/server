'use strict';

/* Controllers */

angular.module('app')
    // Chart controller

    .controller('DeviceAssetProvi', ['$scope', 'md5', 'socketIO', '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window', 'toaster',
        function($scope, md5,socketIO, $rootScope, $http, sessionInjector, config, Sessioncheck, $timeout, $location, $window, toaster) {
            $scope.showMsg = false;
            $scope.errMsg = false;
            $scope.showMsgSpinner = false;
            $scope.ScanDisable = false;
            var timerLength = 60;
            var timeoutID;
            var finishTime;

            

            $http.get(config.host + '/device/provisioningdevice')
            .then(function(res) {
                if(res.data.success == true){
              
                    $scope.proDevices = res.data.items;
               
                }    
            });

            $http.get(config.host + '/employee')
            .then(function(res) {
                if(res.data.success == true){
                
                    $scope.assetDetails = res.data.items;
               
                }    
            });


            var datatable = function(){
                $http.get(config.host + '/device/provisioneddevice')
                .then(function(res) {
                    if(res.data.success == true){
                  
                        
                        var table = $('#proDevices').DataTable({
                            data: res.data.items,
                            "pageLength": 5,
                            "lengthMenu": [ [5, 10, 25, 50, -1], [5, 10, 25, 50, "All"] ],
                            "bDestroy": true,
                            columns: [
                                {
                                    "data": "name"
                                },
                                {
                                    "data": "deviceType",
                                    render: function(data, type, row){
                                        
                                        if(data == null){
                                            return "";
                                        }else if(data == 1){
                                            return "Beacon";
                                        }else if(data == 2){
                                            return "Reciver";
                                        }else if(data == 3){
                                            return "Gateway";
                                        }else if(data == 4){
                                            return "Test Beacon";
                                        }else if(data == 5){
                                            return "RFID Card";
                                        }else if(data == 6){
                                            return "Bus Gateway";
                                        }else if(data == 7){
                                            return "Food Cart Gateway";
                                        }else if(data == 8){
                                            return "Control Room Gateway";
                                        }else if(data == 9){
                                            return "Provisioning Device Gateway";
                                        }
                                    }
                                },
                                {
                                    "data": "serial"
                                },
                                {
                                    "data": "deviceName"
                                }
            
                            ]            
                            
                            
                        });
                    }    
                });

         
            }

            datatable();


            var socketData = function(data){
                //alert(JSON.stringify(data));
                $window.localStorage.setItem('gatewaySerial', "");
                $window.localStorage.setItem('deviceType', "");
                if(data.success === true){
                    $scope.deviceSerial = data.serialNo;
                    $scope.deviceName = data.name;
                    $scope.showMsg = false;
                    $scope.showBtn = true;
                    $scope.showMsgSpinner = false;
                    $scope.$apply();
                }else{
                    $scope.showMsgSpinner = false;
                    $scope.ScanDisable = false;
                    $scope.showMsg = false;
                    console.log("warning: ", data.message);
                    toaster.pop({
                        type: 'warning',
                        body: data.message,
                        timeout: 3000
                    });
                    $scope.$apply();
                }

            };

            $scope.ScanDevice = function(){
                var device;
                $scope.errMsg = false;
                $scope.showMsg = true;
               
                if($scope.deviceType == 5){
                    device = "RFID Card";
                }else{
                    device = "Bluetooth Beacon";
                }
                if($scope.gateway && $scope.deviceType){
                    toaster.pop({
                        type: 'success',
                        body: 'Scan started..',
                        timeout: 5000
                    });
                    var parms = {
                        "gatewaySerial": $scope.gateway,
                        "type": $scope.deviceType
                    };

                    console.log("Start Scan: " + JSON.stringify(parms));
                    if(Object.keys(parms).length == 2){
                        $http.post(config.host + '/provision', parms)
                        .then(function (res) {
                            if(res.data.success == true){
                                $scope.showMsgSpinner = true;
                                $scope.ScanDisable = true;
                                $scope.showBtn = false;
                                $scope.msg = "Please put RFID Card/Bluetooth Beacon on Provisioning Device & don't refresh the page";
                                $scope.disabled = true;
                                $window.localStorage.setItem('gatewaySerial', $scope.gateway);
                                $window.localStorage.setItem('deviceType', $scope.deviceType);
                            //   timer( "countdown", 1, 0 );
                            }
                        });
                    }
            
                    else{
                        alert("Please select all mandatory fields");
                    }
                }else{
                 
                    toaster.pop({
                        type: 'warning',
                        body: 'Please select Device Type & Gateway',
                        timeout: 3000
                    });
                }


            };

            var checkScaning = function(){
                var gwSerial = $window.localStorage.getItem('gatewaySerial');
                var deviceType = $window.localStorage.getItem('deviceType');
                $http.get(config.host + '/provision?id='+gwSerial)
                .then(function(res) {
                    if(res.data.success == true){
                        var provData = res.data.items;
                        console.log("Responce: ", JSON.stringify(provData));
                        if(provData.length){
                            $scope.gateway = res.data.items[0].deviceSerial;
                            $scope.deviceType = res.data.items[0].type;
                            $scope.showMsgSpinner = true;
                            $scope.ScanDisable = true;
                            $scope.showMsg = true;
                            $scope.msg = "Please put RFID Card/Bluetooth Beacon on Provisioning Device & don't refresh the page";
                                $scope.$apply();
                        }else{
                            $window.localStorage.setItem('gatewaySerial', "");
                            $window.localStorage.setItem('deviceType', "");
                            $scope.deviceType = "";
                            $scope.deviceSerial = "";
                            $scope.showMsgSpinner = false;
                            $scope.ScanDisable = false;
                            $scope.showMsg = false;
                        }
                    }
                    console.log("gwSerial: ", JSON.stringify(res))
                    console.log("gwSerial & deviceType ", gwSerial ,' ,', deviceType)
                });

            };
            checkScaning();

            var reset_all = function(){
                $scope.deviceType = "";
                $scope.deviceName = "";
                $scope.deviceSerial = "";
                $scope.assetId = "";
                $scope.gateway = "";
                $scope.showBtn = false;
                $scope.showMsgSpinner = false;
                $scope.disabled = false;
                $scope.ScanDisable = false;
            };
   
            $scope.saveDevice = function(){

                if($scope.deviceType && $scope.deviceName && $scope.deviceSerial && $scope.assetId){
                    var parms = {
                        "deviceType": $scope.deviceType,
                        "name": $scope.deviceName,
                        "serial": $scope.deviceSerial,
                        "assetId":$scope.assetId
                    };
    
                    $http.post(config.host + '/device/createAndMapDevice', parms)
                    .then(function (res) {
                        
                        var data = res.data;
                        console.log("Res data: " + JSON.stringify(data));
                        if(data.success === true){
                            reset_all();
                            datatable();
                            toaster.pop({
                                type: 'success',
                                body: data.message,
                                timeout: 3000
                            });
                        }else{
                            toaster.pop({
                                type: 'warning',
                                body: data.message,
                                timeout: 3000
                            });
                        }

                       
                    });
                }else{
                    toaster.pop({
                        type: 'warning',
                        body: 'Please enter all mandatory fields',
                        timeout: 3000
                    });
                }


            };



            $scope.resetAll = function(){
                reset_all();
                datatable();
            };

            socketIO.on('provisioning', function(data) {
                console.log("provisioning from socket" + JSON.stringify(data));
                socketData(data);

            });
        }
    ]);
    
