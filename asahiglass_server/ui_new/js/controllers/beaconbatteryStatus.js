'use strict';

/* Controllers */
angular.module('app')
    .controller('beaconbatteryStatus', ['$scope', 'socketIO', '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window',
        function ($scope, socketIO, $rootScope, $http, sessionInjector, config, Sessioncheck, $timeout, $location, $window) {
            var beaconStatus = function () {
                $http.get(config.host + '/device/beacon/batterystatus')
                    .then(function (res) {
                        if (res.data.success == true) {
                            var notificationData = res.data.data;
                            var table = $('#beaconMgtTable').DataTable({
                                data: notificationData,
                                "pageLength": 10,
                                "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
                                "bDestroy": true,
                                columns: [
                                    {
                                        data: "assetName",
                                        render: function (data, type, row) {
                                            if (data) {
                                                return data;
                                            }
                                            return '';
                                        }
                                    },
                                    {
                                        data: "serial",
                                        render: function (data, type, row) {

                                            if (data) {
                                                return data;
                                            }
                                            return '';
                                        }
                                    },
                                    {
                                        data: "assetId",
                                        render: function (data, type, row) {
                                            if (data) {
                                                return data;
                                            }
                                            return '';
                                        }
                                    },
                                    {
                                        data: "batteryStatus",
                                        render: function (data, type, row) {
                                            if (data == 0) {
                                                return '<img class="m-r-10" style="width:40px;" src="../images/battery-low.svg">';
                                            } else if (data == 1) {
                                                return '<img class="m-r-10" style="width:40px;" src="../images/battery-full.svg">';
                                            }
                                            else {
                                                return '<img class="m-r-10" style="width:40px;" src="../images/battery-notupdated.svg">';

                                            }
                                        }
                                    },
                                    {
                                        data: "batteryStatus",
                                        render: function (data, type, row) {
                                            if (data == 0) {
                                                return ' < 20%';
                                            } else if (data == 2) {
                                                return 'Not Updated';
                                            }
                                            else if (data == 1) {
                                                return ' > 50%';
                                            }
                                            else {
                                                return '';
                                            }
                                        }
                                    },
                                    {
                                        data: "batteryStatusTime",
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
                                            return 'Not updated';
                                        }
                                    }
                                ]
                            });
                        }
                    });
            };

            beaconStatus();

            socketIO.on('battery', function (data) {
                beaconStatus();
            });
        }
    ]);