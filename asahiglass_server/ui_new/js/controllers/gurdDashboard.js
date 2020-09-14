'use strict';

/* Controllers */
angular.module('app')
    // Chart controller
    .controller('gurdDashboardCtrl', ['$scope', 'socketIO', 'FlashService', '$sce', '$compile', '$rootScope', '$http', 'sessionInjector', 'Config', '$timeout', '$location', '$window',
        function ($scope, socketIO, FlashService, $sce, $compile, $rootScope, $http, sessionInjector, config, $timeout, $location, $window) {

            $scope.showMostViolatedErrorChartImage = false;
            $scope.showMostPopulatedChartErrorImage = false;
            $scope.showZoneProductivityErrorImage = false;
            $scope.showMostFrequentChartErrorImage = false;
            //  $scope.graphList = [{ "id": 0, "name": "PieChart" }, { "id": 1, "name": "XYChart" }, { "id": 2, "name": "PieChart" }]
            $scope.mostViolatedGraphType = "" + 1;
            $scope.mostViolatedChartType = 'XYChart';

            $scope.mostPopulatedGraphType = "" + 1;
            $scope.mostPopulatedChartType = 'XYChart'

            $scope.setMostViolatedGraph = function (mostViolatedGraph) {
                if (mostViolatedGraph == 0) {
                    $scope.mostViolatedChartType = 'PieChart';
                    $scope.showMostViolatedPieChart($scope.mostViolatedGraphData);
                }
                else if (mostViolatedGraph == 1) {
                    $scope.mostViolatedChartType = 'XYChart';
                    $scope.showMostViolatedBarChart($scope.mostViolatedGraphData);
                }
                else if (mostViolatedGraph == 2) {
                    $scope.mostViolatedChartType = 'RadarChart';
                    $scope.showMostViolatedGaugeChart($scope.mostViolatedGaugeData);
                }
            }

            $scope.setMostPopulatedGraphType = function (mostPopulatedGraphType) {
                if (mostPopulatedGraphType == 0) {
                    $scope.mostPopulatedChartType = 'PieChart';
                    $scope.showMostPopulatedPieChart($scope.mostPopulatedGraphData);
                }
                else if (mostPopulatedGraphType == 1) {
                    $scope.mostPopulatedChartType = 'XYChart';
                    $scope.showMostPopulatedBarChart($scope.mostPopulatedGraphData);
                }
                else if (mostPopulatedGraphType == 2) {
                  $scope.mostPopulatedChartType = 'SlicedChart';
                  $scope.showMostPopulatedSlicedChart($scope.allPopulatedZonePictorialData2);
                }
            }


            $scope.zoneProductivityGraphType = "" + 1;
            $scope.zoneProductivityChartType = 'XYChart';

            $scope.setZoneProductivityGraph = function (zoneProductivityGraphType) {
                if (zoneProductivityGraphType == 0) {
                    $scope.zoneProductivityChartType = 'PieChart';
                    $scope.showZoneProductivityPieChart($scope.zoneProductivityGraphData);
                }
                else if (zoneProductivityGraphType == 1) {
                    $scope.zoneProductivityChartType = 'XYChart';
                    $scope.showZoneProductivityChartData($scope.zoneProductivityGraphData);
                }
                else if (zoneProductivityGraphType == 2) {
                    $scope.zoneProductivityChartType = 'RadarChart';
                    $scope.showZoneProductivityHistogramChart($scope.zoneProductivityGraphData2);
                }
            }

            $scope.mostFrequentZoneType = "" + 1;
            $scope.mostFrequentZoneChartType = 'XYChart';

            $scope.setMostFrequentZoneGraph = function (mostFrequentZoneType) {
                if (mostFrequentZoneType == 0) {
                    $scope.mostFrequentZoneChartType = 'PieChart';
                    $scope.showMostFrequentPieChart($scope.allFrequentZoneData);
                }
                else if (mostFrequentZoneType == 1) {
                    $scope.mostFrequentZoneChartType = 'XYChart';
                    $scope.showMostFrequentChartData($scope.allFrequentZoneData);
                } else if (mostFrequentZoneType == 2) {
                    $scope.mostFrequentZoneChartType = 'XYChart';
                    $scope.showMostFrequentXYChart($scope.allFrequentZoneData2);
                }
            }

            /* Real Time Notifications */
            $scope.realTimeTable = function (array) {
                var realTimeData = array;
                var table = $('#realtimeTable').DataTable({
                    "order": [[3, "desc"]],
                    data: realTimeData,
                    scrollY: 300,
                    "bSort": false,
                    "pageLength": 100,
                    "lengthMenu": [[100, 250, 500, 1000, -1], [100, 250, 500, 1000, "All"]],
                    "bDestroy": true,
                    "columnDefs": [
                        { "visible": false, "targets": 3 }
                    ],
                    columns: [
                        {
                            data: "zoneName",
                            render: function (data, type, row) {
                                if (data) {
                                    return data;
                                }
                                return '';
                            }
                        },
                        {
                            data: "empName",
                            render: function (data, type, row) {
                                if (data) {
                                    return data;
                                }
                                return '';
                            }
                        },
                        {
                            data: "assetTypeName",
                            render: function (data, type, row) {
                                if (data) {
                                    return data;
                                }
                                return '';
                            }
                        },
                        {
                            data: "time",
                            render: function (data, type, row) {
                                if (data) {
                                    return data;
                                }
                                return '';
                            }
                        },
                        {
                            data: "entryTime",
                            render: function (data, type, row) {
                                if (data) {
                                    if (data == 0) {
                                        return '';
                                    }
                                    var lastConndate = new Date(parseInt(data));
                                    var lDate = moment(lastConndate).format("DD MMM YY (hh:mm a)");
                                    if (lDate == "Invalid date") {
                                        return 'Invalid Date';
                                    } else {
                                        return lDate;
                                    }
                                }
                                return '';
                            }
                        },
                        {
                            data: "exitTime",
                            render: function (data, type, row) {
                                if (data) {
                                    if (data == 0) {
                                        return '';
                                    }
                                    var lastConndate = new Date(parseInt(data));
                                    var lDate = moment(lastConndate).format("DD MMM YY (hh:mm a)");
                                    if (lDate == "Invalid date") {
                                        return 'Invalid Date'
                                    } else {
                                        return lDate;
                                    }
                                }
                                return '';
                            }
                        },
                        {
                            data: "message",
                            render: function (data, type, row) {
                                if (data) {

                                    if (row.isMissing) {
                                        return '<h6 style="color: orange;">' + data + '</h6>';
                                    }
                                    return '<h6 class="m-0 text-c-red">' + data + '</h6>';
                                }
                                return '';
                            }
                            // },
                            // {
                            //     data: null,
                            //     render: function (data, type, row) {
                            //         if (type === 'display') {
                            //             return '<a  id="clear" style="cursor: pointer;" class="label theme-bg text-white f-12">Clear</a>';
                            //         }
                            //         return data;
                            //     },
                            //     className: "dt-body-center"
                        }
                        // ,
                        // {
                        //     data: null,
                        //     render: function (data, type, row) {
                        //         if (type === 'display') {
                        //             return '<a  id="clear" style="cursor: pointer;" class="label theme-bg text-white f-12">Clear</a>';
                        //         }
                        //         return data;
                        //     },
                        //     className: "dt-body-center"
                        // }
                    ]
                });

                // $('#realtimeTable tbody').on('click', '#clear', function () {
                //     var data = table.row($(this).parents('tr')).data();
                //     if (data == undefined) {
                //     } else {
                //         //alert(JSON.stringify(data)) ;
                //         var parm = {
                //             "zoneId": data.zoneId
                //         };
                //         $http.post(config.host + '/device/controlroom/reset', parm)
                //             .then(function (res) {

                //             });
                //     }
                // });
            }

            $scope.notificationApi = function () {
                var time = moment.duration("24:00:00");
                var endDate = new Date();
                endDate = endDate.getTime();
                var startDate = moment(endDate);
                startDate.subtract(time);
                $http.get(config.host + '/notification?startDate=' + startDate + '&endDate=' + endDate)
                    .then(function (res) {
                        if (res.data.success == true) {
                            var notificationData = res.data.items;
                            $scope.realTimeTable(notificationData);
                        }
                        else {
                            var errorMessage = res.data.message;
                            // FlashService.showError(errorMessage);
                        }
                    });
            }

            socketIO.on('notification', function (data) {
                
                if (data.type === "reset") {
                    $scope.notificationApi();
                    // $scope.getPlantList();
                } else {
                    $scope.notificationApi();
                }
            });

            $scope.getPlantList = function () {
                $scope.loading = true;
                $http.get(config.host + '/plants')
                    .then(function (res) {
                        if (res.data.success == true) {
                            $scope.plantList = res.data.data;
                            $scope.plant = "" + $scope.plantList[0].id;
                            $scope.mostViolatedZoneData($scope.plant);
                            $scope.mostPopulatedZoneData($scope.plant);
                            $scope.mostFrequentZoneData($scope.plant);
                            $scope.zoneProductivityChartData($scope.plant);
                        }
                        else {
                            $scope.loading = false;
                            var errorMessage = res.data.message;
                            FlashService.showError(errorMessage);
                        }
                    });
            }

            $scope.mostViolatedZoneData = function (plantId) {
                $scope.loading = true;
                $http.get(config.host + '/reporting/zoneviolationstats?plantId=' + plantId)
                    .then(function (res) {
                        if (res.data.success == true) {
                            if (Object.keys(res.data.data).length != 0) {
                                $scope.showMostViolatedErrorChartImage = false;
                                $scope.mostViolatedZone = res.data.data;
                                $scope.allViolatedZoneData = res.data.data.items;
                                $scope.totalCount = res.data.data.totalCount;
                                $scope.allViolatedZoneGaugeData = res.data.data.items.map((item) => {
                                  var tempObj3 = {};
                                  tempObj3["category"] = item.name;
                                  tempObj3["value"] = (item.count/$scope.totalCount)*100;
                                  tempObj3["full"] = 100;
                                  return tempObj3;
                                })

                                var chartData = [];
                                var gaugeData = [];
                                var tempObj = {};
                                tempObj["name"] = $scope.mostViolatedZone.name;
                                tempObj["count"] = $scope.mostViolatedZone.violationCount;
                                chartData.push(tempObj);
                                var tempObj2 = {};
                                tempObj2["category"] = $scope.mostViolatedZone.name;
                                tempObj2["value"] = ($scope.mostViolatedZone.violationCount/$scope.totalCount)*100;
                                tempObj2["full"] = 100;
                                gaugeData.push(tempObj2);
                                $scope.mostViolatedGraphData = chartData;
                                $scope.mostViolatedGaugeData = gaugeData;
                                $scope.showMostViolatedBarChart(chartData);
                                $scope.loading = false;
                            }
                            else {
                                $scope.showMostViolatedErrorChartImage = true;
                            }
                        }
                        else {
                            $scope.loading = false;
                            $scope.mostViolatedZone = '';
                            $scope.showMostViolatedErrorChartImage = true;
                            // var errorMessage = res.data.message;
                            // FlashService.showError(errorMessage);
                        }
                    });
            }

            $scope.mostPopulatedZoneData = function (plantId) {
                $scope.loading = true;
                $http.get(config.host + '/reporting/zonepopulationstats?plantId=' + plantId)
                    .then(function (res) {
                        if (res.data.success == true) {
                            if (Object.keys(res.data.data).length != 0) {
                                $scope.showMostPopulatedChartErrorImage = false;
                                $scope.mostPopulatedData = res.data.data;
                                $scope.allPopulatedZoneData = res.data.data.items;
                                $scope.allPopulatedZonePictorialData = res.data.data.items.map(item => {
                                  var tempObj2 = {};
                                  tempObj2["name"] = item.name;
                                  tempObj2["count"] = item.populationCount;
                                  return tempObj2;
                                })
                                $scope.allPopulatedZonePictorialData2 = res.data.data.items.map(item => {
                                  var tempObj2 = {};
                                  tempObj2["name"] = item.name;
                                  tempObj2["value"] = item.count;
                                  return tempObj2;
                                })
                                var chartData = [];
                                var tempObj = {};
                                tempObj["name"] = $scope.mostPopulatedData.name;
                                tempObj["count"] = $scope.mostPopulatedData.populationCount;
                                chartData.push(tempObj);
                                $scope.mostPopulatedGraphData = chartData;
                                $scope.showMostPopulatedBarChart(chartData);
                                $scope.loading = false;
                            } else {
                                $scope.showMostPopulatedChartErrorImage = true;
                            }
                        }
                        else {
                            $scope.showMostPopulatedChartErrorImage = true;
                            $scope.mostPopulatedData = '';
                            // var errorMessage = res.data.message;
                            // FlashService.showError(errorMessage);
                            $scope.loading = false;
                        }
                    });
            }

            $scope.showMostPopulatedBarChart = function (chartData) {
                var chart = am4core.create("populated-chart", am4charts.XYChart);
                // Add data
                chart.data = chartData;
                // Create axes
                var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "name";
                categoryAxis.renderer.grid.template.location = 0;

                categoryAxis.renderer.minGridDistance = 10;
                categoryAxis.renderer.labels.template.horizontalCenter = "left";
                categoryAxis.renderer.labels.template.verticalCenter = "middle";
                categoryAxis.renderer.labels.template.rotation = 40;
                categoryAxis.renderer.labels.template.fontSize = 10;
                categoryAxis.tooltip.disabled = true;
                categoryAxis.renderer.minHeight = 10;
                categoryAxis.title.text = "Zone name ";
                categoryAxis.title.fontWeight = "bold";
                // categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
                //     if (target.dataItem && target.dataItem.index & 2 == 2) {
                //         return dy + 25;
                //     }
                //     return dy;
                // });

                var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis.min = 0;
                valueAxis.title.text = "Population count";
                valueAxis.title.fontWeight = "bold";

                // Create series
                var series = chart.series.push(new am4charts.ColumnSeries());
                series.dataFields.valueY = "count";
                series.dataFields.categoryX = "name";
                series.name = "ViolationCount";
                series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
                series.columns.template.fillOpacity = .8;
                var columnTemplate = series.columns.template;
                columnTemplate.strokeWidth = 2;
                columnTemplate.strokeOpacity = 1;
            }


            // $scope.showMostViolatedPieChart = function (chartData) {
            //     console.log("amcharts", am4charts)
            //     let chart = am4core.create("chartdiv", am4charts.PieChart);
            //     // Add data
            //     // Create pie series
            //     let series = chart.series.push(new am4charts.PieSeries());
            //     series.dataFields.value = "Violation Count";
            //     series.dataFields.category = "Zone";
            //     chart.data = chartData;

            // }



            $scope.showMostViolatedBarChart = function (chartData) {
                var chart = am4core.create("chart5", am4charts[$scope.mostViolatedChartType]);
                // Add data
                chart.data = chartData;
                // Create axes
                var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "name";
                categoryAxis.renderer.grid.template.location = 0;
                categoryAxis.renderer.minGridDistance = 10;
                categoryAxis.renderer.labels.template.horizontalCenter = "left";
                categoryAxis.renderer.labels.template.verticalCenter = "middle";
                categoryAxis.renderer.labels.template.rotation = 40;
                categoryAxis.renderer.labels.template.fontSize = 10;
                categoryAxis.tooltip.disabled = true;
                categoryAxis.renderer.minHeight = 10;
                categoryAxis.title.text = "Zone Name";
                categoryAxis.title.fontWeight = "bold";

                // categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
                //     if (target.dataItem && target.dataItem.index & 2 == 2) {
                //         return dy + 25;
                //     }
                //     return dy;
                // });

                var valueYAxis = chart.yAxes.push(new am4charts.ValueAxis());
                valueYAxis.min = 0;
                valueYAxis.title.text = "Violation count ";
                valueYAxis.title.fontWeight = "bold";


                // Create series
                var series = chart.series.push(new am4charts.ColumnSeries());
                series.dataFields.valueY = "count";
                series.dataFields.categoryX = "name";
                series.name = "ViolationCount";
                series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
                series.columns.template.fillOpacity = .8;
                var columnTemplate = series.columns.template;
                columnTemplate.strokeWidth = 2;
                columnTemplate.strokeOpacity = 1;
            }

            $scope.showMostViolatedPieChart = function (chartData) {
                console.log("mostViolatedChart Type is ::::", $scope.mostViolatedChartType);
                var chart = am4core.create("chart5", am4charts[$scope.mostViolatedChartType]);
                chart.data = chartData;
                // Add and configure Series
                var pieSeries = chart.series.push(new am4charts.PieSeries());
                pieSeries.dataFields.value = "count";
                pieSeries.dataFields.category = "name";

            }

            $scope.showMostViolatedGaugeChart = function (chartData) {
              var chart = am4core.create("chart5", am4charts[$scope.mostViolatedChartType]);
              chart.data = chartData;
              chart.startAngle = -90;
              chart.endAngle = 180;
              chart.innerRadius = am4core.percent(20);

              // Set number format
              chart.numberFormatter.numberFormat = "#.#'%'";

              // Create axes
              var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
              categoryAxis.dataFields.category = "category";
              categoryAxis.renderer.grid.template.location = 0;
              categoryAxis.renderer.grid.template.strokeOpacity = 0;
              categoryAxis.renderer.labels.template.horizontalCenter = "right";
              categoryAxis.renderer.labels.template.fontWeight = 500;
              categoryAxis.renderer.labels.template.adapter.add("fill", function(fill, target) {
                return (target.dataItem.index >= 0) ? chart.colors.getIndex(target.dataItem.index) : fill;
              });
              categoryAxis.renderer.minGridDistance = 10;

              var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
              valueAxis.renderer.grid.template.strokeOpacity = 0;
              valueAxis.min = 0;
              valueAxis.max = 100;
              valueAxis.strictMinMax = true;

              // Create series
              var series1 = chart.series.push(new am4charts.RadarColumnSeries());
              series1.dataFields.valueX = "full";
              series1.dataFields.categoryY = "category";
              series1.clustered = false;
              series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
              series1.columns.template.fillOpacity = 0.08;
              series1.columns.template.cornerRadiusTopLeft = 20;
              series1.columns.template.strokeWidth = 0;
              series1.columns.template.radarColumn.cornerRadius = 20;

              var series2 = chart.series.push(new am4charts.RadarColumnSeries());
              series2.dataFields.valueX = "value";
              series2.dataFields.categoryY = "category";
              series2.clustered = false;
              series2.columns.template.strokeWidth = 0;
              series2.columns.template.tooltipText = "{category}: [bold]{value}[/]";
              series2.columns.template.radarColumn.cornerRadius = 20;

              series2.columns.template.adapter.add("fill", function(fill, target) {
                return chart.colors.getIndex(target.dataItem.index);
              });

              // Add cursor
              chart.cursor = new am4charts.RadarCursor();
            }

            $scope.showMostPopulatedPieChart = function (chartData) {
                console.log("Chart Data is :::::", chartData);
                var chart = am4core.create("populated-chart", am4charts[$scope.mostPopulatedChartType]);
                chart.data = chartData;
                // Add and configure Series
                var pieSeries = chart.series.push(new am4charts.PieSeries());
                pieSeries.dataFields.value = "count";
                pieSeries.dataFields.category = "name";

            }

            $scope.showMostPopulatedSlicedChart = function (chartData) {
              am4core.useTheme(am4themes_animated);
              // Themes end

              var iconPath = "M53.5,476c0,14,6.833,21,20.5,21s20.5-7,20.5-21V287h21v189c0,14,6.834,21,20.5,21 c13.667,0,20.5-7,20.5-21V154h10v116c0,7.334,2.5,12.667,7.5,16s10.167,3.333,15.5,0s8-8.667,8-16V145c0-13.334-4.5-23.667-13.5-31 s-21.5-11-37.5-11h-82c-15.333,0-27.833,3.333-37.5,10s-14.5,17-14.5,31v133c0,6,2.667,10.333,8,13s10.5,2.667,15.5,0s7.5-7,7.5-13 V154h10V476 M61.5,42.5c0,11.667,4.167,21.667,12.5,30S92.333,85,104,85s21.667-4.167,30-12.5S146.5,54,146.5,42 c0-11.335-4.167-21.168-12.5-29.5C125.667,4.167,115.667,0,104,0S82.333,4.167,74,12.5S61.5,30.833,61.5,42.5z"



              var chart = am4core.create("populated-chart", am4charts.SlicedChart);
              chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

              chart.data = chartData;

              var series = chart.series.push(new am4charts.PictorialStackedSeries());
              series.dataFields.value = "value";
              series.dataFields.category = "name";
              series.alignLabels = true;

              series.maskSprite.path = iconPath;
              series.ticks.template.locationX = 1;
              series.ticks.template.locationY = 0.5;

              series.labelsContainer.width = 200;

              chart.legend = new am4charts.Legend();
              chart.legend.position = "left";
              chart.legend.valign = "bottom";

            }



            //On change Plant Id
            $scope.setPlantData = function (plantId) {
                $scope.mostViolatedZoneData(plantId);
                $scope.mostPopulatedZoneData(plantId);
                $scope.zoneProductivityChartData(plantId);
                $scope.mostFrequentZoneData(plantId);
            }

            $scope.viewAllViolatedZoneData = function () {
                if ($scope.mostViolatedGraphType == 0) {
                    $scope.showMostViolatedPieChart($scope.allViolatedZoneData);
                } else if ($scope.mostViolatedGraphType == 1) {
                    $scope.showMostViolatedBarChart($scope.allViolatedZoneData);
                } else if ($scope.mostViolatedGraphType == 2) {
                    $scope.showMostViolatedGaugeChart($scope.allViolatedZoneGaugeData)
                }

            }

            $scope.viewAllPopulatedZoneData = function () {
                if ($scope.mostPopulatedGraphType == 0) {
                    $scope.showMostPopulatedPieChart($scope.allPopulatedZoneData);
                }
                else if ($scope.mostPopulatedGraphType == 1) {
                    $scope.showMostPopulatedBarChart($scope.allPopulatedZoneData);
                }
                else if ($scope.mostPopulatedGraphType == 2) {
                    $scope.showMostPopulatedSlicedChart($scope.allPopulatedZonePictorialData2);
                }

            }

            $scope.mostFrequentZoneData = function (plantId) {
                $scope.loading = true;
                $http.get(config.host + '/reporting/assettypeviolationstats?plantId=' + plantId)
                    .then(function (res) {
                        if (res.data.success == true) {
                            if (Object.keys(res.data.data).length != 0) {
                                $scope.showMostFrequentChartErrorImage = false;
                                $scope.mostFrequentZone = res.data.data;
                                $scope.allFrequentZoneData = res.data.data.items;
                                $scope.allFrequentZoneData2 = res.data.data.items.map(item => {
                                  var tempObj = {}
                                  tempObj.name = item.assetType;
                                  tempObj.steps = item.count;
                                  return tempObj
                                })
                                // var chartData = [];
                                // var tempObj = {};
                                // tempObj["name"] = $scope.mostFrequentZone.name;
                                // tempObj["count"] = $scope.mostFrequentZone.count;
                                // chartData.push(tempObj);
                                $scope.showMostFrequentChartData($scope.allFrequentZoneData);
                                $scope.loading = false;
                            }
                            else {
                                $scope.showMostFrequentChartErrorImage = true;
                            }
                        }
                        else {
                            $scope.mostFrequentZone = '';
                            $scope.showMostFrequentChartErrorImage = true;
                            // var errorMessage = res.data.message;
                            // FlashService.showError(errorMessage);
                        }
                    });
            }

            $scope.showMostFrequentChartData = function (chartData) {
                var chart = am4core.create("chart6", am4charts.XYChart);
                // Add data
                chart.data = chartData;
                // Create axes
                var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "assetType";
                categoryAxis.renderer.grid.template.location = 0;
                categoryAxis.renderer.minGridDistance = 10;
                categoryAxis.renderer.labels.template.horizontalCenter = "left";
                categoryAxis.renderer.labels.template.verticalCenter = "middle";
                categoryAxis.renderer.labels.template.rotation = 40;
                categoryAxis.renderer.labels.template.fontSize = 10;
                categoryAxis.tooltip.disabled = true;
                categoryAxis.renderer.minHeight = 10;
                categoryAxis.title.text = "Asset Class ";
                categoryAxis.title.fontWeight = "bold";

                // categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
                //     if (target.dataItem && target.dataItem.index & 2 == 2) {
                //         return dy + 25;
                //     }
                //     return dy;
                // });

                var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis.min = 0;
                valueAxis.title.text = "Asset class violation count ";
                valueAxis.title.fontWeight = "bold";


                // Create series
                var series = chart.series.push(new am4charts.ColumnSeries());
                series.dataFields.valueY = "count";
                series.dataFields.categoryX = "assetType";
                series.name = "Count";
                series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
                series.columns.template.fillOpacity = .8;

                var columnTemplate = series.columns.template;
                columnTemplate.strokeWidth = 2;
                columnTemplate.strokeOpacity = 1;
            }

            $scope.zoneProductivityChartData = function (plantId) {
                $scope.loading = true;
                $http.get(config.host + '/reporting/zoneproductivity?plantId=' + plantId)
                    .then(function (res) {
                        if (res.data.success == true) {
                            if (Object.keys(res.data.data).length != 0 || res.data.data == (undefined)) {
                                $scope.showZoneProductivityErrorImage = false;
                                $scope.zoneProductivity = res.data.data.items;
                                var chartData = [];
                                var chartData2 = []
                                $scope.zoneProductivity.forEach(element => {
                                    var tempObj = {};
                                    tempObj["name"] = element.name;
                                    tempObj["count"] = Math.round(element.duration / 60);
                                    chartData.push(tempObj);
                                });
                                $scope.zoneProductivity.forEach(element => {
                                    var tempObj = {};
                                    tempObj["category"] = element.name;
                                    tempObj["value"] = Math.round(element.duration / 60);
                                    chartData2.push(tempObj);
                                });
                                $scope.zoneProductivityGraphData = chartData;
                                $scope.zoneProductivityGraphData2 = chartData2;
                                $scope.showZoneProductivityChartData(chartData);
                                $scope.loading = false;
                            } else {
                                $scope.showZoneProductivityErrorImage = true;
                                $scope.zoneProductivity = '';
                            }

                        }
                        else {
                            $scope.showZoneProductivityErrorImage = true;
                            var errorMessage = res.data.message;
                            //  FlashService.showError(errorMessage);
                        }
                    });
            }

            $scope.showZoneProductivityChartData = function (chartData) {
                var chart = am4core.create("chartdiv", am4charts.XYChart);
                // Add data
                chart.data = chartData;

                // Create axes
                var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "name";
                categoryAxis.renderer.grid.template.location = 0;
                categoryAxis.renderer.minGridDistance = 10;
                categoryAxis.renderer.labels.template.horizontalCenter = "left";
                categoryAxis.renderer.labels.template.verticalCenter = "middle";
                categoryAxis.renderer.labels.template.rotation = 40;
                categoryAxis.renderer.labels.template.fontSize = 10;
                categoryAxis.tooltip.disabled = true;
                categoryAxis.renderer.minHeight = 10;
                categoryAxis.title.text = "Zone name ";
                categoryAxis.title.fontWeight = "bold";


                // categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
                //     if (target.dataItem && target.dataItem.index & 2 == 2) {
                //         return dy + 25;
                //     }
                //     return dy;
                // });

                var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis.min = 0;
                valueAxis.title.text = "Zone productivity (in Hrs) ";
                valueAxis.title.fontWeight = "bold";

                // Create series
                var series = chart.series.push(new am4charts.ColumnSeries());
                series.dataFields.valueY = "count";
                series.dataFields.categoryX = "name";
                series.name = "Count";
                series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
                series.columns.template.fillOpacity = .8;

                var columnTemplate = series.columns.template;
                columnTemplate.strokeWidth = 2;
                columnTemplate.strokeOpacity = 1;
            }

            $scope.showZoneProductivityPieChart = function (chartData) {
                console.log("mostViolatedChart Type is ::::", $scope.zoneProductivityChartType);
                var chart = am4core.create("chartdiv", am4charts[$scope.zoneProductivityChartType]);
                chart.data = chartData;
                // Add and configure Series
                var pieSeries = chart.series.push(new am4charts.PieSeries());
                pieSeries.dataFields.value = "count";
                pieSeries.dataFields.category = "name";

            }

            $scope.showZoneProductivityHistogramChart = function (chartData) {

              am4core.useTheme(am4themes_animated);
              // Themes end

              // Create chart instance
              var chart = am4core.create("chartdiv", am4charts.RadarChart);
              chart.scrollbarX = new am4core.Scrollbar();

              var data = [];

              for(var i = 0; i < 20; i++){
              data.push({category: i, value:Math.round(Math.random() * 100)});
              }

              chart.data = chartData;
              chart.radius = am4core.percent(100);
              chart.innerRadius = am4core.percent(50);

              // Create axes
              var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
              categoryAxis.dataFields.category = "category";
              categoryAxis.renderer.grid.template.location = 0;
              categoryAxis.renderer.minGridDistance = 30;
              categoryAxis.tooltip.disabled = true;
              categoryAxis.renderer.minHeight = 110;
              categoryAxis.renderer.grid.template.disabled = true;
              //categoryAxis.renderer.labels.template.disabled = true;
              let labelTemplate = categoryAxis.renderer.labels.template;
              labelTemplate.radius = am4core.percent(-60);
              labelTemplate.location = 0.5;
              labelTemplate.relativeRotation = 90;

              var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
              valueAxis.renderer.grid.template.disabled = true;
              valueAxis.renderer.labels.template.disabled = true;
              valueAxis.tooltip.disabled = true;

              // Create series
              var series = chart.series.push(new am4charts.RadarColumnSeries());
              series.sequencedInterpolation = true;
              series.dataFields.valueY = "value";
              series.dataFields.categoryX = "category";
              series.columns.template.strokeWidth = 0;
              series.tooltipText = "{valueY}";
              series.columns.template.radarColumn.cornerRadius = 10;
              series.columns.template.radarColumn.innerCornerRadius = 0;

              series.tooltip.pointerOrientation = "vertical";

              // on hover, make corner radiuses bigger
              let hoverState = series.columns.template.radarColumn.states.create("hover");
              hoverState.properties.cornerRadius = 0;
              hoverState.properties.fillOpacity = 1;


              series.columns.template.adapter.add("fill", function(fill, target) {
              return chart.colors.getIndex(target.dataItem.index);
              })

              // Cursor
              chart.cursor = new am4charts.RadarCursor();
              chart.cursor.innerRadius = am4core.percent(50);
              chart.cursor.lineY.disabled = true;
            }


            $scope.showMostFrequentPieChart = function (chartData) {
                console.log("mostViolatedChart Type is ::::", $scope.mostFrequentZoneChartType);
                var chart = am4core.create("chart6", am4charts[$scope.mostFrequentZoneChartType]);
                chart.data = chartData;
                // Add and configure Series
                var pieSeries = chart.series.push(new am4charts.PieSeries());
                pieSeries.dataFields.value = "count";
                pieSeries.dataFields.category = "assetType";

            }

            $scope.showMostFrequentXYChart = function (chartData) {
              am4core.useTheme(am4themes_animated);
              var chart = am4core.create("chart6", am4charts.XYChart);
              chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

              chart.paddingBottom = 30;
              chart.data = chartData;

              // chart.data = [{
              //   "name": "Monica",
              //   "steps": 45688,
              // //  "href": "https://www.amcharts.com/wp-content/uploads/2019/04/monica.jpg"
              // }, {
              //   "name": "Joey",
              //   "steps": 35781,
              //   "href": "https://www.amcharts.com/wp-content/uploads/2019/04/joey.jpg"
              // }, {
              //   "name": "Ross",
              //   "steps": 25464,
              //   "href": "https://www.amcharts.com/wp-content/uploads/2019/04/ross.jpg"
              // }, {
              //   "name": "Phoebe",
              //   "steps": 18788,
              //   "href": "https://www.amcharts.com/wp-content/uploads/2019/04/phoebe.jpg"
              // }, {
              //   "name": "Rachel",
              //   "steps": 15465,
              //   "href": "https://www.amcharts.com/wp-content/uploads/2019/04/rachel.jpg"
              // }, {
              //   "name": "Chandler",
              //   "steps": 11561,
              //   "href": "https://www.amcharts.com/wp-content/uploads/2019/04/chandler.jpg"
              // }];

              var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
              categoryAxis.dataFields.category = "name";
              categoryAxis.renderer.grid.template.strokeOpacity = 0;
              categoryAxis.renderer.minGridDistance = 10;
              categoryAxis.renderer.labels.template.dy = 35;
              categoryAxis.renderer.tooltip.dy = 35;

              var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
              valueAxis.renderer.inside = true;
              valueAxis.renderer.labels.template.fillOpacity = 0.3;
              valueAxis.renderer.grid.template.strokeOpacity = 0;
              valueAxis.min = 0;
              valueAxis.cursorTooltipEnabled = false;
              valueAxis.renderer.baseGrid.strokeOpacity = 0;

              var series = chart.series.push(new am4charts.ColumnSeries);
              series.dataFields.valueY = "steps";
              series.dataFields.categoryX = "name";
              series.tooltipText = "{valueY.value}";
              series.tooltip.pointerOrientation = "vertical";
              series.tooltip.dy = - 6;
              series.columnsContainer.zIndex = 100;

              var columnTemplate = series.columns.template;
              columnTemplate.width = am4core.percent(50);
              columnTemplate.maxWidth = 66;
              columnTemplate.column.cornerRadius(60, 60, 10, 10);
              columnTemplate.strokeOpacity = 0;

              series.heatRules.push({ target: columnTemplate, property: "fill", dataField: "valueY", min: am4core.color("#e5dc36"), max: am4core.color("#5faa46") });
              series.mainContainer.mask = undefined;

              var cursor = new am4charts.XYCursor();
              chart.cursor = cursor;
              cursor.lineX.disabled = true;
              cursor.lineY.disabled = true;
              cursor.behavior = "none";

              var bullet = columnTemplate.createChild(am4charts.CircleBullet);
              bullet.circle.radius = 30;
              bullet.valign = "bottom";
              bullet.align = "center";
              bullet.isMeasured = true;
              bullet.mouseEnabled = false;
              bullet.verticalCenter = "bottom";
              bullet.interactionsEnabled = false;

              var hoverState = bullet.states.create("hover");
              var outlineCircle = bullet.createChild(am4core.Circle);
              outlineCircle.adapter.add("radius", function (radius, target) {
                var circleBullet = target.parent;
                return circleBullet.circle.pixelRadius + 10;
              })

              var image = bullet.createChild(am4core.Image);
              image.width = 60;
              image.height = 60;
              image.horizontalCenter = "middle";
              image.verticalCenter = "middle";
              image.propertyFields.href = "href";

              image.adapter.add("mask", function (mask, target) {
                var circleBullet = target.parent;
                return circleBullet.circle;
              })

              var previousBullet;
              chart.cursor.events.on("cursorpositionchanged", function (event) {
                var dataItem = series.tooltipDataItem;

                if (dataItem.column) {
                    var bullet = dataItem.column.children.getIndex(1);

                    if (previousBullet && previousBullet != bullet) {
                        previousBullet.isHover = false;
                    }

                    if (previousBullet != bullet) {

                        var hs = bullet.states.getKey("hover");
                        hs.properties.dy = -bullet.parent.pixelHeight + 30;
                        bullet.isHover = true;

                        previousBullet = bullet;
                    }
                }
              })

            }


            $scope.loadData = function () {
                $scope.getPlantList();
                $scope.notificationApi();
            }
        }]);
