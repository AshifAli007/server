'use strict';

/* Controllers */
angular.module('app')

    .controller('otaDownloadCtrl', ['$scope', 'socketIO', '$sce', '$compile', '$rootScope', '$http', 'sessionInjector', 'Config', '$timeout', '$location', '$window', 'FlashService', 'toaster',
        function ($scope, socketIO, $sce, $compile, $rootScope, $http, sessionInjector, config, $timeout, $location, $window, FlashService, toaster) {
           
            var requestSoftware = function(url){
                $http.get(config.host + url).then(function (res) {
                    console.log("Software array: ", JSON.stringify(res));
                    if(res.data.success == true){
                        var array = res.data.items;
                        if(array.length > 0){
                            $scope.softwares = array;
                        }else{
                            toaster.pop({
                                type: 'error',
                                body: 'No Software',
                                timeout: 3000
                            });
                        }
                       
                    }else{
                        toaster.pop({
                            type: 'error',
                            body: 'Please try again',
                            timeout: 3000
                        });
                    }
                });
            }

            var requestCompany = function(id){
                $http.get(config.host + '/company').then(function (res) {
                    console.log("company array: ", JSON.stringify(res));
                    if(res.data.success == true){
                        var array = res.data.items;
                        if(array.length > 0){
                            $scope.companys = res.data.items;
                            $scope.companyList = res.data.items;
                        }else{
                            toaster.pop({
                                type: 'error',
                                body: 'Company not having any zone gateways',
                                timeout: 3000
                            });
                        }
                        
                    }else{
                        toaster.pop({
                            type: 'error',
                            body: 'Please try again',
                            timeout: 3000
                        });
                    }
                });
            }
            requestCompany();


            $scope.softwareType = function(type){
                console.log("type: ", type)
                var url;
                if(type == 1){
                    url = '/ota/node'
                }else if(type == 2){
                    url = '/ota/nodegateway'
                }else if(type == 3){
                    url = '/ota/gateway'
                }else{

                }
                requestSoftware(url);
            }

            $scope.companyType = function(id){
                $http({
                    method: 'GET',
                    url: config.host + '/device/zonegateway',
                    headers: {
                      'companyId': id, 
                    }
                  }).then(function (res) { 
                    if(res.data.success == true){
                        var gatewayArray = res.data.items;
                        if(gatewayArray.length >0){
                           
                            $scope.gateways = gatewayArray;
                        }else{
                            toaster.pop({
                                type: 'error',
                                body: 'Company not having any zone gateways',
                                timeout: 3000
                            });
                        }

                    }else{
                        toaster.pop({
                            type: 'error',
                            body: 'Please try again',
                            timeout: 3000
                        });
                    }
                });
            }

            var getOTADetailsList = function (array) {
                var realTimeData = array;
                alert(realTimeData)
                var table = $('#otaDatatable').DataTable({
                    "order": [[3, "desc"]],
                    data: realTimeData,
                    scrollY: 300,
                    "bSort" : false,
                    "pageLength": 50,
                    "lengthMenu": [[50, 100, 250, 500, 1000, -1], [50, 100, 250, 500, 1000, "All"]],
                    "bDestroy": true,
                    "columnDefs": [
                        { "visible": false, "targets": 3 }
                    ],
                    columns: [

                        {
                            data: "serial",
                            render: function (data, type, row) {
                                if (data) {
                                    return data;
                                }
                                return '';
                            }
                        },
                        {
                            data: "currentVersion",
                            render: function (data, type, row) {
                                if (!data) {
                                    return '';
                                }else{
                                    
                                    return data;
                                }
                                
                            }
                        },
                        {
                            data: "newversion",
                            render: function (data, type, row) {
                                if (!data) {
                                    return '';
                                    
                                }else{
                                    return data;
                                }
                                
                            }
                        }
                        
                    ]
                });
                
            }
            // getOTADetailsList([]); 

            $scope.getDeviceList = function(id){
                $http({
                    method: 'GET',
                    url: config.host + `/ota/currentversion?companyId=${id}`,
                  }).then(function (res) { 
                    if(res.data.success == true){
                        var gatewayArray = res.data.items;
                        console.log("gatewayArray: ",JSON.stringify(gatewayArray))
                        getOTADetailsList(gatewayArray)
                    }else{
                        toaster.pop({
                            type: 'error',
                            body: 'Please try again',
                            timeout: 3000
                        });
                    }
                });
            }

            //Submit
            $scope.saveOta = function(){
               
                var parms = {
                    "type":$scope.type,
                    "gateways": $scope.gatewayId,
                    "software": $scope.software,
                    "company" :$scope.company
                };
                $http.post(config.host + '/ota/download', parms)
                .then(function (res) {
                 
                    if (res.data.success == true) {
                        var msg = res.data.message;
                        toaster.pop({
                            type: 'success',
                            body: msg,
                            timeout: 3000
                        });
                    }else {
                  
                    var msg = res.data.message;
                    toaster.pop({
                        type: 'error',
                        body: msg,
                        timeout: 3000
                    });
                }
                });

                console.log("Save software parms: ", parms)
            }



        }

    ]);



