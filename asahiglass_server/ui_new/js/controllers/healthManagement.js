'use strict';

/* Controllers */
angular.module('app')
    .controller('HealthManagement', ['$scope', 'socketIO', '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window',
        function ($scope, socketIO, $rootScope, $http, sessionInjector, config, Sessioncheck, $timeout, $location, $window) {
            var healthMgm = function () {
                $http.get(config.host + '/device/devicehealth')
                    .then(function (res) {
                        if (res.data.success == true) {
                            var notificationData = res.data.items;
                            $('#healthMgtTable').DataTable({
                                data: notificationData,
                                "pageLength": 10,
                                "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
                                "bDestroy": true,
                                columns: [
                                    {
                                        data: "name",
                                        render: function (data, type, row) {
                                            if (data) {
                                                return data;
                                            }
                                            return '';
                                        }
                                    },
                                    {
                                        data: "deviceType",
                                        render: function (data, type, row) {
                                            if (data == null) {
                                                return "";
                                            } else if (data == 1) {
                                                return "Beacon";
                                            } else if (data == 2) {
                                                return "Receiver";
                                            } else if (data == 3) {
                                                return "Zone Gateway";
                                            } else if (data == 4) {
                                                return "Test Beacon";
                                            } else if (data == 5) {
                                                return "RFID Card";
                                            } else if (data == 6) {
                                                return "Bus Gateway";
                                            } else if (data == 7) {
                                                return "Food Cart Gateway";
                                            } else if (data == 8) {
                                                return "Control Room Gateway";
                                            } else if (data == 9) {
                                                return "Provisioning Device Gateway";
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
                                        data: "zoneName",
                                        render: function (data, type, row) {
                                            if (data) {
                                                return data;
                                            }
                                            return '';
                                        }
                                    },
                                    {
                                        data: "nodeStatus",
                                        render: function (data, type, row) {
                                            if (data == 0) {
                                                return '<i class="fas fa-circle text-c-red f-20"></i>';
                                            } else if (data == 2) {
                                                return '<i class="fas fa-circle text-c-orange f-20" style="color: orange !important;"></i>';
                                            }
                                            else if (data == 1) {
                                                return '<i class="fas fa-circle text-c-green f-20"></i>';
                                            }
                                            // If the device is in-active state - Grey color icon is showing
                                            else{
                                                return '<i class="fas fa-circle text-c-grey f-20"></i>';
                                            }
                                        }
                                    },
                                    {
                                        data: "nodeStatusTime",
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

            healthMgm();

            socketIO.on('health', function (data) {
                healthMgm();
            });
        }
    ]);