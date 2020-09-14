'use strict';

/* Controllers */

angular.module('app')
    // Chart controller 
    .controller('gurdDashboardCtrl', ['$scope',  'socketIO', '$sce',  '$compile', '$rootScope', '$http', 'sessionInjector', 'Config', '$timeout', '$location', '$window',
     function($scope,  socketIO, $sce,  $compile, $rootScope, $http, sessionInjector, config, $timeout, $location, $window) {
        
        //Zone List
        var zoneList = function(data){
            $scope.zoneData = data;
            var epoch = new Date().getTime();
            $scope.date = moment(epoch).format("DD MMM ");
        }
        
        var zoneDetail = function(){
            $http.get(config.host + '/zone/zonedetails')
            .then(function(res) {
                console.log("Responce data: " + JSON.stringify(res));
                if(res.data.success == true){
                    zoneList(res.data.data);
                }            
            });
        }
        zoneDetail();

        var realTimeTable = function(array){
  
            var dataSet = array;
           
            var table = $('#realtimeTable').DataTable({
                data: dataSet,
                "bPaginate": false,
                "lengthChange": false,
                "bInfo": false,
                "ordering": false,
                "bDestroy": true,
                "fixedHeader": true,
                columns: [
                    {
                        data: "zoneName",
                        render: function(data, type, row) {
                               
                                if(data){
                                    return  data;
                                }
                               return '';
                        }
                    },
                    
                    {
                        data: "empName",
                            render: function(data, type, row){
                                if(data){
                                    return  data;
                                }
                                return '';
                            }
                    },
                    {
                        data: "assetTypeName",
                        render: function(data, type, row){
                            if(data){
                                return  data;
                            }
                            return '';
                        }
                       
                    },
                    {
                        data: "entryTime",
                            render: function(data, type, row){
                                if(data){
                                    if(data == 0){
                                        return '';
                                    }
                                    var lastConndate = new Date(parseInt(data));
                                    var lDate =  moment(lastConndate).format("DD MMM YY (hh:mm a)");
                                    if(lDate == "Invalid date"){
                                        return 'Invalid Date';
                                    }else{
                                        return lDate;
                                    }
                                }
                                return '';
                            }
                    },{
                        data: "exitTime",
                            render: function(data, type, row){
                                if(data){
                                    if(data == 0){
                                        return '';
                                    }
                                    var lastConndate = new Date(parseInt(data));
                                    var lDate =  moment(lastConndate).format("DD MMM YY (hh:mm a)");
                                    if(lDate == "Invalid date"){
                                        return 'Invalid Date'
                                    }else{
                                        return lDate;
                                    }
                            
                                }
                                return '';
                            }
                    },{
                        data: "message",
                            render: function(data, type, row){
                                if(data){
                                    return '<h6 class="m-0 text-c-red">'+data+'</h6>';
                                }
                                return '';
                            }
                    },                               
                     {
                            data: null,
                            render: function(data, type, row) {
                                if (type === 'display') {
                                    return '<a  id="clear" style="cursor: pointer;" class="label theme-bg text-white f-12">Clear</a>';
                                }
                                return data;
                            },
                            className: "dt-body-center"
                    }
                ]
            });
     

          
            $('#realtimeTable tbody').on('click', '#clear', function() {
                var data = table.row($(this).parents('tr')).data();
                if(data == undefined){
                   console.log("Click undefined");
               }else{
                //alert(JSON.stringify(data)) ;
                var parm = {
                    "zoneId": data.zoneId
                };
                $http.post(config.host + '/device/controlroom/reset', parm)
                .then(function (res) {
                    
                });
               }
            });
        }
        var notificationData 
        var notificationApi = function(){
            var time = moment.duration("24:00:00");
            var a = new Date();
                a = a.getTime();
            var date = moment(a);
            date.subtract(time);
            $http.get(config.host + '/notification?startDate='+date+'&endDate='+a)
            .then(function(res) {
                if(res.data.success == true){
                    notificationData = res.data.items;
                    console.log("Notification data: " + JSON.stringify(res)); 
                    realTimeTable(notificationData);
                }    
            });
        }
        notificationApi();
        

            socketIO.on('notification', function(data) {
                console.log("notificationfromsocket" + JSON.stringify(data));
                
                if(data.type === "reset"){
                    console.log("Reset socket")
                
                    totalAreaDetail();
                    notificationApi();
                    zoneDetail();
                }else{
                  //  notificationData.unshift(data);
                  //  realTimeTable(notificationData);
                  notificationApi();
                }


            });

        var totalAreaDetail = function(){
            $http.get(config.host + '/floor/detail')
            .then(function(res) {
                console.log("Responce data: " + JSON.stringify(res));
                if(res.data.success == true){
                    $scope.areaData = res.data.data;
                }            
            });
        }
        totalAreaDetail();


        $scope.zonemap = function(index, zone){
            
            var zoneid = zone.id;
            $window.sessionStorage.setItem('ZoneId', zoneid);
            $location.url('/app/zonedetail');
        }
        socketIO.on('dashboard', function(data) {
            console.log("Dashboard socket data: " + JSON.stringify(data))
            zoneDetail();
            totalAreaDetail();
        });

        socketIO.on('connected', function() {
            console.log('Connected ....');
            socketIO.emit('register');
        });
    
        socketIO.on('notification', function(data) {
            console.log("notificationfromsocket" + JSON.stringify(data));

        });
    }]);



angular.module('app')
    .directive('widget5Chart', function() {
        return {
            restrict: 'C',
            link: function(scope, el, attrs) {

                var container = '.widget-5-chart';

                var seriesData = [
                    [],
                    []
                ];
                var random = new Rickshaw.Fixtures.RandomData(7);
                for (var i = 0; i < 7; i++) {
                    random.addData(seriesData);
                }

                var graph = new Rickshaw.Graph({
                    element: document.querySelector(container),
                    renderer: 'bar',
                    series: [{
                        data: [{
                            x: 0,
                            y: 10
                        }, {
                            x: 1,
                            y: 8
                        }, {
                            x: 2,
                            y: 5
                        }, {
                            x: 3,
                            y: 9
                        }, {
                            x: 4,
                            y: 5
                        }, {
                            x: 5,
                            y: 8
                        }, {
                            x: 6,
                            y: 10
                        }],
                        color: $.Pages.getColor('danger')
                    }, {
                        data: [{
                            x: 0,
                            y: 0
                        }, {
                            x: 1,
                            y: 2
                        }, {
                            x: 2,
                            y: 5
                        }, {
                            x: 3,
                            y: 1
                        }, {
                            x: 4,
                            y: 5
                        }, {
                            x: 5,
                            y: 2
                        }, {
                            x: 6,
                            y: 0
                        }],
                        color: $.Pages.getColor('master-light')
                    }]

                });


                var MonthBarsRenderer = Rickshaw.Class.create(Rickshaw.Graph.Renderer.Bar, {
                    barWidth: function(series) {

                        return 7;
                    }
                });


                graph.setRenderer(MonthBarsRenderer);


                graph.render();


                $(window).resize(function() {
                    graph.configure({
                        width: $(container).width(),
                        height: $(container).height()
                    });

                    graph.render()
                });

                $(container).data('chart', graph);
            }
        };
    });

$('body').on('click', '.mapplic-pin', function(e) {
    e.preventDefault();
    var location = $(e.target).data('location');
    $('#mapplic').data().mapplic.goToLocation(location, 800);
});