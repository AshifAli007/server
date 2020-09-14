'use strict';

/* Controllers */

angular.module('app')
    // Chart controller

    .controller('reporting', ['$scope', 'md5', 'socketIO', '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window', '$anchorScroll',
        function ($scope, md5, socketIO, $rootScope, $http, sessionInjector, config, Sessioncheck, $timeout, $location, $window, $anchorScroll) {
            
            
            /**datatable for detail view */
            var detailsViewDatatable = function (detailViewdata) {
                var ViewDetailTable = $('#ViewDetail').DataTable({
                    data: detailViewdata,
                    "pageLength": 5,
                    "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
                    "bDestroy": true,
                    "dom": 'Bfrtip',
                    buttons: [
                        'copy', 'csv', 'excel', 'pdf', 'print'
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
                                return data == '1' ? 'Yes' : 'No'
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
                            "data": "exitTime",
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
                            "data": "timeSpent",
                            render: function (data, type, row) {
                                if (data) {
                                    var lastConndate = Math.floor(data / 60) + ' Minutes';
                                    return lastConndate;
                                }
                                else {
                                    return '--';
                                }
                            }
                        }
                    ]
                });
            }

            /**code for detailView table exportCSV starts */
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
                    var fileName = "KPI_Details" + '_' + date.getDate() + '_' + date.getMonth() + '_' + date.getFullYear();
                    //this will remove the blank-spaces from the title and replace it with an underscore
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
                }
                // This must be a hyperlink
                $("#ViewDetailExport").on('click', function (event) {
                    var csvColumns = ["zoneName", "empId", "empName", "isAllowed", "entryTime", "exitTime", "timeSpent"];
                    var data = $scope.JSONData1;
                    if (!data || data.length == 0) {
                        alert("No data to export");
                        return;
                    }
                    var filteredData = data.map((item) => {
                        var filterJson = {};
                        csvColumns.map((filterItem) => {
                            filterJson[filterItem] = item[filterItem];
                        })
                        return filterJson;
                    })
                    var ReportTitle = "KPI Details Report";
                    JSONToCSVConvertor(filteredData, ReportTitle, true);
                    // IF CSV, don't do event.preventDefault() or return false
                    // We actually need this to be a typical hyperlink
                });
            });
            /**code for detailView table exportCSV ends */

            /**Get Asset Type list */
            $http.get(config.host + '/employee')
                .then(function (res) {
                    if (res.data.success == true) {
                        var empData = res.data.data;
                        console.log("Emp data: " + JSON.stringify(empData));
                        $scope.empData = empData;
                    }
                });

            /**Get Kpis List */
            $scope.getKPIList = function (kpiType) {
                if (kpiType == '1') {
                    $scope.headerName = "Zone Name"
                }
                else if (kpiType == '2') {
                    $scope.headerName = "Asset Id"
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
                                console.log("Kpi data: " + JSON.stringify($scope.kpiListArray));
                            }
                        });
                }
            }

            /**Get Zone List */
            $http.get(config.host + '/zone')
                .then(function (res) {
                    if (res.data.success == true) {
                        $scope.zoneListArray = res.data.items;
                        console.log("Emp data: " + JSON.stringify($scope.zoneListArray));
                    }
                });


            /**Get getAssetTypeList */
            $http.get(config.host + '/assetType')
                .then(function (res) {
                    if (res.data.success == true) {
                        $scope.assetTypeListArray = res.data.items;
                        console.log($scope.assetTypeListArray);
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

            /**reset startDate and endDate filters */
            $scope.resetDates = function (filter) {
                var todayDate = new Date();
                todayDate.setSeconds(0)
                todayDate.setMilliseconds(0)
                todayDate = moment(todayDate).format('MM/DD/YYYY h:mm a');
                $scope.endDate = todayDate;

                if (filter == '1') {
                    var yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
                    yesterday.setSeconds(0);
                    yesterday.setMilliseconds(0);
                    
                    yesterday = moment(yesterday).format('MM/DD/YYYY h:mm a');

                    $scope.startDate = yesterday;
                }
                else if (filter == '2') {
                    var yesterday = new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000));
                    yesterday.setSeconds(0)
                    yesterday.setMilliseconds(0)
                    yesterday = moment(yesterday).format('MM/DD/YYYY h:mm a');
                    $scope.startDate = yesterday;
                }
                else if (filter == '3') {
                    var yesterday = new Date(new Date().getTime() - (30 * 24 * 60 * 60 * 1000));
                    yesterday.setSeconds(0)
                    yesterday.setMilliseconds(0)
                    yesterday = moment(yesterday).format('MM/DD/YYYY h:mm a');
                    $scope.startDate = yesterday;
                }
                else {
                    $scope.startDate = "";
                    $scope.endDate = "";
                }
            }

            /**VewReport method to populate table and charts */          
            $scope.viewReport = function (reportingType) {
                var kpi = $scope.kpi;
                if (kpi.indexOf('KS001') != -1) {
                    var i;
                    for (i = kpi.length - 1; i >= 0; i -= 1) {
                        if (kpi[i] === 'KS001' || kpi[i] === 'KC001' || kpi[i] === 'KC002' || kpi[i] === 'KC003' || kpi[i] === 'KC004' || kpi[i] === 'KC005') {
                            kpi.splice(i, 1);
                        }
                    }
                    var tempArray1 = ['KC001', 'KC002', 'KC003', 'KC004', 'KC005'];
                    var tempArray2 = kpi;
                    kpi = tempArray1.concat(tempArray2);
                    $scope.kpi = ['KS001'];
                }

                var assetTypeId = $scope.assetType;
                var startDate = new Date($scope.startDate).getTime();
                var endDate = new Date($scope.endDate).getTime();
                var duration = $scope.endDate - $scope.startDate;

                if ($scope.filter == '1' && duration < 86400000) {
                    alert("selected duration is less than 24 hours");
                    return;
                }
                else if ($scope.filter == '2' && duration < 6.048e+8) {
                    alert("selected duration is less than a week");
                    return;
                }
                else if ($scope.filter == '3' && duration < 2.592e+9) {
                    alert("selected duration is less than a month");
                    return;
                }
                if (!$scope.specificAsset) {
                    var empId = "";
                }
                else {
                    var empId = $scope.specificAsset;
                }
                if (!$scope.zone) {
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

                function handleClick(event) {
                    $('#reportingModal').modal('show');
                    var detailViewdata = event.dataItem.dataContext.items;
                    console.log("Pie Chart detailsViewData: " + JSON.stringify(detailViewdata));
                    $scope.JSONData1 = detailViewdata;
                    detailsViewDatatable(detailViewdata);
                }

                var makePieChart = function (pieChartData) {
                    var chart = AmCharts.makeChart("chartdiv", {
                        "type": "pie",
                        "theme": "light",
                        "dataProvider": pieChartData,
                        "valueField": "value",
                        "titleField": "label",
                        "exportConfig": {
                            menuItems: [{
                                icon: '/lib/3/images/export.png',
                                format: 'png'
                            }]
                        }
                    });
                    chart.addListener("clickSlice", handleClick);

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
                    chart.addListener("clickGraphItem", handleClick)

                    function handleClick(event) {
                        $('#reportingModal').modal('show');
                        var detailViewdata = event.item.dataContext.Items;
                        console.log("Bar chart detailsViewData: " + JSON.stringify(detailViewdata));
                        $scope.JSONData1 = detailViewdata;
                        detailsViewDatatable(detailViewdata);
                    }
                }

                $http.get(config.host + "/reporting?kpi=" + JSON.stringify(kpi) + "&startDate=" + startDate + "&endDate=" + endDate
                    + "&zoneId=" + zoneId + "&empId=" + empId + "&assetTypeId=" + assetTypeId + "&assetSubTypeId=" + assetSubTypeId)
                    .then(function (res) {
                        if (res.data.success == true) {
                            $scope.reportingData = res.data.items;
                            console.log("reporting api Data: " + JSON.stringify($scope.reportingData));
                            var reportingListData = [];
                            var xyz = [];
                            var dataObject = {
                                columns: [{
                                    title: $scope.headerName
                                }],
                                data: []
                            };

                            $scope.reportingData.forEach(element => {
                                element[element.kpiId].forEach(zone => {
                                    var rowData = [];
                                    var tempObj = {
                                        'count': zone.kpiValue
                                    }
                                    if (tempObj.count > 0) {
                                        rowData.push(zone.name);
                                        xyz.push(rowData);
                                    }
                                });
                            });

                            var hashMap = {}
                            xyz.forEach(function (arr) {
                                // If your subArrays can be in any order, you can use .sort to have consistant order
                                hashMap[arr.join("|")] = arr;
                            });
                            var tableData = Object.keys(hashMap).map(function (k) {
                                return hashMap[k]
                            })

                            $scope.reportingData.forEach(element => {

                                var headerObj = {
                                    title: element.kpiName
                                }

                                dataObject.columns.push(headerObj);

                                element[element.kpiId].forEach(zone => {

                                    var tempObj = {
                                        'kpi': element.kpiId,
                                        'kpiName': element.kpiName,
                                        'zoneName': zone.name || null,
                                        'kpiValue': zone.kpiValue,
                                        'time_field': zone.time_field
                                    }
                                    //if (tempObj.count > 0) {                                                                      
                                    tableData.forEach(item => {
                                        if (tempObj.zoneName == item[0]) {
                                            if (tempObj.time_field == true) {                                               
                                                item.push(Math.floor(tempObj.kpiValue / 60) + ' Minutes');
                                            }
                                            else {
                                                item.push(tempObj.kpiValue);
                                            }
                                        }
                                        else if (tempObj.zoneName == null) {
                                            console.log("conter: " + tempObj.zoneName);
                                            item.push(0);
                                        }
                                    })
                                    //}                                   
                                });
                            });

                            /**Reporting data for table */
                            if ($scope.reportType == '1') {
                                /**below code is for adding value in table rows if value is not there as per columns */
                                var lengths = tableData.map(function (a) { return a.length; });
                                var highestLength = Math.max.apply(Math, lengths);
                                tableData.map((obj) => {
                                    if (obj.length < highestLength) {
                                        var lengthDiff = highestLength - obj.length;
                                        for (var i = 0; i < lengthDiff; i++) {
                                            obj.push('--');
                                        }
                                    }
                                    return obj;
                                });

                                if ($.fn.DataTable.isDataTable('#example')) {
                                    $('#example').DataTable().clear().destroy();
                                    $('#example tbody').empty();
                                    $('#example thead').empty();
                                }

                                var columns = [];
                                $scope.csvColumns = JSON.parse(JSON.stringify(dataObject.columns));
                                var actionColumn = {
                                    title: "Action"
                                }

                                dataObject.columns.push(actionColumn);

                                var table = $('#example').DataTable({
                                    "bDestroy": true,
                                    "data": tableData,
                                    "columns": dataObject.columns,
                                    "columnDefs": [{
                                        "targets": -1,
                                        "data": null,
                                        "defaultContent": '<button type="button" id="detailView" class="btn btn-info btn-lg" data-toggle="modal" data-target="#reportingModal">View Detail</button>'
                                    }]

                                });

                                $('#example tbody').on('click', '#detailView', function () {
                                    var data = table.row($(this).parents('tr')).data();
                                    if (data == undefined) {
                                        console.log("Click undefined");
                                    } else {
                                        var tempArray = [];
                                        $scope.reportingData.forEach(element => {
                                            element[element.kpiId].forEach(zone => {
                                                var tempObj = {
                                                    'name': zone.name,
                                                    'items': zone.items
                                                }
                                                if (tempObj.items.length && data[0] == tempObj.name) {
                                                    tempArray = tempArray.concat(tempObj.items);
                                                }
                                            });
                                        });
                                        $scope.JSONData1 = tempArray;
                                        detailsViewDatatable(tempArray);
                                    }
                                });

                                /**code for exportdata to main csv starts */
                                //var temp = [];
                                $scope.AllData = tableData;
                                var result = $scope.csvColumns.map(a => a.title);
                                var temp = $scope.AllData.unshift(result);
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

                                /** code for exportdata to csv starts */
                                var tempArr = [];
                                $scope.reportingData.forEach(element => {
                                    element[element.kpiId].forEach(zone => {
                                        var tempObj = {
                                            'name': zone.name,
                                            'items': zone.items
                                        }
                                        if (tempObj.items.length) {
                                            tempArr = tempArr.concat(tempObj.items);
                                        }
                                    });
                                });
                                $scope.JSONData2 = tempArr;
                                /**code for exportdata to csv ends */
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
                                                // 'kpiName': element.kpiName,
                                                // 'zoneName': zone.zoneName,                                                
                                                'value': Math.floor(zone.kpiValue / 60),
                                                // 'totalProductvityHours': getSessionDuration(zone.totalProductvityHours * 1000),
                                                // 'longestProductvityHours': getSessionDuration(zone.longestProductvityHours * 1000),
                                                'items': zone.items
                                            }
                                        }
                                        else {
                                            var tempObj = {
                                                'label': element.kpiName + '(Zone: ' + zone.name + ')',
                                                // 'kpiName': element.kpiName,
                                                // 'zoneName': zone.zoneName,
                                                'value': zone.kpiValue,
                                                // 'totalProductvityHours': getSessionDuration(zone.totalProductvityHours * 1000),
                                                // 'longestProductvityHours': getSessionDuration(zone.longestProductvityHours * 1000),
                                                'items': zone.items
                                            }
                                        }
                                        if (tempObj.value > 0) {
                                            pieChartData.push(tempObj);
                                        }
                                    });
                                });

                                console.log("Pie Chart Data" + JSON.stringify(pieChartData));
                                if (pieChartData.length > 0) {
                                    makePieChart(pieChartData);
                                }
                                else {
                                    $scope.showErrorPie = true;
                                    makePieChart(pieChartData);
                                    // alert("No record found for selected KPI.");
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
                                                'count': Math.floor(zone.kpiValue / 60),
                                                'items': zone.items
                                            }
                                        }
                                        else {
                                            var tempObj = {
                                                'kpi': element.kpiId,
                                                'kpiName': element.kpiName,
                                                'zoneName': zone.name,
                                                'count': zone.kpiValue,
                                                'items': zone.items
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
                                    barChartData.push(tempObj);
                                });
                                console.log("Bar Chart Data" + JSON.stringify(barChartData));
                                if (barChartData.length > 0) {
                                    makeBarChart(barChartData);
                                }
                                else {
                                    $scope.showErrorBar = true;
                                    makeBarChart(barChartData);
                                    //alert("No record found for selected KPI.");
                                }
                            }
                        }
                        else {
                            alert("No record found for selected KPI.");
                        }

                    });
                $scope.reportFormat = reportingType;
                /**below line of code shifts scrool to bottom */               
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
                        var tempArray1 = ['KC001', 'KC002', 'KC003', 'KC004', 'KC005'];
                        var tempArray2 = kpi;
                        kpi = tempArray1.concat(tempArray2);
                    }

                    var assetTypeId = $scope.assetType;
                    var startDate = new Date($scope.startDate).getTime();
                    var endDate = new Date($scope.endDate).getTime();
                    var duration = $scope.endDate - $scope.startDate;

                    if ($scope.filter == '1' && duration < 86400000) {
                        alert("selected duration is less than 24 hours");
                        return;
                    }
                    else if ($scope.filter == '2' && duration < 6.048e+8) {
                        alert("selected duration is less than a week");
                        return;
                    }
                    else if ($scope.filter == '3' && duration < 2.592e+9) {
                        alert("selected duration is less than a month");
                        return;
                    }
                    if (!$scope.specificAsset) {
                        var empId = "";
                    }
                    else {
                        var empId = $scope.specificAsset;
                    }
                    if (!$scope.zone) {
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

                    $http.get(config.host + "/reporting?kpi=" + JSON.stringify(kpi) + "&startDate=" + startDate + "&endDate=" + endDate
                        + "&zoneId=" + zoneId + "&empId=" + empId + "&assetTypeId=" + assetTypeId + "&assetSubTypeId=" + assetSubTypeId)
                        .then(function (res) {
                            if (res.data.success == true) {
                                $scope.reportingData = res.data.items;
                                console.log("reporting api Data: " + JSON.stringify($scope.reportingData));
                                var reportingListData = [];
                                var xyz = [];
                                var dataObject = {
                                    columns: [{
                                        title: $scope.headerName
                                    }],
                                    data: []
                                };

                                $scope.reportingData.forEach(element => {
                                    element[element.kpiId].forEach(zone => {
                                        var rowData = [];
                                        var tempObj = {
                                            'count': zone.kpiValue
                                        }
                                        if (tempObj.count > 0) {
                                            rowData.push(zone.name);
                                            xyz.push(rowData);
                                        }
                                    });
                                });

                                var hashMap = {}
                                xyz.forEach(function (arr) {
                                    // If your subArrays can be in any order, you can use .sort to have consistant order
                                    hashMap[arr.join("|")] = arr;
                                });
                                var tableData = Object.keys(hashMap).map(function (k) {
                                    return hashMap[k]
                                })

                                $scope.reportingData.forEach(element => {

                                    var headerObj = {
                                        title: element.kpiName
                                    }

                                    dataObject.columns.push(headerObj);

                                    element[element.kpiId].forEach(zone => {

                                        var tempObj = {
                                            'kpi': element.kpiId,
                                            'kpiName': element.kpiName,
                                            'zoneName': zone.name || null,
                                            'kpiValue': zone.kpiValue,
                                            'time_field': zone.time_field
                                        }
                                        //if (tempObj.count > 0) {                                                                      
                                        tableData.forEach(item => {
                                            if (tempObj.zoneName == item[0]) {
                                                if (tempObj.time_field == true) {                                                    
                                                    item.push(Math.floor(tempObj.kpiValue / 60) + ' Minutes');
                                                }
                                                else {
                                                    item.push(tempObj.kpiValue);
                                                }
                                            }
                                            else if (tempObj.zoneName == null) {
                                                console.log("conter: " + tempObj.zoneName);
                                                item.push(0);
                                            }
                                        })
                                        //}                                   
                                    });
                                });
                               
                                /**below code is for adding value in table rows if value is not there as per columns */
                                var lengths = tableData.map(function (a) { return a.length; });
                                var highestLength = Math.max.apply(Math, lengths);
                                tableData.map((obj) => {
                                    if (obj.length < highestLength) {
                                        var lengthDiff = highestLength - obj.length;
                                        for (var i = 0; i < lengthDiff; i++) {
                                            obj.push(0);
                                        }
                                    }
                                    return obj;
                                });
                                $scope.csvColumns = JSON.parse(JSON.stringify(dataObject.columns));

                                /**code for exportdata to main csv starts */
                                $scope.AllData = tableData;
                                var result = $scope.csvColumns.map(a => a.title);
                                var temp = $scope.AllData.unshift(result);
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

                                /** code for exportdata to details csv starts */
                                var tempArr = [];
                                $scope.reportingData.forEach(element => {
                                    element[element.kpiId].forEach(zone => {
                                        var tempObj = {
                                            'name': zone.name,
                                            'items': zone.items
                                        }
                                        if (tempObj.items.length) {
                                            tempArr = tempArr.concat(tempObj.items);
                                        }
                                    });
                                });
                                $scope.JSONData2 = tempArr;

                                /**code for csv method call */
                                var ReportTitle = "KPI Report";
                                if (!$scope.collection || $scope.collection.length == 0) {
                                    alert("No data to export");
                                    return;
                                }
                                JSONToCSVConvertor($scope.collection, ReportTitle, true);

                                /**JSONToCSVConvertor method call for second detailview csv*/
                                var csvColumns = ["zoneName", "empId", "empName", "isAllowed", "entryTime", "exitTime", "timeSpent"];
                                var data = $scope.JSONData2;
                                var filteredData = data.map((item) => {
                                    var filterJson = {};
                                    csvColumns.map((filterItem) => {
                                        filterJson[filterItem] = item[filterItem];
                                    })
                                    return filterJson;
                                })
                                var ReportTitle = "KPI Details Report";
                                if (!filteredData || filteredData.length == 0) {
                                    alert("No data to export");
                                    return;
                                }
                                JSONToCSVConvertor(filteredData, ReportTitle, true);
                            }
                            else {
                                alert("No record found for selected KPI.");
                            }
                        });
                });
            });
            /**code for detailView table exportCSV from main reporting table ends */
        }
    ]);
