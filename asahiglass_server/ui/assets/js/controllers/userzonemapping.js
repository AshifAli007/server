'use strict';

/* Controllers */

angular.module('app')
    // Chart controller

    .controller('userzoneMapping', ['$scope', 'md5', '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window', 
        function($scope, md5, $rootScope, $http, sessionInjector, config, Sessioncheck, $timeout, $location, $window) {

            //Emp list
            $http.get(config.host + '/employee')
            .then(function(res) {
                if(res.data.success == true){
                    var empData = res.data.data;
                    console.log("Emp data: " + JSON.stringify(empData));  
                    $scope.empData = empData;
                }    
            });


            //Zone List
            $http.get(config.host + '/zone')
            .then(function(res) {
                if(res.data.success == true){
                    var zoneData = res.data.data;
                    console.log("Emp data: " + JSON.stringify(zoneData));  
                    $scope.zoneData = zoneData;
                }    
            });

            //Emp List
            var mapping = function(type){


                $http.get(config.host + '/zone/assign/user')
                .then(function(res) {
                    if(res.data.success == true){
                        var empList = res.data.data;
                        console.log("Emp data: " + JSON.stringify(empList));  
                        var table = $('#mappiguserzone').DataTable({
                            data: empList,
                            "pageLength": 5,
                            "lengthMenu": [ [5, 10, 25, 50, -1], [5, 10, 25, 50, "All"] ],
                            "bDestroy": true,
                            columns: [
                                {
                                    "data": "empId"
                             
                                },
                                {
                                    "data": "fullName"
                                },
                                {
                                    "data": "zoneName"
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
            $scope.mappinguserZone = function(){

                var empId = $scope.Employee;
                var zoneId = $scope.Zone;

                
                var mappingData = {
                    "userId": empId
                }
                console.log("Mapping Data: " + JSON.stringify(mappingData))
                $http.post(config.host + '/zone/'+zoneId+'/assign/user', mappingData)
                .then(function (res) {
                    console.log("Res data: " + JSON.stringify(res));
                    $scope.Employee = ""
                    $scope.Zone = "";
                    mapping();
                });
            }


        }
    ]);