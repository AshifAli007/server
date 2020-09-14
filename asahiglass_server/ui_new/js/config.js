/* ============================================================
 * File: config.js
 * Configure routing
 * ============================================================ */
angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$httpProvider', '$locationProvider',

        function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $httpProvider, $locationProvider) {
            $urlRouterProvider
                .otherwise('/access/login');

            $stateProvider
                .state('app', {
                    abstract: true,
                    url: "/app",
                    templateUrl: "tpl/app.html"
                }).state('access.login', {
                    url: '/login',
                    templateUrl: 'tpl/extra_login.html',
                    controller: 'AuthCtrl',
                    authenticate: false,
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([

                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load([
                                        'js/controllers/auth.js'

                                    ]);
                                });
                        }]
                    }
                }).state('access.privlagelogin', {
                    url: '/privilege',
                    templateUrl: 'tpl/privlege_login.html',
                    controller: 'PrivlageAuthCtrl',
                    authenticate: false,
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([

                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load([
                                        'js/controllers/authprivlageUser.js'
                                    ]);
                                });
                        }]
                    }
                }).state('access.controlroom', {
                    url: '/controlroom',
                    templateUrl: 'tpl/controlroom.html',
                    controller: 'controlroom',
                    authenticate: false,
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([

                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load([
                                        'js/controllers/controlroom.js'
                                    ]);
                                });
                        }]
                    }
                })

                .state('app.dashboard', {
                    url: "/dashboard",
                    templateUrl: "tpl/dashboard.html",
                    controller: 'DashboardCtrl',
                    authenticate: true,
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                //'nvd3',
                                //'mapplic',
                                //'rickshaw',
                                //'metrojs',
                                //'sparkline',
                                //'skycons',
                                'dataTables',
                                // 'switchery'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load([
                                        'js/controllers/dashboard.js', 'js/services/dashboardService.js'
                                    ]);
                                });
                        }]
                    }
                })


                .state('app.gurddashboard', {
                    url: "/supervisordashboard",
                    templateUrl: "tpl/gurddashboard.html",
                    controller: 'gurdDashboardCtrl',
                    authenticate: true,
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                //'nvd3',
                                //'mapplic',
                                //'rickshaw',
                                //'metrojs',
                                // 'sparkline',
                                //'skycons',
                                'dataTables',
                                // 'switchery'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load([
                                        'js/controllers/gurdDashboard.js'
                                    ]);
                                });
                        }]
                    }
                })

                .state('app.realtimeevents', {
                    url: "/realtimeevents",
                    templateUrl: "tpl/realtimeevents.html",
                    controller: 'RealTimeEvents',
                    authenticate: true,
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'dataTables'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load('js/controllers/realtimeevents.js');
                                });
                        }]
                    }
                })

                .state('app.healthManagement', {
                    url: "/healthManagement",
                    templateUrl: "tpl/healthManagement.html",
                    controller: 'HealthManagement',
                    authenticate: true,
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'dataTables'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load('js/controllers/healthManagement.js');
                                });
                        }]
                    }
                })

                .state('app.beaconbatteryStatus', {
                    url: "/beaconbatteryStatus",
                    templateUrl: "tpl/beaconbatteryStatus.html",
                    controller: 'beaconbatteryStatus',
                    authenticate: true,
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'dataTables'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load('js/controllers/beaconbatteryStatus.js');
                                });
                        }]
                    }
                })

                .state('app.deviceconfig', {
                    url: "/deviceconfig",
                    templateUrl: "tpl/deviceconfig.html",
                    controller: 'deviceConfig',
                    authenticate: true,
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'dataTables'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load('js/controllers/deviceconfig.js');
                                });
                        }]
                    }
                })

                .state('app.busconfig', {
                    url: "/busconfig",
                    templateUrl: "tpl/busconfig.html",
                    controller: 'busConfig',
                    authenticate: true,
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'dataTables'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load('js/controllers/busconfig.js');
                                });
                        }]
                    }
                })

                .state('app.foodcartconfig', {
                    url: "/foodcartconfig",
                    templateUrl: "tpl/foodcartconfig.html",
                    controller: 'foodcartConfig',
                    authenticate: true,
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'dataTables'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load('js/controllers/foodcartconfig.js');
                                });
                        }]
                    }
                })

                .state('app.assettypeconfig', {
                    url: "/assettypeconfig",
                    templateUrl: "tpl/assettypeconfig.html",
                    controller: 'assettypeConfig',
                    authenticate: true,
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'dataTables'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load('js/controllers/assettypeconfig.js');
                                });
                        }]
                    }
                })

                .state('app.subtypeconfig', {
                    url: "/subtypeconfig",
                    templateUrl: "tpl/subtypeconfig.html",
                    controller: 'subtypeConfig',
                    authenticate: true,
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'dataTables'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load('js/controllers/subtypeconfig.js');
                                });
                        }]
                    }
                })

                .state('app.plantconfig', {
                    url: "/plantconfig",
                    templateUrl: "tpl/plantconfig.html",
                    controller: 'plantConfig',
                    authenticate: true,
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'dataTables'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load('js/controllers/plantconfig.js');
                                });
                        }]
                    }
                })

                .state('app.companyconfig', {
                    url: "/companyconfig",
                    templateUrl: "tpl/companyconfig.html",
                    controller: 'companyConfig',
                    authenticate: true,
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'dataTables'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load('js/controllers/companyconfig.js');
                                });
                        }]
                    }
                })

                .state('app.zoneconfig', {
                    url: "/zoneconfig",
                    templateUrl: "tpl/zoneconfig.html",
                    controller: 'zoneConfig',
                    authenticate: true,
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'dataTables'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load('js/controllers/zoneconfig.js');
                                });
                        }]
                    }
                })

                .state('app.netconfig', {
                    url: "/networkconfig",
                    templateUrl: "tpl/networkconfig.html",
                    controller: 'netConfig',
                    authenticate: true,
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'dataTables'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load('js/controllers/networkconfig.js');
                                });
                        }]
                    }
                })

                .state('app.floorconfig', {
                    url: "/floorconfig",
                    templateUrl: "tpl/floorconfig.html",
                    controller: 'floorConfig',
                    authenticate: true,
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'dataTables'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load('js/controllers/floorconfig.js');
                                });
                        }]
                    }
                })


                .state('app.deviceAndAssetProvi', {
                    url: "/provisioning",
                    templateUrl: "tpl/deviceAssetProvi.html",
                    controller: 'DeviceAssetProvi',
                    authenticate: true,
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'dataTables'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load('js/controllers/deviceAssetProvi.js');
                                });
                        }]
                    }
                })



                .state('app.rulesetup', {
                    url: "/rulesetup",
                    templateUrl: "tpl/ruleSetup.html",
                    controller: 'RuleController',
                    authenticate: true,
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'dataTables'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load('js/controllers/ruleSetup.js');
                                });
                        }]
                    }
                })

                .state('app.floorlayout', {
                    url: "/floor-layout",
                    templateUrl: "tpl/floorlayout.html",
                    controller: 'floorLayout',
                    authenticate: true,
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'dataTables'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load('js/controllers/floorLayout.js');
                                });
                        }]
                    }
                })

                .state('app.heatmap', {
                    url: "/heat-map",
                    templateUrl: "tpl/heatmap.html",
                    controller: 'heatMap',
                    authenticate: true,
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'dataTables'
                            ], {
                                insertBefore: '#lazyload_placeholder'
                            })
                                .then(function () {
                                    return $ocLazyLoad.load('js/controllers/heatMap.js');
                                });
                        }]
                    }
                })

                .state('app.employeeconfig', {
                    url: "/employeeconfig",
                    templateUrl: "tpl/empconfig.html",
                    controller: 'empConfig',
                    authenticate: true,
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'dataTables'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load('js/controllers/empconfig.js');
                                });
                        }]
                    }
                })

                .state('app.uploadmap', {
                    url: "/uploadmap",
                    templateUrl: "tpl/uploadmap.html",
                    controller: 'mapConfig',
                    authenticate: true,
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'dataTables'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load('js/controllers/mapconfig.js');
                                });
                        }]
                    }
                })



                .state('app.userzonemapping', {
                    url: "/userzonemapping",
                    templateUrl: "tpl/userzonemapping.html",
                    controller: 'userzoneMapping',
                    authenticate: true,
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'dataTables'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load('js/controllers/userzonemapping.js');
                                });
                        }]
                    }
                })

                .state('app.assetdevicemapping', {
                    url: "/assetdevicemapping",
                    templateUrl: "tpl/assetDeviceMap.html",
                    controller: 'assetDeviceMapping',
                    authenticate: true,
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'dataTables'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load('js/controllers/assetDevicemap.js');
                                });
                        }]
                    }
                })


                .state('app.assetzonemapping', {
                    url: "/assetzonemapping",
                    templateUrl: "tpl/assetZoneMap.html",
                    controller: 'assetZoneMapping',
                    authenticate: true,
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'dataTables'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load('js/controllers/assetZonemap.js');
                                });
                        }]
                    }
                })

                .state('app.zonedetail', {
                    url: "/zonedetail",
                    templateUrl: "tpl/zoneDetail.html",
                    controller: 'zoneDetail',
                    authenticate: true,
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([

                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load('js/controllers/zoneDetail.js');
                                });
                        }]
                    }
                })


                .state('app.reporting', {
                    url: "/reporting",
                    templateUrl: "tpl/reporting.html",
                    controller: 'reporting',
                    authenticate: true,
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                // 'switchery',
                                // 'select',
                                // 'moment',
                                // 'datepicker',
                                // 'daterangepicker',
                                // 'timepicker',
                                // 'inputMask',
                                // 'autonumeric',
                                // 'wysihtml5',
                                // 'summernote',
                                // 'tagsInput',
                                // 'dropzone',
                                'dataTables'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load('js/controllers/reporting.js');
                                });
                        }]
                    }
                })

                // .state('app.reportingTimeSpent', {
                //     url: "/reportingTimespent",
                //     templateUrl: "tpl/timespentinzone.html",
                //     controller: 'reportingTimespent',
                //     authenticate: false,
                //     resolve: {
                //         deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                //             return $ocLazyLoad.load([
                //                 'switchery',
                //                 'select',
                //                 'moment',
                //                 'datepicker',
                //                 'daterangepicker',
                //                 'timepicker',
                //                 'inputMask',
                //                 'autonumeric',
                //                 'wysihtml5',
                //                 'summernote',
                //                 'tagsInput',
                //                 'dropzone',
                //                 'dataTables'
                //             ], {
                //                     insertBefore: '#lazyload_placeholder'
                //                 })
                //                 .then(function () {
                //                     return $ocLazyLoad.load('js/controllers/reportingTimespent.js');
                //                 });
                //         }]
                //     }
                // })

                // .state('app.reportingTimeSpentAllowedZone', {
                //     url: "/reportingTimeSpentAllowedZone",
                //     templateUrl: "tpl/timespentinallowedzone.html",
                //     controller: 'reportingTimespentAllowedZone',
                //     authenticate: false,
                //     resolve: {
                //         deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                //             return $ocLazyLoad.load([
                //                 'switchery',
                //                 'select',
                //                 'moment',
                //                 'datepicker',
                //                 'daterangepicker',
                //                 'timepicker',
                //                 'inputMask',
                //                 'autonumeric',
                //                 'wysihtml5',
                //                 'summernote',
                //                 'tagsInput',
                //                 'dropzone',
                //                 'dataTables'
                //             ], {
                //                     insertBefore: '#lazyload_placeholder'
                //                 })
                //                 .then(function () {
                //                     return $ocLazyLoad.load('js/controllers/reportingTimespentAllowedZone.js');
                //                 });
                //         }]
                //     }
                // })

                .state('app.layouts.horizontal', {
                    url: '/horizontal',
                    templateUrl: 'tpl/layouts_horizontal.html'
                })
                // Email app
                .state('app.email', {
                    abstract: true,
                    url: '/email',
                    templateUrl: 'tpl/apps/email/email.html',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'menuclipper',
                                'wysihtml5'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load([
                                        'js/apps/email/service.js',
                                        'js/apps/email/email.js'
                                    ])
                                });
                        }]
                    }
                })

                .state('app.email.inbox', {
                    url: '/inbox/:emailId',
                    templateUrl: 'tpl/apps/email/email_inbox.html'
                })

                .state('app.email.compose', {
                    url: '/compose',
                    templateUrl: 'tpl/apps/email/email_compose.html'
                })
                // Social app
                .state('app.social', {
                    url: '/social',
                    templateUrl: 'tpl/apps/social/social.html',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'isotope',
                                'stepsForm'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load([
                                        'pages/js/pages.social.min.js',
                                        'js/apps/social/social.js'
                                    ])
                                });
                        }]
                    }
                })
                //Calendar app
                .state('app.calendar', {
                    url: '/calendar',
                    templateUrl: 'tpl/apps/calendar/calendar.html',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'switchery',
                                'moment-locales',
                                'interact'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load([
                                        'pages/js/pages.calendar.min.js',
                                        'js/apps/calendar/calendar.js'
                                    ])
                                });
                        }]
                    }
                })

                .state('app.builder', {
                    url: '/builder',
                    template: '<div></div>',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'js/controllers/builder.js',
                            ]);
                        }]
                    }
                })

                .state('app.layouts', {
                    url: '/layouts',
                    template: '<div ui-view></div>'
                })

                .state('app.layouts.default', {
                    url: '/default',
                    templateUrl: 'tpl/layouts_default.html'
                })

                .state('app.layouts.secondary', {
                    url: '/secondary',
                    templateUrl: 'tpl/layouts_secondary.html'
                })

                .state('app.layouts.rtl', {
                    url: '/rtl',
                    controller: 'RTLCtrl',
                    templateUrl: 'tpl/layouts_default.html',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'js/controllers/rtl.js',
                            ]);
                        }]
                    }
                })

                .state('app.layouts.columns', {
                    url: '/columns',
                    templateUrl: 'tpl/layouts_columns.html'
                })

                // Boxed app
                .state('boxed', {
                    url: "/boxed",
                    templateUrl: "tpl/app.boxed.html"
                })

                // UI Elements
                .state('app.ui', {
                    url: '/ui',
                    template: '<div ui-view></div>'
                })
                .state('app.ui.color', {
                    url: '/color',
                    templateUrl: 'tpl/ui_color.html'
                })
                .state('app.ui.typo', {
                    url: '/typo',
                    templateUrl: 'tpl/ui_typo.html'
                })
                .state('app.ui.icons', {
                    url: '/icons',
                    templateUrl: 'tpl/ui_icons.html',
                    controller: 'IconsCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'sieve',
                                'line-icons'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load([
                                        'js/controllers/icons.js'
                                    ])
                                });
                        }]
                    }
                })
                .state('app.ui.buttons', {
                    url: '/buttons',
                    templateUrl: 'tpl/ui_buttons.html'
                })
                .state('app.ui.notifications', {
                    url: '/notifications',
                    templateUrl: 'tpl/ui_notifications.html',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'js/controllers/notifications.js'
                            ]);
                        }]
                    }
                })
                .state('app.ui.modals', {
                    url: '/modals',
                    templateUrl: 'tpl/ui_modals.html',
                    controller: 'ModalsCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'js/controllers/modals.js'
                            ]);
                        }]
                    }
                })
                .state('app.ui.progress', {
                    url: '/progress',
                    templateUrl: 'tpl/ui_progress.html'
                })
                .state('app.ui.tabs', {
                    url: '/tabs',
                    templateUrl: 'tpl/ui_tabs.html',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'tabcollapse'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                });
                        }]
                    }
                })
                .state('app.ui.sliders', {
                    url: '/sliders',
                    templateUrl: 'tpl/ui_sliders.html',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'noUiSlider',
                                'ionRangeSlider'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                });
                        }]
                    }
                })
                .state('app.ui.treeview', {
                    url: '/treeview',
                    templateUrl: 'tpl/ui_treeview.html',
                    controller: 'TreeCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'navTree'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load('js/controllers/treeview.js');
                                });
                        }]
                    }
                })
                .state('app.ui.nestables', {
                    url: '/nestables',
                    templateUrl: 'tpl/ui_nestable.html',
                    controller: 'NestableCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'nestable'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load('js/controllers/nestable.js');
                                });
                        }]
                    }
                })

                // Form elements
                .state('app.forms', {
                    url: '/forms',
                    template: '<div ui-view></div>'
                })
                .state('app.forms.elements', {
                    url: '/elements',
                    templateUrl: 'tpl/forms_elements.html',
                    controller: 'FormElemCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'switchery',
                                'select',
                                'moment',
                                'datepicker',
                                'daterangepicker',
                                'timepicker',
                                'inputMask',
                                'autonumeric',
                                'wysihtml5',
                                'summernote',
                                'tagsInput',
                                'dropzone'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load('js/controllers/forms_elements.js');
                                });
                        }]
                    }
                })
                .state('app.forms.layouts', {
                    url: '/layouts',
                    templateUrl: 'tpl/forms_layouts.html',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'datepicker',
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load('js/controllers/forms_layouts.js');
                                });
                        }]
                    }
                })
                .state('app.forms.wizard', {
                    url: '/wizard',
                    templateUrl: 'tpl/forms_wizard.html',
                    controller: 'FormWizardCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'wizard'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load('js/controllers/forms_wizard.js');
                                });
                        }]
                    }
                })

                // Portlets
                .state('app.portlets', {
                    url: '/portlets',
                    templateUrl: 'tpl/portlets.html',
                    controller: 'PortletCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'js/controllers/portlets.js'
                            ]);
                        }]
                    }
                })

                // Views
                .state('app.views', {
                    url: '/views',
                    templateUrl: 'tpl/views.html'
                })


                // Maps
                .state('app.maps', {
                    url: '/maps',
                    template: '<div class="full-height full-width" ui-view></div>'
                })
                .state('app.maps.google', {
                    url: '/google',
                    templateUrl: 'tpl/maps_google_map.html',
                    controller: 'GoogleMapCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'google-map'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load('js/controllers/google_map.js')
                                        .then(function () {
                                            return loadGoogleMaps();
                                        });
                                });
                        }]
                    }
                })
                .state('app.maps.vector', {
                    url: '/vector',
                    templateUrl: 'tpl/maps_vector_map.html',
                    controller: 'VectorMapCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'mapplic',
                                'select'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load('js/controllers/vector_map.js');
                                });
                        }]
                    }
                })

                // Charts
                .state('app.charts', {
                    url: '/charts',
                    templateUrl: 'tpl/charts.html',
                    controller: 'ChartsCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'nvd3',
                                'rickshaw',
                                'sparkline'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load('js/controllers/charts.js');
                                });
                        }]
                    }
                })

                // Extras
                .state('app.extra', {
                    url: '/extra',
                    template: '<div ui-view></div>'
                })
                .state('app.extra.invoice', {
                    url: '/invoice',
                    templateUrl: 'tpl/extra_invoice.html'
                })
                .state('app.extra.blank', {
                    url: '/blank',
                    templateUrl: 'tpl/extra_blank.html'
                })
                .state('app.extra.gallery', {
                    url: '/gallery',
                    templateUrl: 'tpl/extra_gallery.html',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'isotope',
                                'codropsDialogFx',
                                'metrojs',
                                'owlCarousel',
                                'noUiSlider'
                            ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function () {
                                    return $ocLazyLoad.load('js/controllers/gallery.js');
                                });
                        }]
                    }
                })
                .state('app.extra.timeline', {
                    url: '/timeline',
                    templateUrl: 'tpl/extra_timeline.html'
                })

                // Extra - Others
                .state('access', {
                    url: '/access',
                    template: '<div class="full-height" ui-view></div>'
                })
                .state('access.404', {
                    url: '/404',
                    templateUrl: 'tpl/extra_404.html'
                })
                .state('access.500', {
                    url: '/500',
                    templateUrl: 'tpl/extra_500.html'
                })

                .state('access.register', {
                    url: '/register',
                    templateUrl: 'tpl/extra_register.html'
                })
                .state('access.lock_screen', {
                    url: '/lock_screen',
                    templateUrl: 'tpl/extra_lock_screen.html'
                })

                .state('app.navBar', {
                    url: '/nav',
                    templateUrl: 'tpl/nav.html',
                    controller: 'notificationSideBarCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'js/controllers/notificationSideBar.js'
                            ]);
                        }]
                    }
                })

                .state('app.ota', {
                    url: '/ota',
                    templateUrl: 'tpl/ota_upload.html',
                    controller: 'otaCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'js/controllers/otaUpload.js'
                            ]);
                        }]
                    }
                })

                .state('app.otaDownload', {
                    url: '/otaDownload',
                    templateUrl: 'tpl/ota_download.html',
                    controller: 'otaDownloadCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'js/controllers/otaDownload.js'
                            ]);
                        }]
                    }
                })

            $httpProvider.interceptors.push('sessionInjector');
        }
    ])

    .run(function ($rootScope, $location, $window, $state) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            var sessionKey = $window.sessionStorage.getItem('token');
            var name = $window.sessionStorage.getItem('USER_Name');
            var userId = $window.sessionStorage.getItem('USER_ID');
            var userType = $window.sessionStorage.getItem('USER_TYPE');
            if (toState.authenticate && (!sessionKey)) {
                $state.transitionTo("access.login");
                event.preventDefault();
            }
            else if (toState.name == 'access.login' && (sessionKey)) {
                $state.transitionTo("app.dashboard");
                event.preventDefault();
                window.history.forward();
            }
        });
    })

    .factory('sessionInjector', ['$window', '$rootScope', '$location', function ($window, $rootScope, $location) {
        var sessionInjector = {
            request: function (config) {
                var token = $window.sessionStorage.getItem('token');
                var userId = $window.sessionStorage.getItem('userId');
                var user_type = $window.sessionStorage.getItem('user_type');
                var user_name = $window.sessionStorage.getItem('user_name');
                var isPrivlage = $window.sessionStorage.getItem('isPrivlage');
                var companyId = $window.sessionStorage.getItem('companyId');
                var companyName = $window.sessionStorage.getItem('companyName');
                var companyLogo = $window.sessionStorage.getItem('companyLogo');

                $rootScope.Username = user_name;
                $rootScope.Usertype = user_type;
                $rootScope.isPrivlage = isPrivlage;
                $rootScope.logo = companyLogo;
                $rootScope.companyName = companyName;
                if (token) {
                    config.headers['token'] = token;
                }
                if (userId) {
                    config.headers['userId'] = userId;
                }
                if (user_type) {
                    config.headers['usertype'] = user_type;
                }
                if (companyId) {
                    config.headers['companyId'] = companyId;
                }

                return config;
            }
        };
        return sessionInjector;
    }])

    .controller('menuController', ['$scope', '$http', 'Config', '$location', '$window',
        function ($scope, $http, config, $location, $window) {
            $scope.cls = "collapse";
            $scope.setting = 1;
            $scope.changeClassConfig = function () {

                if ($scope.cls === "collapse") {
                    $scope.cls = "collapse show ";

                } else {

                    $scope.cls = "collapse";
                }
            }

            $scope.openSetting = function () {
                if ($scope.setting == 1) {
                    $scope.checkCls = "show";
                    $scope.setting = 0;
                } else {
                    $scope.checkCls = "";
                    $scope.setting = 1;
                }

            };
        }
    ]);
