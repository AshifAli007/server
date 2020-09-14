angular.module('app')
    .factory('DashboardService', ['$resource', 'Config', function ($resource, config) {
        var url = config.host;
        return $resource(url, {}, {

            getPlantsDetail: {
                url: url + "/plants/details",
                method: 'GET',
                params: {
                    assetTypeId: '@assetTypeId'
                }
            },

            getFloorsDetail: {
                url: url + "/floor?id=:id",
                method: 'GET',
                params: {
                    id: '@id',
                    assetTypeId: '@assetTypeId'
                }
            },

            getTotalFloorsDetail: {
                url: url + "/floor/detail",
                method: 'GET',
            },

            getZonesDetail: {
                url: url + "/zone/zonedetails?floorId=:floorId",
                method: 'GET',
                params: {
                    floorId: '@floorId',
                    assetTypeId: '@assetTypeId'
                }
            },

            getSingleZoneDetail: {
                url: url + "/zone/:zoneId",
                method: 'GET',
                params: {
                    zoneId: '@zoneId',
                }
            },

            getSingleZoneDetail: {
                url: url + "/zone/:zoneId",
                method: 'GET',
                params: {
                    zoneId: '@zoneId',
                }
            },

            getListEnterAsset: {
                url: url + "/zone/:zoneId/listEnteredAssets?assetTypeId=:assetTypeId",
                method: 'GET',
                params: {
                    zoneId: '@zoneId',
                    assetTypeId: '@assetTypeId',
                }
            },

            getAssetCurrentLocation: {
                url: url + "/employee/assetCurrentLocation?empId=:empId&beaconId=:beaconId",
                method: 'GET',
                params: {
                    empId: '@empId',
                    beaconId: '@beaconId'
                }
            },

            getAssetTypeList: {
                url: url + "/assetType",
                method: 'GET'
            },

            getFloorList: {
                url: url + "/floor",
                method: 'GET'
            },

            getsFloorZones: {
                url: url + "/floor/:floorId/zones",
                method: 'GET',
                params: {
                    floorId: '@floorId'
                }
            },

            getNotificationList: {
                url: url + "/notification",
                method: 'GET'
            }

        });

    }]);