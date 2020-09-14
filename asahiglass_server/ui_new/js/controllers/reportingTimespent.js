'use strict';

/* Controllers */

angular.module('app')
    // Chart controller

    .controller('reportingTimespent', ['$scope', 'md5', 'socketIO', '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window',
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

                        var barchart = function(data){
                            console.log("data in bar chart: " +JSON.stringify(data))
                            AmCharts.makeChart( "chartdiv", {
                                "type": "serial",
                                "dataProvider": data,
                                "categoryField": "zone",
                                "categoryAxis": { "autoWrap": true, "autoRotateCount": 2, "autoRotateAngle": 75,"title": "Zone (Date)"},
                                "valueAxes": [{"title": "Time spent In Zone", "axisAlpha": 0.15, "gridAlpha": 0.15}],
                                "graphs": [ {
                                  "alphaField": "alpha",
                                  "balloonText": "<span style='font-size:13px;'>[[title]] in [[category]]: <b>[[value]]</b> [[additional]]</span> <br>[[description]]",
                                  "dashLengthField": "dashLengthColumn",
                                  type: "column",
                                  title: "Spent Time In ",
                                  valueField: "time",
                                  colorField: "color",
                                  fillAlphas: 1,
                                  
                                } ]
                              } );

                        }
                        barchart([]);
                        
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
                                        console.log("Reporting data: " + JSON.stringify(reportingData)); 
                                        var arr = [];
                                        reportingData.forEach(element => {
                                            var tempObj = {};
                                            console.log("Zone id: " + element.zoneId);
                                            console.log("isallowed: " + element.isAllowed);
                                            console.log("entry time: " + element.entryTime);
                                            console.log("exit time: " + element.exitTime);
                                            var date = moment(parseInt(element.time)).format('DD/MM/YYYY');
                                            if(flag == 1){
                                                tempObj['zone'] =  element.zoneName + " (" + date+" )" + element.empName;
                                            }else{
                                                tempObj['zone'] =  element.zoneName + " (" + date+" )";
                                            }
                                            
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
                                            tempObj['time'] = parseFloat(formate);
                                            console.log("Date new: " + element.time);
                                            tempObj['date'] = moment(element.time).format('DD/MM/YYYY');
                                            if(element.isAllowed == 0){
                                                tempObj['color'] = "red";
                                            }else{
                                                tempObj['color'] = "green";
                                            }
                                            

                                            arr.push(tempObj);
                                            
                                            
                                        });
                                        console.log("array: " + JSON.stringify(arr)); 
                                        barchart(arr);
                                        
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
                                                console.log("Zone id: " + element.zoneId);
                                                console.log("isallowed: " + element.isAllowed);
                                                var date = moment(parseInt(element.time)).format('DD/MM/YYYY (hh:mm a)')
                                                if(flag == 1){
                                                    tempObj['zone'] =  element.zoneName + " " + date + " " + element.empName;
                                                }else{
                                                    tempObj['zone'] =  element.zoneName + " " + date;
                                                }
                                                console.log("Date new: " + element.time);
                                                
                                                var entry = moment(parseInt(element.entryTime));
                                                var exit;
                                                if(element.exitTime == 0){
                                                    exit = moment(parseInt(new Date().getTime())); 
                                                }else{
                                                    exit = moment(parseInt(element.exitTime));
                                                }
                                               
                                                console.log("entry time: " + entry);
                                                console.log("exit time: " + exit);
    
                                                var diff = moment(exit,"DD/MM/YYYY HH:mm:ss").diff(moment(entry,"DD/MM/YYYY HH.mm"));
                                                var duration = moment.duration(diff);
                                                var formate = Math.floor(duration.asHours()) + moment.utc(diff).format(".mm");
                                                console.log("formate: " + formate)
                                                tempObj['time'] = formate;//parseFloat(formate);
                                                if(element.isAllowed == 0){
                                                    tempObj['color'] = "red";
                                                }else{
                                                    tempObj['color'] = "green";
                                                }
                                                
    
                                                arr.push(tempObj);
                                                
                                                
                                            });
                                            console.log("array: " + JSON.stringify(arr)); 
                                            barchart(arr);
                                        }    
                                    });
                                    
                            }
                          
                        }


 
                        
        }
    ]);