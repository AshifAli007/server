'use strict';
angular.module('app')
    .controller('reporting', ['$scope', 'socketIO', '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window', '$anchorScroll', 'toaster', 'FlashService',
        function ($scope, socketIO, $rootScope, $http, sessionInjector, config, Sessioncheck, $timeout, $location, $window, $anchorScroll, toaster, FlashService) {
            $scope.loading = false;
            $scope.showChartDetailedData = false;

            /**method to convert date into DD MMM YY (hh:mm a) format */
            var dateConverter = function (inputDate) {
                var lastConndate = new Date(parseInt(inputDate));
                return moment(lastConndate).format("DD MMM YYYY");
            }

            /**datatable for detail view */
            var detailsViewDatatable = function (detailViewdata) {
                $('#ViewDetail').DataTable({
                    data: detailViewdata,
                    "pageLength": 5,
                    "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
                    "bDestroy": true,
                    dom: 'Bfrtip',
                    buttons: [
                        'copyHtml5',
                        'excelHtml5',
                        'csvHtml5',
                        'pdfHtml5'
                    ],
                    columns: [
                        {
                            "data": "zoneName"
                        },
                        {
                            "data": "empId"
                        },
                        {
                            "data": "empName"
                        },
                        {
                            "data": "isAllowed",
                            render: function (data, type, row) {
                                return data == '0' ? 'Yes' : 'No'
                            }
                        },
                        {
                            "data": "entryTime",
                            render: function (data, type, row) {
                                if (data) {
                                    if (data == 0) {
                                        return '';
                                    }
                                    var lastConndate = new Date(parseInt(data));
                                    var lDate = moment(lastConndate).format("DD MMM YY (hh:mm:ss a)");
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
                            "data": "exitTime",
                            render: function (data, type, row) {
                                if (data) {
                                    if (data == 0) {
                                        return '';
                                    }
                                    var lastConndate = new Date(parseInt(data));
                                    var lDate = moment(lastConndate).format("DD MMM YY (hh:mm:ss a)");
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
                            "data": "timeSpent",
                            render: function (data, type, row) {
                                var lastConndate = data;
                                if (lastConndate > 1) {
                                    lastConndate = lastConndate + ' Minutes'
                                }
                                else {
                                    lastConndate = lastConndate + ' Minute'
                                }
                                return lastConndate;
                            }
                        }
                    ]
                });
            }

            /**Get Asset Type list */
            $http.get(config.host + '/employee')
                .then(function (res) {
                    if (res.data.success == true) {
                        var empData = res.data.data;
                        $scope.empData = empData;
                    }
                });


            /**Get Kpis List */
            $scope.getKPIList = function (kpiType) {
                $scope.loading = true;
                if (kpiType == '1') {
                    $scope.headerName = "Zone Name"
                }
                else if (kpiType == '2') {
                    $scope.headerName = "Asset Name"
                }
                else {
                    $scope.headerName = "";
                }
                $scope.kpiListArray = [];
                $scope.kpi = "";
                if (kpiType) {
                    $http.get(config.host + '/kpis' + "?type=" + kpiType)
                        .then(function (res) {

                            if (res.data.success == true) {
                                $scope.kpiListArray = res.data.items;
                                $timeout(function () {
                                    $scope.loading = false;
                                }, 500);
                            }
                            else {
                                $scope.kpiListArray = [];
                                $timeout(function () {
                                    $scope.loading = false;
                                }, 500);
                            }
                        });
                }
                else {
                    $timeout(function () {
                        $scope.loading = false;
                    }, 1000);
                }
            }

            /**Get Zone List */
            $http.get(config.host + '/zone')
                .then(function (res) {
                    if (res.data.success == true) {
                        $scope.zoneListArray = res.data.items;
                        var allZone = {
                            id: 0,
                            "name": "All Zones"
                        }
                        $scope.zoneListArray.unshift(allZone);
                        $scope.zone = "" + $scope.zoneListArray[0].id;
                    }
                });


            /**Get getAssetTypeList */
            $http.get(config.host + '/assetType')
                .then(function (res) {
                    if (res.data.success == true) {
                        $scope.assetTypeListArray = res.data.items;
                    }
                });

            /**Get getSubTypeList */
            $scope.getSubTypeList = function (id) {
                $scope.subTypeArray = [];
                if (id) {
                    $http.get(config.host + '/assetType/' + id + '/subType')
                        .then(function (res) {
                            if (res.data.success == true) {
                                if (res.data.data.subType.length > 0) {
                                    $scope.subTypeArray = res.data.data.subType;
                                }
                                else {
                                    $scope.subTypeArray = [];
                                }
                            }
                        });
                }
            }

            /**Get getPlantList */
            $scope.getPlantList = function () {
                $http.get(config.host + '/plants')
                    .then(function (res) {
                        if (res.data.success == true) {
                            $scope.plantList = res.data.data;
                        }
                        else {
                            var errorMessage = res.data.message;
                            FlashService.showError(errorMessage);
                        }
                    });
            }
            $scope.getPlantList();

            /**reset startDate and endDate filters */
            $scope.resetDates = function (filter) {
                $scope.startDate = "";
                $scope.endDate = "";
            }

            var makePieChart = function (pieChartData) {
                var chart = AmCharts.makeChart("chartdiv", {
                    "type": "pie",
                    "theme": "light",
                    "dataProvider": pieChartData,
                    "labelText": "[[title]]: [[value]]",
                    "valueField": "value",
                    "titleField": "label",
                    "balloonText": "<span>[[title]]: [[value]]</span>",
                    "exportConfig": {
                        menuItems: [{
                            icon: '/lib/3/images/export.png',
                            format: 'png'
                        }]
                    }
                });
                chart.addListener("clickSlice", handleChartSliceClick);
            }

            function handleChartSliceClick(event) {
                $scope.showChartDetailedData = true;
                $scope.viewDetailedData(event);
            }

            var makeBarChart = function (barChartData) {
                var chart = AmCharts.makeChart("chartdiv", {
                    "type": "serial",
                    "dataProvider": barChartData,
                    "categoryField": "KPIName",
                    "categoryAxis": { "autoWrap": true, "autoRotateCount": 2, "autoRotateAngle": 75, "title": "KPIName" },
                    "valueAxes": [{ "title": "Count", "axisAlpha": 0.15, "gridAlpha": 0.15 }],
                    "graphs": [{
                        "alphaField": "alpha",
                        "balloonText": "<span style='font-size:13px;'> [[category]]: <b>[[value]]</b> [[additional]]</span> <br>[[description]]",
                        "dashLengthField": "dashLengthColumn",
                        type: "column",
                        valueField: "Count",
                        colorField: "color",
                        fillAlphas: 1,
                    }]
                });

                chart.addListener("clickGraphItem", handleChartSliceClick);
            }

            /**VewReport method to populate table and charts */
            $scope.viewReport = function (reportingType) {
                $scope.showChartDetailedData = false;
                var kpi = $scope.kpi;
                if (kpi.indexOf('KS001') != -1) {
                    var i;
                    for (i = kpi.length - 1; i >= 0; i -= 1) {
                        if (kpi[i] === 'KS001' || kpi[i] === 'KC001' || kpi[i] === 'KC002' || kpi[i] === 'KC003' || kpi[i] === 'KC004' || kpi[i] === 'KC005') {
                            kpi.splice(i, 1);
                        }
                    }
                    var tempKPIArr = ['KC001', 'KC002', 'KC003', 'KC004', 'KC005'];
                    kpi = tempKPIArr.concat(kpi);
                    $scope.kpi = ['KS001'];
                }
                var plantId = $scope.plant;
                var type = $scope.filter;
                var assetTypeId = $scope.assetType;
                var startDate = new Date($scope.startDate).getTime();
                var endDate = new Date($scope.endDate).getTime();
                var duration = endDate - startDate;

                if (endDate < startDate) {
                    FlashService.showError('End date can not be before Start date');
                    return;
                }
                // else if ($scope.filter == '2' && duration < 6.048e+8) {
                //     FlashService.showError('selected duration is less than a week');
                //     return;
                // }
                // else if ($scope.filter == '3' && duration < 2.592e+9) {
                //     FlashService.showError('selected duration is less than a month');
                //     return;
                // }
                if (!$scope.specificAsset) {
                    var empId = "";
                }
                else {
                    var empId = $scope.specificAsset;
                }
                if (!$scope.zone || $scope.zone == "0") {
                    var zoneId = "";
                }
                else {
                    var zoneId = $scope.zone;
                }
                if (!$scope.subType) {
                    var assetSubTypeId = "";
                }
                else {
                    var assetSubTypeId = $scope.subType;
                }

                var resultType = 1;

                $scope.loading = true;
                $http.get(config.host + "/reporting?kpi=" + JSON.stringify(kpi) + "&startDate=" + startDate + "&endDate=" + endDate + "&plantId=" + plantId
                    + "&zoneId=" + zoneId + "&empId=" + empId + "&assetTypeId=" + assetTypeId + "&assetSubTypeId=" + assetSubTypeId + "&type=" + type + "&resultType=" + resultType)
                    .then(function (res) {
                        if (res.data.success == true) {
                            $scope.loading = false;
                            $scope.reportingData = res.data.items;

                            var reportingListData = [];
                            var inputData = [];
                            var dataObject = {
                                columns: [{
                                    title: $scope.headerName
                                }]
                            };

                            if ($scope.kpiType == 1) {
                                $scope.reportingData.forEach(element => {
                                    var headerObj = {
                                        title: element.kpiName
                                    }
                                    dataObject.columns.push(headerObj);

                                    element[element.kpiId].forEach(zone => {
                                        zone.items.forEach(item => {
                                            var rowData = [];
                                            if ($scope.filter != 1) {
                                                rowData.push(dateConverter(item.date) + ' - ' + dateConverter(item.endDate));
                                            }
                                            else {
                                                rowData.push(dateConverter(item.date));
                                            }
                                            rowData.push(zone.name);
                                            rowData.push(element.kpiId);
                                            if (zone.time_field == true) {
                                                if (item.totalValue > 1) {
                                                    rowData.push(item.totalValue + ' Minutes');
                                                }
                                                else {
                                                    rowData.push(item.totalValue + ' Minute');
                                                }
                                            }
                                            else {
                                                rowData.push(item.totalValue);
                                            }
                                            rowData.push(zone.zoneId);
                                            rowData.push(item.date);
                                            rowData.push(item.endDate);
                                            inputData.push(rowData);
                                        });
                                    });
                                });

                                var kpids = $scope.reportingData.map(item => item.kpiId)
                                var finalArr = inputData.map(item => {
                                    let filtered = inputData.filter((secondItem => (secondItem[0] === item[0] && secondItem[1] === item[1])))
                                    let returnArr = [filtered[0][0], filtered[0][1]]
                                    let filteredIds = kpids.map(items => filtered.filter(inneritem => inneritem[2] === items));
                                    let filteredKpis = filteredIds.map(thirditem => thirditem[0][3]);
                                    let returnZoneEndDate = [filtered[0][4], filtered[0][5], filtered[0][6]]
                                    return [...returnArr, ...filteredKpis, ...returnZoneEndDate]
                                })
                                finalArr = [... new Set(finalArr)];
                            }
                            else {
                                $scope.reportingData.forEach(element => {
                                    var headerObj = {
                                        title: element.kpiName
                                    }
                                    dataObject.columns.push(headerObj);

                                    element[element.kpiId].forEach(zone => {
                                        zone.items.forEach(item => {
                                            item.result.forEach(assetData => {
                                                var rowData = [];
                                                if ($scope.filter != 1) {
                                                    rowData.push(dateConverter(item.date) + ' - ' + dateConverter(item.endDate));
                                                }
                                                else {
                                                    rowData.push(dateConverter(item.date));
                                                }
                                                rowData.push(zone.name);
                                                rowData.push(element.kpiId);
                                                rowData.push(assetData.name);
                                                if (zone.time_field == true) {
                                                    if (assetData.value > 1) {
                                                        rowData.push(assetData.value + ' Minutes');
                                                    }
                                                    else {
                                                        rowData.push(assetData.value + ' Minute');
                                                    }
                                                }
                                                else {
                                                    rowData.push(assetData.value);
                                                }
                                                rowData.push(zone.zoneId);
                                                rowData.push(assetData.startDate);
                                                rowData.push(assetData.endDate);
                                                rowData.push(assetData.empId);
                                                inputData.push(rowData);
                                            });
                                        });
                                    });
                                });

                                var kpids = $scope.reportingData.map(item => item.kpiId)
                                var finalArr = inputData.map(item => {
                                    let filtered = inputData.filter((secondItem => (secondItem[0] === item[0] && secondItem[1] === item[1] && secondItem[3] === item[3])))
                                    let returnArr = [filtered[0][0], filtered[0][1], filtered[0][3]]
                                    let filteredIds = kpids.map(items => filtered.filter(inneritem => inneritem[2] === items));
                                    let filteredKpis = filteredIds.map(thirditem => thirditem[0] ? thirditem[0][4] : 0);
                                    let filteredEmpIdZoneId = [filtered[0][5], filtered[0][6], filtered[0][7], filtered[0][8]];
                                    return [...returnArr, ...filteredKpis, ...filteredEmpIdZoneId]
                                })
                                finalArr = [... new Set(finalArr)];
                            }
                            /**code for removing duplicate array elements starts */
                            var hashMap = {}
                            finalArr.forEach(function (arr) {
                                // If your subArrays can be in any order, you can use .sort to have consistant order
                                hashMap[arr.join("|")] = arr;
                            });
                            var tableData = Object.keys(hashMap).map(function (k) {
                                return hashMap[k]
                            })
                            /**code for removing duplicate array elements ends */

                            /**Reporting data for table */
                            if ($scope.reportType == '1') {
                                var date = {
                                    title: "Date"
                                }
                                dataObject.columns.unshift(date);
                                $scope.csvColumns = JSON.parse(JSON.stringify(dataObject.columns));

                                var actionColumn = {
                                    title: "Action"
                                }
                                dataObject.columns.push(actionColumn);

                                if ($scope.kpiType == 2) {
                                    var ZoneNameColumn = {
                                        title: "Zone Name"
                                    }
                                    dataObject.columns.splice(1, 0, ZoneNameColumn);
                                }
                                if (!tableData.length) {
                                    FlashService.showError('No record found for selected KPI.');
                                }
                                /**code for dynamic data table starts */
                                if ($.fn.DataTable.isDataTable('#example')) {
                                    $('#example').DataTable().clear().destroy();
                                    $('#example tbody').empty();
                                    $('#example thead').empty();
                                }
                                var table = $('#example').DataTable({
                                    "bDestroy": true,
                                    "data": tableData,
                                    // "order": [[1, "desc"]],
                                    "columns": dataObject.columns,
                                    "columnDefs": [{
                                        "targets": -1,
                                        "data": null,
                                        "defaultContent": '<button type="button" id="detailView" class="btn btn-warning text-dark" data-toggle="modal">View Detail</button>'
                                    }]
                                });
                                $('#example tbody').on('click', '#detailView', function () {
                                    $scope.loading = true;
                                    var data = table.row($(this).parents('tr')).data();
                                    if (data == undefined) {
                                        console.log("Click undefined");
                                        $scope.loading = false;
                                    } else {
                                        $scope.loading = true;
                                        var kpi = $scope.kpi;
                                        if (kpi.indexOf('KS001') != -1) {
                                            var i;
                                            for (i = kpi.length - 1; i >= 0; i -= 1) {
                                                if (kpi[i] === 'KS001' || kpi[i] === 'KC001' || kpi[i] === 'KC002' || kpi[i] === 'KC003' || kpi[i] === 'KC004' || kpi[i] === 'KC005') {
                                                    kpi.splice(i, 1);
                                                }
                                            }
                                            var tempKPIArr = ['KC001', 'KC002', 'KC003', 'KC004', 'KC005'];
                                            kpi = tempKPIArr.concat(kpi);
                                            $scope.kpi = ['KS001'];
                                        }
                                        var plantId = $scope.plant;
                                        var assetTypeId = $scope.assetType;

                                        if (!$scope.subType) {
                                            var assetSubTypeId = "";
                                        }
                                        else {
                                            var assetSubTypeId = $scope.subType;
                                        }

                                        if ($scope.kpiType == 2) {
                                            var empId = data[data.length - 1];
                                            var endDate = data[data.length - 2];
                                            var startDate = data[data.length - 3];
                                            var zoneId = data[data.length - 4];
                                        }
                                        else {
                                            var endDate = data[data.length - 1];
                                            var startDate = data[data.length - 2];
                                            var zoneId = data[data.length - 3];

                                            if (!$scope.specificAsset) {
                                                var empId = "";
                                            }
                                            else {
                                                var empId = $scope.specificAsset;
                                            }
                                        }
                                        $http.get(config.host + "/reporting/detail?kpi=" + JSON.stringify(kpi) + "&startDate=" + startDate + "&endDate=" + endDate + "&plantId=" + plantId
                                            + "&zoneId=" + zoneId + "&empId=" + empId + "&assetTypeId=" + assetTypeId + "&assetSubTypeId=" + assetSubTypeId)
                                            .then(function (res) {
                                                $scope.loading = true;
                                                if (res.data.success == true) {
                                                    var detailArrayData = res.data.items;
                                                    detailsViewDatatable(detailArrayData);
                                                    $('#reportingModal').modal('show');
                                                    $scope.loading = false;
                                                }
                                                else {
                                                    $scope.loading = false;
                                                }
                                            })
                                    }

                                });
                                /**code for dynamic data table ends */
                            }

                            /**Reporting data for Pie Chart */
                            else if ($scope.reportType == '2') {
                                $scope.showErrorPie = false;
                                var pieChartData = [];
                                $scope.reportingData.forEach(element => {
                                    element[element.kpiId].forEach(zone => {
                                        if (zone.time_field == true) {
                                            var tempObj = {
                                                'label': element.kpiName + ' in Min' + '(Zone: ' + zone.name + ')',
                                                'value': zone.kpiValue,
                                                'items': zone.items,
                                                'zoneId': zone.zoneId,
                                                'kpi': element.kpiId
                                            }
                                        }
                                        else {
                                            var tempObj = {
                                                'label': element.kpiName + '(Zone: ' + zone.name + ')',
                                                'value': zone.kpiValue,
                                                'items': zone.items,
                                                'zoneId': zone.zoneId,
                                                'kpi': element.kpiId
                                            }
                                        }
                                        if (tempObj.value > 0) {
                                            pieChartData.push(tempObj);
                                        }
                                    });
                                });

                                if (pieChartData.length > 0) {
                                    makePieChart(pieChartData);
                                }
                                else {
                                    $scope.showErrorPie = true;
                                    makePieChart(pieChartData);
                                    FlashService.showError('No record found for selected KPI.');
                                }
                            }

                            /**Reporting data for Bar Chart */
                            else if ($scope.reportType == '3') {
                                $scope.showErrorBar = false;
                                var barChartData = [];
                                $scope.reportingData.forEach(element => {
                                    element[element.kpiId].forEach(zone => {
                                        if (zone.time_field == true) {
                                            var tempObj = {
                                                'kpi': element.kpiId,
                                                'kpiName': element.kpiName + ' in Min',
                                                'zoneName': zone.name,
                                                'count': zone.kpiValue,
                                                'items': zone.items,
                                                'zoneId': zone.zoneId,
                                            }
                                        }
                                        else {
                                            var tempObj = {
                                                'kpi': element.kpiId,
                                                'kpiName': element.kpiName,
                                                'zoneName': zone.name,
                                                'count': zone.kpiValue,
                                                'items': zone.items,
                                                'zoneId': zone.zoneId,
                                            }
                                        }
                                        if (tempObj.count > 0) {
                                            reportingListData.push(tempObj);
                                        }
                                    });
                                });

                                reportingListData.forEach(element => {
                                    var tempObj = {};
                                    tempObj["KPIName"] = element.kpiName + '(Zone: ' + element.zoneName + ')';
                                    tempObj["Count"] = element.count;
                                    tempObj["Items"] = element.items;
                                    tempObj["zoneId"] = element.zoneId;
                                    tempObj["kpi"] = element.kpi;
                                    barChartData.push(tempObj);
                                });

                                if (barChartData.length > 0) {
                                    makeBarChart(barChartData);
                                }
                                else {
                                    $scope.showErrorBar = true;
                                    makeBarChart(barChartData);
                                    FlashService.showError('No record found for selected KPI.');
                                }
                            }

                        }
                        else {
                            $scope.loading = false;
                            var errorMessage = res.data.message;
                            FlashService.showError(errorMessage);
                        }
                    })
                    .catch(function (e) {
                        $scope.loading = false;
                    });

                $scope.reportFormat = reportingType;
                /**below line of code shifts scrool to bottom */
                $location.hash('reports');
                $anchorScroll();
            }

            $scope.viewDetailedData = function (event) {
                var kpi = [];
                if ($scope.reportType == 2) {
                    var kpi = kpi.concat(event.dataItem.dataContext.kpi);
                }
                else {
                    var kpi = kpi.concat(event.item.dataContext.kpi);
                }
                if (kpi.indexOf('KS001') != -1) {
                    var i;
                    for (i = kpi.length - 1; i >= 0; i -= 1) {
                        if (kpi[i] === 'KS001' || kpi[i] === 'KC001' || kpi[i] === 'KC002' || kpi[i] === 'KC003' || kpi[i] === 'KC004' || kpi[i] === 'KC005') {
                            kpi.splice(i, 1);
                        }
                    }
                    var tempKPIArr = ['KC001', 'KC002', 'KC003', 'KC004', 'KC005'];
                    kpi = tempKPIArr.concat(kpi);
                    kpi = ['KS001'];
                }
                var plantId = $scope.plant;
                var type = $scope.filter;
                var assetTypeId = $scope.assetType;
                var startDate = new Date($scope.startDate).getTime();
                var endDate = new Date($scope.endDate).getTime();
                var duration = endDate - startDate;

                if (!$scope.specificAsset) {
                    var empId = "";
                }
                else {
                    var empId = $scope.specificAsset;
                }

                if ($scope.reportType == 2) {
                    var zoneId = event.dataItem.dataContext.zoneId;
                }
                else {
                    var zoneId = event.item.dataContext.zoneId;
                }
                if (!$scope.subType) {
                    var assetSubTypeId = "";
                }
                else {
                    var assetSubTypeId = $scope.subType;
                }

                var resultType = 1;

                $scope.loading = true;
                $http.get(config.host + "/reporting?kpi=" + JSON.stringify(kpi) + "&startDate=" + startDate + "&endDate=" + endDate + "&plantId=" + plantId
                    + "&zoneId=" + zoneId + "&empId=" + empId + "&assetTypeId=" + assetTypeId + "&assetSubTypeId=" + assetSubTypeId + "&type=" + type + "&resultType=" + resultType)
                    .then(function (res) {
                        if (res.data.success == true) {
                            $scope.loading = false;
                            $scope.reportingData = res.data.items;

                            var reportingListData = [];
                            var inputData = [];
                            var dataObject = {
                                columns: [{
                                    title: $scope.headerName
                                }]
                            };

                            if ($scope.kpiType == 1) {
                                $scope.reportingData.forEach(element => {
                                    var headerObj = {
                                        title: element.kpiName
                                    }
                                    dataObject.columns.push(headerObj);

                                    element[element.kpiId].forEach(zone => {
                                        zone.items.forEach(item => {
                                            var rowData = [];
                                            if ($scope.filter != 1) {
                                                rowData.push(dateConverter(item.date) + ' - ' + dateConverter(item.endDate));
                                            }
                                            else {
                                                rowData.push(dateConverter(item.date));
                                            }
                                            rowData.push(zone.name);
                                            rowData.push(element.kpiId);
                                            if (zone.time_field == true) {
                                                if (item.totalValue > 1) {
                                                    rowData.push(item.totalValue + ' Minutes');
                                                }
                                                else {
                                                    rowData.push(item.totalValue + ' Minute');
                                                }
                                            }
                                            else {
                                                rowData.push(item.totalValue);
                                            }
                                            rowData.push(zone.zoneId);
                                            rowData.push(item.date);
                                            rowData.push(item.endDate);
                                            inputData.push(rowData);
                                        });
                                    });
                                });

                                var kpids = $scope.reportingData.map(item => item.kpiId)
                                var finalArr = inputData.map(item => {
                                    let filtered = inputData.filter((secondItem => (secondItem[0] === item[0] && secondItem[1] === item[1])))
                                    let returnArr = [filtered[0][0], filtered[0][1]]
                                    let filteredIds = kpids.map(items => filtered.filter(inneritem => inneritem[2] === items));
                                    let filteredKpis = filteredIds.map(thirditem => thirditem[0][3]);
                                    let returnZoneEndDate = [filtered[0][4], filtered[0][5], filtered[0][6]]
                                    return [...returnArr, ...filteredKpis, ...returnZoneEndDate]
                                })
                                finalArr = [... new Set(finalArr)];
                            }
                            else {
                                $scope.reportingData.forEach(element => {
                                    var headerObj = {
                                        title: element.kpiName
                                    }
                                    dataObject.columns.push(headerObj);

                                    element[element.kpiId].forEach(zone => {
                                        zone.items.forEach(item => {
                                            item.result.forEach(assetData => {
                                                var rowData = [];
                                                if ($scope.filter != 1) {
                                                    rowData.push(dateConverter(item.date) + ' - ' + dateConverter(item.endDate));
                                                }
                                                else {
                                                    rowData.push(dateConverter(item.date));
                                                }
                                                rowData.push(zone.name);
                                                rowData.push(element.kpiId);
                                                rowData.push(assetData.name);
                                                if (zone.time_field == true) {
                                                    if (assetData.value > 1) {
                                                        rowData.push(assetData.value + ' Minutes');
                                                    }
                                                    else {
                                                        rowData.push(assetData.value + ' Minute');
                                                    }
                                                }
                                                else {
                                                    rowData.push(assetData.value);
                                                }
                                                rowData.push(zone.zoneId);
                                                rowData.push(assetData.startDate);
                                                rowData.push(assetData.endDate);
                                                rowData.push(assetData.empId);
                                                inputData.push(rowData);
                                            });
                                        });
                                    });
                                });

                                var kpids = $scope.reportingData.map(item => item.kpiId)
                                var finalArr = inputData.map(item => {
                                    let filtered = inputData.filter((secondItem => (secondItem[0] === item[0] && secondItem[1] === item[1] && secondItem[3] === item[3])))
                                    let returnArr = [filtered[0][0], filtered[0][1], filtered[0][3]]
                                    let filteredIds = kpids.map(items => filtered.filter(inneritem => inneritem[2] === items));
                                    let filteredKpis = filteredIds.map(thirditem => thirditem[0] ? thirditem[0][4] : 0);
                                    let filteredEmpIdZoneId = [filtered[0][5], filtered[0][6], filtered[0][7], filtered[0][8]];
                                    return [...returnArr, ...filteredKpis, ...filteredEmpIdZoneId]
                                })
                                finalArr = [... new Set(finalArr)];
                            }
                            /**code for removing duplicate array elements starts */
                            var hashMap = {}
                            finalArr.forEach(function (arr) {
                                // If your subArrays can be in any order, you can use .sort to have consistant order
                                hashMap[arr.join("|")] = arr;
                            });
                            var tableData = Object.keys(hashMap).map(function (k) {
                                return hashMap[k]
                            })
                            /**code for removing duplicate array elements ends */

                            /**Reporting data for table */
                            var date = {
                                title: "Date"
                            }
                            dataObject.columns.unshift(date);
                            $scope.csvColumns = JSON.parse(JSON.stringify(dataObject.columns));

                            var actionColumn = {
                                title: "Action"
                            }
                            dataObject.columns.push(actionColumn);

                            if ($scope.kpiType == 2) {
                                var ZoneNameColumn = {
                                    title: "Zone Name"
                                }
                                dataObject.columns.splice(1, 0, ZoneNameColumn);
                            }
                            if (!tableData.length) {
                                FlashService.showError('No record found for selected KPI.');
                            }
                            /**code for dynamic data table starts */
                            if ($.fn.DataTable.isDataTable('#example')) {
                                $('#example').DataTable().clear().destroy();
                                $('#example tbody').empty();
                                $('#example thead').empty();
                            }
                            var table = $('#example').DataTable({
                                "bDestroy": true,
                                "data": tableData,
                                // "order": [[1, "desc"]],
                                "columns": dataObject.columns,
                                "columnDefs": [{
                                    "targets": -1,
                                    "data": null,
                                    "defaultContent": '<button type="button" id="detailView" class="btn btn-warning text-dark" data-toggle="modal">View Detail</button>'
                                }]
                            });

                            $('#example tbody').on('click', '#detailView', function () {
                                $scope.loading = true;
                                var data = table.row($(this).parents('tr')).data();
                                if (data == undefined) {
                                    console.log("Click undefined");
                                    $scope.loading = false;
                                } else {
                                    $scope.loading = true;
                                    var kpi = $scope.kpi;
                                    if (kpi.indexOf('KS001') != -1) {
                                        var i;
                                        for (i = kpi.length - 1; i >= 0; i -= 1) {
                                            if (kpi[i] === 'KS001' || kpi[i] === 'KC001' || kpi[i] === 'KC002' || kpi[i] === 'KC003' || kpi[i] === 'KC004' || kpi[i] === 'KC005') {
                                                kpi.splice(i, 1);
                                            }
                                        }
                                        var tempKPIArr = ['KC001', 'KC002', 'KC003', 'KC004', 'KC005'];
                                        kpi = tempKPIArr.concat(kpi);
                                        $scope.kpi = ['KS001'];
                                    }
                                    var plantId = $scope.plant;
                                    var assetTypeId = $scope.assetType;

                                    if (!$scope.subType) {
                                        var assetSubTypeId = "";
                                    }
                                    else {
                                        var assetSubTypeId = $scope.subType;
                                    }

                                    if ($scope.kpiType == 2) {
                                        var empId = data[data.length - 1];
                                        var endDate = data[data.length - 2];
                                        var startDate = data[data.length - 3];
                                        var zoneId = data[data.length - 4];
                                    }
                                    else {
                                        var endDate = data[data.length - 1];
                                        var startDate = data[data.length - 2];
                                        var zoneId = data[data.length - 3];

                                        if (!$scope.specificAsset) {
                                            var empId = "";
                                        }
                                        else {
                                            var empId = $scope.specificAsset;
                                        }
                                    }
                                    $http.get(config.host + "/reporting/detail?kpi=" + JSON.stringify(kpi) + "&startDate=" + startDate + "&endDate=" + endDate + "&plantId=" + plantId
                                        + "&zoneId=" + zoneId + "&empId=" + empId + "&assetTypeId=" + assetTypeId + "&assetSubTypeId=" + assetSubTypeId)
                                        .then(function (res) {
                                            $scope.loading = true;
                                            if (res.data.success == true) {
                                                var detailArrayData = res.data.items;
                                                detailsViewDatatable(detailArrayData);
                                                $('#reportingModal').modal('show');
                                                $scope.loading = false;
                                            }
                                            else {
                                                $scope.loading = false;
                                            }
                                        })
                                }

                            });
                            /**code for dynamic data table ends */

                        }
                        else {
                            $scope.loading = false;
                            var errorMessage = res.data.message;
                            FlashService.showError(errorMessage);
                        }
                    })
                    .catch(function (e) {
                        $scope.loading = false;
                    });

                $location.hash('reports');
                $anchorScroll();
            }

            /**code for detailView table exportCSV from main reporting table starts */
            $(document).ready(function () {
                function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
                    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
                    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

                    var CSV = '';
                    //Set Report title in first row or line

                    CSV += ReportTitle + '\r\n\n';

                    //This condition will generate the Label/Header
                    if (ShowLabel) {
                        var row = "";

                        //This loop will extract the label from 1st index of on array
                        for (var index in arrData[0]) {

                            //Now convert each value to string and comma-seprated
                            row += index + ',';
                        }

                        row = row.slice(0, -1);

                        //append Label row with line break
                        CSV += row + '\r\n';
                    }

                    //1st loop is to extract each row
                    for (var i = 0; i < arrData.length; i++) {
                        var row = "";

                        //2nd loop will extract each column and convert it in string comma-seprated
                        for (var index in arrData[i]) {
                            row += '"' + arrData[i][index] + '",';
                        }

                        row.slice(0, row.length - 1);

                        //add a line break after each row
                        CSV += row + '\r\n';
                    }

                    if (CSV == '') {
                        alert("Invalid data");
                        return;
                    }

                    //Generate a file name 
                    var date = new Date();
                    if (ReportTitle == "KPI Report") {
                        var fileName = "KPI_Report" + '_' + date.getDate() + '_' + date.getMonth() + '_' + date.getFullYear();
                    }
                    else {
                        var fileName = "KPI_Details" + '_' + date.getDate() + '_' + date.getMonth() + '_' + date.getFullYear();
                    }
                    //this will remove the blank-spaces from the title  a_d replace it with an underscore
                    //fileName += ReportTitle.replace(/ /g, "_");

                    //Initialize file format you want csv or xls
                    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

                    // Now the little tricky part.
                    // you can use either>> window.open(uri);
                    // but this will not work in some browsers
                    // or you will not get the correct file extension    

                    //this trick will generate a temp <a /> tag
                    var link = document.createElement("a");
                    link.href = uri;

                    //set the visibility hidden so it will not effect on your web-layout
                    link.style = "visibility:hidden";
                    link.download = fileName + ".csv";

                    //this part will append the anchor tag and remove it after automatic click
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    $scope.loading = false;
                }

                // This must be a hyperlink
                $("#exportReport").on('click', function (event) {
                    /**JSONToCSVConvertor method call for first kpi table csv*/
                    var kpi = $scope.kpi;
                    if (kpi.indexOf('KS001') != -1) {
                        var i;
                        for (i = kpi.length - 1; i >= 0; i -= 1) {
                            if (kpi[i] === 'KS001' || kpi[i] === 'KC001' || kpi[i] === 'KC002' || kpi[i] === 'KC003' || kpi[i] === 'KC004' || kpi[i] === 'KC005') {
                                kpi.splice(i, 1);
                            }
                        }
                        var tempKPIArr = ['KC001', 'KC002', 'KC003', 'KC004', 'KC005'];
                        kpi = tempKPIArr.concat(kpi);
                    }
                    var plantId = $scope.plant;
                    var type = $scope.filter;
                    var assetTypeId = $scope.assetType;
                    var startDate = new Date($scope.startDate).getTime();
                    var endDate = new Date($scope.endDate).getTime();
                    var duration = $scope.endDate - $scope.startDate;

                    if (endDate < startDate) {
                        FlashService.showError('End date can not be before Start date');
                        return;
                    }
                    else if ($scope.filter == '2' && duration < 6.048e+8) {
                        FlashService.showError('selected duration is less than a week');
                        return;
                    }
                    else if ($scope.filter == '3' && duration < 2.592e+9) {
                        FlashService.showError('selected duration is less than a month');
                        return;
                    }
                    if (!$scope.specificAsset) {
                        var empId = "";
                    }
                    else {
                        var empId = $scope.specificAsset;
                    }
                    if (!$scope.zone || $scope.zone == "0") {
                        var zoneId = "";
                    }
                    else {
                        var zoneId = $scope.zone;
                    }
                    if (!$scope.subType) {
                        var assetSubTypeId = "";
                    }
                    else {
                        var assetSubTypeId = $scope.subType;
                    }

                    var resultType = 2;
                    $scope.loading = true;
                    $http.get(config.host + "/reporting?kpi=" + JSON.stringify(kpi) + "&startDate=" + startDate + "&endDate=" + endDate + "&plantId=" + plantId
                        + "&zoneId=" + zoneId + "&empId=" + empId + "&assetTypeId=" + assetTypeId + "&assetSubTypeId=" + assetSubTypeId + "&type=" + type + "&resultType=" + resultType)
                        .then(function (res) {
                            if (res.data.success == true) {
                                $scope.reportingData = res.data.items;
                                var inputData = [];
                                var dataObject = {
                                    columns: [{
                                        title: $scope.headerName
                                    }]
                                };

                                if ($scope.kpiType == 1) {
                                    $scope.reportingData.forEach(element => {
                                        var headerObj = {
                                            title: element.kpiName
                                        }
                                        dataObject.columns.push(headerObj);

                                        element[element.kpiId].forEach(zone => {
                                            zone.items.forEach(item => {
                                                var rowData = [];
                                                rowData.push(dateConverter(item.date));
                                                rowData.push(zone.name);
                                                rowData.push(element.kpiId);
                                                if (zone.time_field == true) {
                                                    if (item.totalValue > 1) {
                                                        rowData.push(item.totalValue + ' Minutes');
                                                    }
                                                    else {
                                                        rowData.push(item.totalValue + ' Minute');
                                                    }
                                                }
                                                else {
                                                    rowData.push(item.totalValue);
                                                }
                                                inputData.push(rowData);
                                            });
                                        });
                                    });

                                    var kpids = $scope.reportingData.map(item => item.kpiId)
                                    var finalArr = inputData.map(item => {
                                        let filtered = inputData.filter((secondItem => (secondItem[0] === item[0] && secondItem[1] === item[1])))
                                        let returnArr = [filtered[0][0], filtered[0][1]]
                                        let filteredIds = kpids.map(items => filtered.filter(inneritem => inneritem[2] === items));
                                        let filteredKpis = filteredIds.map(thirditem => thirditem[0] ? thirditem[0][3] : 0);
                                        return [...returnArr, ...filteredKpis]
                                    })
                                    finalArr = [... new Set(finalArr)];
                                }
                                else {
                                    $scope.reportingData.forEach(element => {
                                        var headerObj = {
                                            title: element.kpiName
                                        }
                                        dataObject.columns.push(headerObj);

                                        element[element.kpiId].forEach(zone => {
                                            zone.items.forEach(item => {
                                                item.result.forEach(assetData => {
                                                    var rowData = [];
                                                    rowData.push(dateConverter(item.date));
                                                    rowData.push(zone.name);
                                                    rowData.push(element.kpiId);
                                                    rowData.push(assetData.name);
                                                    if (zone.time_field == true) {
                                                        if (assetData.value > 1) {
                                                            rowData.push(assetData.value + ' Minutes');
                                                        }
                                                        else {
                                                            rowData.push(assetData.value + ' Minute');
                                                        }
                                                    }
                                                    else {
                                                        rowData.push(assetData.value);
                                                    }
                                                    inputData.push(rowData);
                                                });
                                            });
                                        });
                                    });

                                    /**below code is for format csv data starts */
                                    var kpids = $scope.reportingData.map(item => item.kpiId)
                                    const NullKpids = kpids.map(item => 0)
                                    var departments = $scope.reportingData[0][kpids[0]].map(item => item.name)
                                    const NullDepartments = departments.map(item => 0)
                                    var finalArr = inputData.map(item => {
                                        let filtered = inputData.filter((secondItem => (secondItem[0] === item[0] && secondItem[3] === item[3])))
                                        let returnArr = [filtered[0][0], filtered[0][3]]
                                        // let filteredData = departments.map(thirditem => {
                                        //     let arr = filtered.filter(fourthitem => fourthitem[1] === thirditem)
                                        //     if (arr.length === 0) {
                                        //         return NullKpids
                                        //     } else {
                                        //         return kpids.map(fifthitem => {
                                        //             let kpiArr = arr.filter(sixthitem => sixthitem[2] === fifthitem)
                                        //             if (kpiArr.length === 0) {
                                        //                 return 0;
                                        //             } else {
                                        //                 return kpiArr[0][4];
                                        //             }
                                        //         })
                                        //     }
                                        // })
                                        var totalArray = [];
                                        let filteredData = kpids.map(thirditem => {
                                            let arr = filtered.filter(fourthitem => fourthitem[2] === thirditem)
                                            var total = 0;
                                            if (arr.lenght === 0) {
                                                return NullDepartments
                                            } else {

                                                let temp = departments.map(fifthitem => {
                                                    let depArr = arr.filter(sixthitem => sixthitem[1] === fifthitem)
                                                    if (depArr.length === 0) {
                                                        return 0;
                                                    } else {
                                                        if (typeof (depArr[0][4]) === "number") {
                                                            total += depArr[0][4]
                                                        } else if (typeof (depArr[0][4]) === "string") {
                                                            total += Number(depArr[0][4].substr(0, depArr[0][4].indexOf(' ')));
                                                        }
                                                        return depArr[0][4];
                                                    }

                                                })
                                                totalArray.push(total);
                                                return temp;

                                            }

                                        })
                                        return [...returnArr, ...filteredData.flat(2), ...totalArray]
                                    })
                                    /**below code is for format csv data ends*/
                                    // var finalArr = xyz.map(item => {
                                    //     let filtered = xyz.filter((secondItem => (secondItem[0] === item[0] && secondItem[1] === item[1] && secondItem[3] === item[3])))
                                    //     let returnArr = [filtered[0][0], filtered[0][1], filtered[0][3]]
                                    //     let filteredIds = kpids.map(items => filtered.filter(inneritem => inneritem[2] === items));
                                    //     let filteredKpis = filteredIds.map(thirditem => thirditem[0][4]);
                                    //     return [...returnArr, ...filteredKpis]
                                    // })
                                    // finalArr = [... new Set(finalArr)];
                                }
                                /**code for removing duplicate array elements starts */
                                var hashMap = {}
                                finalArr.forEach(function (arr) {
                                    // If your subArrays can be in any order, you can use .sort to have consistant order
                                    hashMap[arr.join("|")] = arr;
                                });
                                var tableData = Object.keys(hashMap).map(function (k) {
                                    return hashMap[k]
                                })
                                /**code for removing duplicate array elements ends */
                                var date = {
                                    title: "Date"
                                }
                                dataObject.columns.unshift(date);
                                $scope.csvColumns = JSON.parse(JSON.stringify(dataObject.columns));
                                $scope.AllData = tableData;
                                if ($scope.kpiType == 2) {
                                    var result = $scope.csvColumns.map(a => a.title);
                                    var kpi = result.slice(2)
                                    var finalHeader = kpi.map(item => departments.map(innerItem => item + "( " + innerItem + " )")).flat(2);
                                    var totalHeader = kpi.map(item => "Total " + item)
                                    finalHeader.splice(0, 0, "Asset Name");
                                    finalHeader.splice(0, 0, "Date");
                                    finalHeader.push(...totalHeader);
                                    var temp = $scope.AllData.unshift(finalHeader);
                                }
                                else {
                                    var result = $scope.csvColumns.map(a => a.title);
                                    var temp = $scope.AllData.unshift(result);
                                }

                                /**code for exportdata to main csv starts */
                                $scope.AllData = tableData;
                                $scope.collection = $scope.AllData.slice(); // make a copy
                                var keys = $scope.collection.shift();
                                $scope.collection = $scope.collection.map(function (e) {
                                    var obj = {};
                                    keys.forEach(function (key, i) {
                                        obj[key] = e[i];
                                    });
                                    return obj;
                                });
                                /**code for exportdata to main csv ends */

                                /**code for csv method call */
                                var ReportTitle = "KPI Report";
                                if (!$scope.collection || $scope.collection.length == 0) {
                                    FlashService.showError('No data to export for KPI report');
                                    $scope.loading = false;
                                    return;
                                }

                                JSONToCSVConvertor($scope.collection, ReportTitle, true);
                            }
                            else {
                                $scope.loading = false;
                                var errorMessage = res.data.message;
                                FlashService.showError(errorMessage);
                            }
                        });
                });
            });
            /**code for detailView table exportCSV from main reporting table ends */
        }
    ]);
