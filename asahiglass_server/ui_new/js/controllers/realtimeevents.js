'use strict';

/* Controllers */
angular.module('app')
    .controller('RealTimeEvents', ['$scope', 'socketIO', '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window', 'toaster',
        function ($scope, socketIO, $rootScope, $http, sessionInjector, config, Sessioncheck, $timeout, $location, $window, toaster) {

            $scope.loading = true;
            $http.get(config.host + '/notification')
                .then(function (res) {
                    if (res.data.success == true) {
                        var notificationData = res.data.items;
                        $scope.loading = false;
                        var realTimeTable = function (array) {
                            var dataSet = array;
                            console.log("Data set: " + JSON.stringify(dataSet));
                            var table = $('#realtimeTable').DataTable({
                                "order": [[3, "desc"]],
                                data: dataSet,
                                "pageLength": 10,
                                "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
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
                                                    return 'Invalid Date'
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
                                                return data;
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
                                    //,
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
                            //         console.log("Click undefined");
                            //     } else {
                            //         var parm = {
                            //             "zoneId": data.zoneId
                            //         };
                            //         $http.post(config.host + '/device/controlroom/reset', parm)
                            //             .then(function (res) {
                            //             });
                            //     }
                            // });
                        }

                        realTimeTable(notificationData);

                        socketIO.on('notification', function (data) {
                            console.log("notificationfromsocket" + JSON.stringify(data));
                            notificationData.unshift(data);
                            realTimeTable(notificationData);                            
                        });
                    }
                    else {
                        $scope.loading = false;
                        toaster.pop({
                            type: 'error',
                            body: 'No record found.',
                            timeout: 3000
                        });
                    }
                });
        }
    ]);
