'use strict';

/* Controllers */

angular.module('app')
    // Chart controller

    .controller('companyConfig', ['$scope', 'socketIO', 'md5',  '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window', 
        function($scope, socketIO, md5, $rootScope, $http, sessionInjector, config, Sessioncheck, $timeout, $location, $window) {
            $scope.IsVisible = true;
            $scope.isBuzz = false;
            $http.get(config.host + '/employee')
            .then(function(res) {
                if(res.data.success == true){
                    var empData = res.data.data;
                    console.log("Emp data: " + JSON.stringify(empData));  
                    $scope.empData = empData;
                }    
            });

            //Datatable
            var datatable = function(deviceList){
                var table = $('#device').DataTable({
                    data: deviceList,
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
                                }
                            }
                        },
                        {
                            "data": "serial"
                        },
                        {
                            "data": "fullName",
                            render: function(data, type, row){
                                
                                if(data == null){
                                    return "";
                                }else{
                                    return data;
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
                $('#device tbody').on('click', '#edit', function() {
                    var data = table.row($(this).parents('tr')).data();
                    console.log(JSON.stringify(data));
                    $scope.IsVisible = false;
     

                    $scope.deviceType = data.deviceType;
                    $scope.deviceName =  data.name;
                    $scope.deviceSerial = data.serial;
                    $scope.Employee = data.empId;
                    $scope.id = data.id
                    $scope.$apply();
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;

                    //    if(data._path){
                    //         var parms = {
                    //             "name":"refreshObject",
                    //             "device": id,
                    //             "objectName":data._path
                    //         };

                    //        $scope.$apply(function () {
                    //         $scope.checkPanel = true;
                    //        });
                        

                    //        $scope.$apply(function(){
                    //         $scope.taskArray.push(parms);
                    //        })
                        
                            
                    //     }

                });
            }

            //Device List
            var deviceList = function(type){
                var url;
                if(!type){
                   url = '/device'
                }else if(type == 1){
                   url ='/device/beacon'
                }else if(type == 2){
                   url = '/device/reciver'
                }else{
                   url = '/device/gateway'
                }

                $http.get(config.host + url)
                .then(function(res) {
                    if(res.data.success == true){
                        var deviceList = res.data.data;
                        console.log("Device data: " + JSON.stringify(deviceList));  
                        datatable(deviceList);
                   
                    }    
                });
                
            }

            deviceList()

            $scope.onLoad = function (e, reader, file, fileList, fileOjects, fileObj) {
               // alert('this is handler for file reader onload event!' + JSON.stringify(file));

              };
            //Add Company
            $scope.addCompany = function(){
                var img = $scope.file;
                console.log("Img: " + img);
                var parms = {
                    "name": $scope.name,
                    "address":$scope.address,
                    "website":$scope.webLink,
                    "logo": img,
                    "contactPerson": {
                        "fullName": $scope.uFullName,
                        "email": $scope.uEmail,
                        "contactNo": $scope.contact,
                        "password": $scope.uPassword,
                        "userType":1,
                        "address": $scope.uAddress
                    }
                };

                $http.post(config.host + '/company', parms)
                .then(function (res) {
                    console.log("responce: " + JSON.stringify(res));
                });
            }


            //Upload CSV



            //Update Device
            $scope.updateDevice = function(){
                var deviceData;
                console.log("$scope.deviceTypesadas: " + typeof($scope.deviceType));
                console.log("Device Id: " + $scope.id)
                if($scope.deviceType == "1"){
                    deviceData = {
                        "deviceType": $scope.deviceType,
                        "name": $scope.deviceName,
                        "serial": $scope.deviceSerial,
                        "empId": $scope.Employee
                    }
                }else{
                    console.log("b");
                    deviceData = {
                        "deviceType": $scope.deviceType,
                        "name": $scope.deviceName,
                        "serial": $scope.deviceSerial
                    }
                }

                console.log("Device Data: " + JSON.stringify(deviceData))
                $http.put(config.host + '/device/'+$scope.id, deviceData)
                .then(function (res) {
                    alert("Res data: " + JSON.stringify(res));
                    $scope.deviceType = "";
                    $scope.deviceName = "";
                    $scope.deviceSerial = "";
                    $scope.Employee = "";
                    deviceList();
                });
            }
            //Device Change
            $scope.deviceChange = function(type){
                deviceList(type)
            };
            socketIO.on('notification', function(data) {
                console.log("notificationfromsocket" + JSON.stringify(data));
            });
        }
        
        
    ]);