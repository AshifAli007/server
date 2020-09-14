'use strict';

/* Controllers */

angular.module('app')
    // Chart controller

    .controller('reportingTimespentAllowedZone', ['$scope', 'md5', 'socketIO', '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window', 
        function($scope, md5, socketIO, $rootScope, $http, sessionInjector, config, Sessioncheck, $timeout, $location, $window) {

                        $scope.showPanel = true;
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

                        var Donut = function(data){
                            AmCharts.makeChart("chartdiv", {
                                "type": "pie",
                                "theme": "light",
                                 "dataProvider": data,
                                "valueField": "value",
                                
                                "titleField": "label",
                                        "exportConfig":{	
                                          menuItems: [{
                                          icon: '/lib/3/images/export.png',
                                          format: 'png'	  
                                          }]  
                                        }
                                });

                        }

                        $scope.showRep = function(){
                            $scope.showPanel = false;
                            var repType = $scope.repType;
                            var zId = $scope.Zone;
                            var eId = $scope.Employee;
                            var url;
                            var flag;
                            if(repType == 1){
                                //alert("zone & emp" +zId+ ' & ' +eId)
                                if(!zId && !eId){
                                    flag = 1;
                                    url = '/reporting/'+repType+'/entryexit';
                                }else if(zId && !eId){
                                    url = '/reporting/'+repType+'/entryexit?zId='+zId;
                                }else if(!zId && eId){
                                    url = '/reporting/'+repType+'/entryexit?eId='+eId;
                                }else{
                            
                                    url = '/reporting/'+repType+'/entryexit?eId='+eId+'&zId='+zId;
                                }
                            
                                $http.get(config.host + url)
                                .then(function(res) {
                                    if(res.data.success == true){
                                        var reportingData = res.data.data;
                                        //console.log("Reporting data: " + JSON.stringify(reportingData));
                                        var arr = [];
                                        reportingData.forEach(element => {
                                            var tempObj = {};
                                            if(element.isAllowed == 1){
                                                console.log("Reporting data: " + JSON.stringify(element));
                                                var date = moment(parseInt(element.time)).format('DD/MM/YYYY (hh:mm a)');
                                                tempObj['label'] = element.zoneName + " " + date;
                                                tempObj['date'] =  moment(parseInt(element.time)).format("DD MMM YY (hh:mm a)");
                                                var entry = moment(parseInt(element.entryTime));
                                                var exit;
                                                if(element.exitTime == 0){
                                                    exit = moment(parseInt(new Date().getTime())); 
                                                }else{
                                                    exit = moment(parseInt(element.exitTime));
                                                }
                                               
                              
    
                                                var diff = moment(exit,"DD/MM/YYYY HH:mm:ss").diff(moment(entry,"DD/MM/YYYY HH.mm"));
                                                var duration = moment.duration(diff);
                                                var formate = Math.floor(duration.asHours()) + moment.utc(diff).format(".mm");
                                                console.log("formate: " + formate)
                                                tempObj['value'] = parseFloat(formate);
                                                arr.push(tempObj);
                                            }
                                            
                                        });
                                        console.log("Donut chart Array: " + arr.length)//JSON.stringify(arr));
                                        Donut(arr);
                                        
                                    }    
                                });
                            }else if (repType == 2){
                                    var startDate = new Date($scope.startDate).getTime();
                                    var endDate = new Date($scope.endDate).getTime();
                                    var zId = $scope.Zone;
                                    var eId = $scope.Employee;
                                    var flag;
                                    console.log("start Date: " + startDate+ " ,End Date: " + endDate);
                                    console.log("Zone Id: " + zId+ " ,Emp Id: " + eId);
                                    if(!zId && !eId){
                                        flag = 1;
                                        console.log("Log1")
                                        url = '/reporting/'+repType+'/entryexit/?sDate='+startDate+'&eDate='+endDate;
                                    }else if(zId && !eId){
                                        console.log("Log2")
                                        url = '/reporting/'+repType+'/entryexit?sDate='+startDate+'&eDate='+endDate+'&zId='+zId;
                                    }else if(!zId && eId){
                                        console.log("Log3")
                                        url = '/reporting/'+repType+'/entryexit?sDate='+startDate+'&eDate='+endDate+'&eId='+eId;
                                    }else{
                                        console.log("Log4")
                                        url = '/reporting/'+repType+'/entryexit?sDate='+startDate+'&eDate='+endDate+'&eId='+eId+'&zId='+zId;
                                    }
                                    $http.get(config.host + url)
                                    .then(function(res) {
                                        if(res.data.success == true){
                                            var reportingData = res.data.data;
                                            console.log("Reporting data: " + JSON.stringify(reportingData.data)); 
                                            var arr = [];
                                            reportingData.forEach(element => {
                                                var tempObj = {};
                                                if(element.isAllowed == 1){
                                                    console.log("Reporting data: " + JSON.stringify(element));
                                                    var date = moment(parseInt(element.time)).format('DD/MM/YYYY (hh:mm a)');
                                                    tempObj['label'] = element.zoneName + " " + date;
                                                    tempObj['date'] =  moment(parseInt(element.time)).format("DD MMM YY (hh:mm a)");
                                                    var entry = moment(parseInt(element.entryTime));
                                                    var exit;
                                                    if(element.exitTime == 0){
                                                        exit = moment(parseInt(new Date().getTime())); 
                                                    }else{
                                                        exit = moment(parseInt(element.exitTime));
                                                    }
                                                   
                                  
        
                                                    var diff = moment(exit,"DD/MM/YYYY HH:mm:ss").diff(moment(entry,"DD/MM/YYYY HH.mm"));
                                                    var duration = moment.duration(diff);
                                                    var formate = Math.floor(duration.asHours()) + moment.utc(diff).format(".mm");
                                                    console.log("formate: " + formate)
                                                    tempObj['value'] = parseFloat(formate);
                                                    arr.push(tempObj);
                                                }
                                                
                                            });
                                            console.log("Donut chart Array: " + arr.length)//JSON.stringify(arr));
                                            Donut(arr); 
                                        }    
                                    });
                                    
                            }
                          
                        }



                        
        }
    ]);