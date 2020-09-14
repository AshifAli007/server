'use strict';

/* Controllers */
angular.module('app')

    .controller('DashboardCtrl', ['$scope', 'socketIO', '$sce', '$compile', '$rootScope', '$http', 'sessionInjector', 'Config', '$timeout', '$location', '$window', 'FlashService', '$state', 'DashboardService',
        function ($scope, socketIO, $sce, $compile, $rootScope, $http, sessionInjector, config, $timeout, $location, $window, FlashService, $state, DashboardService) {
            var plantId;
            var floorId;
            var zoneId;
            var tab;
            $scope.restrictSocket = false;
            $scope.assetTypeId = '';

            $scope.showTab = function (tab) {
                $scope.selectedTab = tab;
                if ($scope.selectedTab == "zonePanel") {
                    $scope.getZoneDetails(floorId);
                } else if ($scope.selectedTab == "floorPanel") {
                    $scope.getFloorDetails(plantId);
                } else if ($scope.selectedTab == "plantPanel") {
                    $scope.getPlantDetails();
                } else {
                    console.log('Undefined Click');
                }
            }

            $scope.getPlantDetails = function () {
                tab = 1;
                DashboardService.getPlantsDetail({ assetTypeId: $scope.assetTypeId }).$promise.then(function (resourceObj) {
                    $scope.selectedTab = 'plantPanel';
                    $scope.plants = resourceObj.items;
                    $window.sessionStorage.setItem('name', '');
                    $window.sessionStorage.setItem('id', '');
                    $scope.plants.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0));
                }, function () {
                    // FlashService.showError(errorResponse.data.message);
                });
            }

            /**
            * Get Zone details 
            */
            $scope.getFloorDetails = function (data) {
                tab = 2;
                DashboardService.getFloorsDetail({
                    id: data.id,
                    assetTypeId: $scope.assetTypeId
                }).$promise.then(function (resourceObj) {
                    $scope.selectedTab = 'floorPanel';
                    $scope.plantName = data.name;
                    $scope.floorsData = resourceObj.items;
                    $scope.floorsData.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0));
                    plantId = data;
                    $window.sessionStorage.setItem('name', data.name);
                    $window.sessionStorage.setItem('id', data.id);
                }, function () {
                    // FlashService.showError(errorResponse.data.message);
                });
            }

            // Get zone details according floor id
            $scope.getZoneDetails = function (floor) {
                tab = 3;
                DashboardService.getZonesDetail({
                    floorId: floor.id,
                    assetTypeId: $scope.assetTypeId
                }).$promise.then(function (resourceObj) {
                    $scope.selectedTab = 'zonePanel';
                    $scope.floorName = floor.name;
                    $scope.controlRoomList = resourceObj.items;
                    $scope.controlRoomList.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0));
                    $window.sessionStorage.setItem('name', floor.name);
                    $window.sessionStorage.setItem('id', floor.id);
                    floorId = floor;
                }, function () {
                    // FlashService.showError(errorResponse.data.message);
                });
            }

            $scope.getSingleZoneData = function (zoneId) {
                tab = 4;
                $scope.selectedTab = 'singleZonePanel';
                $scope.restrictSocket = false;
                DashboardService.getSingleZoneDetail({
                    zoneId: zoneId
                }).$promise.then(function (resourceObj) {
                    var currentZoneDetail = resourceObj.data[0];
                    getReturnedListEnteredData(currentZoneDetail);
                    if ($window.sessionStorage.getItem('selectedZoneId')) {
                        $window.sessionStorage.removeItem('selectedZoneId');
                    }
                    else {
                    }
                    listEnterasset(zoneId);
                }, function () {
                    // FlashService.showError(errorResponse.data.message);
                });
            }

            var listEnterasset = function (zoneId) {
                DashboardService.getListEnterAsset({
                    zoneId: zoneId,
                    assetTypeId: $scope.assetTypeId
                }).$promise.then(function (resourceObj) {
                    var assetInZoneList = resourceObj.items;
                    var returnedAssetListData = getAssetEnteredList(assetInZoneList);
                    $scope.assetData = returnedAssetListData.assetData;
                }, function () {
                    // FlashService.showError(errorResponse.data.message);
                });
            }

            // Get Asset Current Location
            $scope.getAssetCurrentLocation = function (assetData) {
                tab = 4;
                $scope.selectedTab = 'singleZonePanel';
                $scope.restrictSocket = true;
                var assetCurrentLocation = assetData;
                if ($window.sessionStorage.getItem('searchOnlineAsset')) {
                    $window.sessionStorage.setItem('searchOnlineAsset', false);
                }
                DashboardService.getAssetCurrentLocation({
                    empId: assetCurrentLocation.empId,
                    beaconId: assetCurrentLocation.beaconId
                }).$promise.then(function (resourceObj) {
                    $scope.assetType = '';
                    var assetInZoneList = resourceObj.items;
                    var currentZoneDetails = resourceObj.items[0];
                    getReturnedListEnteredData(currentZoneDetails);
                    if (currentZoneDetails.isEntry == true) {
                        var returnedAssetListData = getAssetEnteredList(assetInZoneList);
                        $scope.assetData = returnedAssetListData.assetData;
                    }
                    else if (currentZoneDetails.isEntry == false && currentZoneDetails.isMissing == 0) {
                        $scope.assetData = [];
                    }
                }, function () {
                    // FlashService.showError(errorResponse.data.message);
                });

            }

            function getReturnedListEnteredData(currentZoneDetails) {
                $scope.zoneDetail = currentZoneDetails;
                $scope.floorName = currentZoneDetails.floorName;
                $window.sessionStorage.setItem('name', $scope.zoneDetail.name);
                $window.sessionStorage.setItem('id', currentZoneDetails.id);
                floorId = {
                    "name": currentZoneDetails.floorName,
                    "id": currentZoneDetails.floorId
                }

                $scope.plantName = currentZoneDetails.plantName;

                plantId = {
                    "name": currentZoneDetails.plantName,
                    "id": currentZoneDetails.plantId
                }
            }

            function getAssetEnteredList(assetInZoneList) {
                var data = assetInZoneList;
                var arr = [];
                data.forEach(asset => {
                    var tempObj = {};
                    tempObj["assetName"] = asset.assetName;
                    var date = new Date(parseInt(asset.entryTime));
                    tempObj["fromnow"] = moment(date).fromNow();
                    tempObj["message"] = asset.message;
                    tempObj["icon"] = asset.icon;
                    tempObj["assetImg"] = asset.asset_image;
                    tempObj["assetType"] = asset.type;
                    tempObj["isAllowed"] = asset.isAllowed;
                    tempObj["assetType"] = asset.assetTypeName;
                    tempObj['id'] = asset.id;
                    tempObj['subType'] = asset.subTypeName;
                    var clr;
                    if (asset.isAllowed == 1) {
                        clr = {
                            "font-size": "20px",
                            "padding": "8px",
                            "border-radius": "59%",
                            "color": "white",
                            "background": "green"
                        }
                    } else {
                        clr = {
                            "font-size": "20px",
                            "padding": "8px",
                            "border-radius": "59%",
                            "color": "white",
                            "background": "red"
                        }
                    }
                    tempObj['clr'] = clr;
                    arr.push(tempObj);
                });
                // $scope.assetData = arr;

                return {
                    'assetData': arr
                }

            }

            var listener = $rootScope.$on('searchAsset', function (event, data) {
                $scope.getAssetCurrentLocation(data);
            });

            // Get Asset type list
            $scope.getAsssetTypeList = function () {
                DashboardService.getAssetTypeList().$promise.then(function (resourceObj) {
                    $scope.assetTypeList = resourceObj.items;
                }, function () {
                    // FlashService.showError(errorResponse.data.message);
                });
            }

            // On change of Asset type  
            $scope.getAssetFilterData = function (assetType) {
                $scope.assetTypeId = assetType;
                var data_id = $window.sessionStorage.getItem('id');
                var name = $window.sessionStorage.getItem('name');
                if ($scope.selectedTab == 'plantPanel') {
                    $scope.getPlantDetails();
                } else if ($scope.selectedTab == 'floorPanel') {
                    $scope.getFloorDetails({ "id": data_id, "name": name });
                }
                else if ($scope.selectedTab == 'zonePanel') {
                    $scope.getZoneDetails({ "id": data_id, "name": name });
                }
                else if ($scope.selectedTab == 'singleZonePanel') {
                    listEnterasset(data_id);
                }

            }

            // Get Total asset details of all floors
            $scope.totalUserDetails = function () {
                DashboardService.getTotalFloorsDetail().$promise.then(function (resourceObj) {
                    $scope.totalUserDetail = resourceObj.data;
                    $scope.allowedUser = $scope.totalUserDetail.allowedUser;
                    $scope.notAllowedUser = $scope.totalUserDetail.notAllowedUser;
                    $scope.allUser = $scope.totalUserDetail.allUser;
                    if ($scope.allowedUser == 0 && $scope.notAllowedUser == 0) {
                        $scope.showPieChartErrorImage = true;
                    }

                    else {
                        $scope.showPieChartErrorImage = false;
                        makeChart();
                    }
                }, function () {
                    // FlashService.showError(errorResponse.data.message);
                });
            }

            // [total User Details  device chart ] start
            function makeChart() {
                // [ device chart ] start
                AmCharts.makeChart("device-chart", {
                    "type": "pie",
                    "theme": "light",
                    "labelRadius": -35,
                    "labelText": "[[percents]]%",
                    "startDuration": 0,
                    "dataProvider": [{
                        "device": "Allowed Asset",
                        "percentage": $scope.allowedUser,
                        "color": "#F6D365"
                    }, {
                        "device": "Not Allowed Asset",
                        "percentage": $scope.notAllowedUser,
                        "color": "#F58345"
                    }
                    ],
                    "valueField": "percentage",
                    "titleField": "device",
                    "colorField": "color",
                    "balloon": {
                        "fixedPosition": true
                    },
                });
            }
            // [ totalUser  Details device chart ] end

            var ids = [];
            $scope.openTost = function (a) {
                ids.push(a);
                ids.forEach(element => {
                    if (element != a) {
                        if (document.getElementById(element) == null) {
                            document.getElementById(a).style.display = "block";
                        } else {
                            document.getElementById(element).style.display = "none";
                        }

                    } else {
                        document.getElementById(a).style.display = "block";
                    }
                });
            };

            $scope.CloseToast = function (a) {
                document.getElementById(a).style.display = "none";
            };

            //Socket Data for allowed and non-allowed asset
            function getSocketData() {
                var data_id = $window.sessionStorage.getItem('id');
                var name = $window.sessionStorage.getItem('name');
                $scope.totalUserDetails();
                if (tab === 1 && $scope.selectedTab == 'plantPanel') {
                    $scope.getPlantDetails();
                } else if (tab === 2 && $scope.selectedTab == 'floorPanel') {
                    $scope.getFloorDetails({ "id": data_id, "name": name });
                } else if (tab === 3 && $scope.selectedTab == 'zonePanel') {
                    $scope.getZoneDetails({ "id": data_id, "name": name });
                } else if (tab === 4 && $scope.selectedTab == 'singleZonePanel') {
                    if ($scope.restrictSocket == true) {
                        $scope.getAssetCurrentLocation($rootScope.onlineAsset);
                    }
                    else {
                        $scope.getSingleZoneData(data_id);
                    }
                }
                else {
                    console.log("Undifined")
                }
            }

            // Dashboard Socket 
            socketIO.on('dashboard', function (data) {
                if ($state.current.name == 'app.dashboard') {
                    getSocketData();
                }

            });

            // Notification Socket
            socketIO.on('notification', function (data) {
                if ($state.current.name == 'app.dashboard') {
                    getSocketData();
                }
            });

            // load function called on load of a controller
            $scope.loadData = function () {
                $scope.getAsssetTypeList();
                if ($window.sessionStorage.getItem('selectedZoneId')) {
                    var zoneFloorId = $window.sessionStorage.getItem('selectedZoneId');
                    $scope.getSingleZoneData(zoneFloorId);
                }
                else if ($window.sessionStorage.getItem('searchOnlineAsset') == "true") {
                    $scope.getAssetCurrentLocation($rootScope.onlineAsset);
                }
                else {
                    $scope.getPlantDetails();
                }
                $scope.totalUserDetails();

            }

        }
    ]);



