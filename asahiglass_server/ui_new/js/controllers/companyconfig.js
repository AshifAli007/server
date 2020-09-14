'use strict';

/* Controllers */

angular.module('app')
    // Chart controller

    .controller('companyConfig', ['$scope', 'socketIO',   '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window', 'toaster', 
        function($scope, socketIO,  $rootScope, $http, sessionInjector, config, Sessioncheck, $timeout, $location, $window, toaster) {
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
            var datatable = function(companyList){
                var table = $('#companyList').DataTable({
                    data: companyList,
                    "pageLength": 5,
                    "lengthMenu": [ [5, 10, 25, 50, -1], [5, 10, 25, 50, "All"] ],
                    "bDestroy": true,
                    columns: [
                        {
                            "data": "name"
                        },
                        {
                            "data": "address"
                            
                        },
                        {
                            "data": "website"
                        },
                        {
                            "data": "logo",
                            render: function (data, type, row) {
                                if (data == null) {
                                    return "";
                                } else {

                                    return ' <img id="imgBox" data-toggle="modal"  data-target="#floorlight" src="' + data + '?' + new Date().getTime() + '" style="border: 3px solid grey;" alt="Floor Image" height="auto" width="100">';
                                }
                            }
                            
                        },
                        {
                            "data": "fullName"
                        },
                        {
                            "data": "email"
                        },
                        {
                            "data": "contactNo"
                        },
                        {
                            "data": "contactNo"
                        },
                        {
                            data: null,
                            render: function(data, type, row) {
                                if (type === 'display') {
                                    return '<button id="edit" title="Not Impemented" class="btn btn-success">Change Admin Password</button>';
                                    // return '<button id="edit" title="Edit cellsite" class="btn btn-success">Edit</button> <button  title="Delete Device" id="delete" class="btn btn-info">Delete</button> ';
                                }
                                return data;
                            }
                           
                        }
    
                    ]            
                    
                    
                });
                $('#companyList tbody').on('click', '#edit', function() {
                    var data = table.row($(this).parents('tr')).data();


                });
            }

            //Device List
            var deviceList = function(type){


                $http.get(config.host + '/company')
                .then(function(res) {
                    if(res.data.success == true){
                        var companyList = res.data.items;
                        if(companyList.length > 0){
                            $scope.showTable = true;
                            console.log("companyList data: " + JSON.stringify(companyList));  
                            datatable(companyList);
                        }else{
                            $scope.showTable = false;
                        }

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
                .then(function (data) {
                    console.log("responce: " + JSON.stringify(data.data.success));
                    if (data.data.success == false) {
                        var msg = data.data.message;
                        toaster.pop({
                            type: 'error',
                            body: msg,
                            timeout: 3000
                        });
                    } else {
                        var msg = data.data.message;
                        toaster.pop({
                            type: 'success',
                            body: msg,
                            timeout: 3000
                        });
                        deviceList();
                        $scope.name = "";
                        $scope.address = "";
                        $scope.webLink = "";
                        $scope.uFullName = "";
                        $scope.uEmail = "";
                        $scope.contact = "";
                        $scope.uPassword = "";
                        $scope.uAddress = "";
                        angular.element("input[type='file']").val(null);
                    }
                   
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