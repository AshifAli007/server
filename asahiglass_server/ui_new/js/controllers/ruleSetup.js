'use strict';

/* Controllers */

angular.module('app')
    // Chart controller

    .controller('RuleController', ['$scope', 'socketIO', '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window', 'toaster', 'FlashService',
        function ($scope, socketIO, $rootScope, $http, sessionInjector, config, Sessioncheck, $timeout, $location, $window, toaster, FlashService) {

            $scope.urlV1 = config.host;
            $scope.types = config.ruleType;
            $scope.ruleMappingTable = false;
            $scope.showType = false;
            $scope.removeId;
            $scope.ruleAttribute = [];
            $scope.ruleAssignList = [];
            $scope.ruleList = [];

            $scope.changeRule = function (type) {
                if (type) {
                    $scope.ruleAssignList = [];
                    $scope.identifier = '';
                    $scope.showType = true;
                    var dataUrl;
                    var ruleUrl;
                    var label;
                    if (type == 1) {
                        dataUrl = '/employee';
                        ruleUrl = "/rules/asset";
                        $scope.label = "Asset";
                    } else if (type == 2) {
                        dataUrl = "/zone";
                        ruleUrl = "/rules/zone";
                        $scope.label = "Zone";
                    } else if (type == 3) {
                        dataUrl = '/assetType';
                        ruleUrl = "";
                        $scope.label = "Asset Type";
                    } else if (type == 4) {
                        dataUrl = '/zonetype';
                        ruleUrl = "";
                        $scope.label = "Zone Type";
                    } else if (!type) {
                        $scope.Datas = [];
                        $scope.label = "";
                        $scope.ruleMappingTable = false;
                    }

                    $scope.getAssetList(dataUrl);
                    $scope.getRulesList(ruleUrl);
                }
                else {
                    $scope.showType = false;
                    $scope.ruleMappingTable = false;
                    return;
                }

            }

            $scope.changeList = function (identifier) {
                if (identifier) {
                    $scope.identifier = identifier;
                }
                else {
                    $scope.identifier = '';
                    return;
                }
            }

            // Get Asset List on change method.
            $scope.getAssetList = function (dataUrl) {
                $http.get($scope.urlV1 + dataUrl)
                    .then(function (res) {
                        if (res.data.success == true) {
                            $scope.ruleMappingTable = true;
                            $scope.assetLists = res.data.items;
                        } else {
                            var errorMessage = res.data.message;
                            FlashService.showError(errorMessage);

                        }
                    }, function (errorResponse) {
                        $scope.ruleMappingTable = false;
                        $scope.showType = false;
                        $scope.assetLists = '';
                        // FlashService.showError(errorResponse.data.message);

                    });
            }

            $scope.getRulesList = function (ruleUrl) {
                $http.get($scope.urlV1 + ruleUrl)
                    .then(function (res) {
                        if (res.data.success == true) {
                            $scope.ruleMappingDetailList = res.data.items;
                        } else {
                            var errorMessage = res.data.message;
                            // FlashService.showError(errorMessage);
                        }
                    }, function (errorResponse) {
                        $scope.ruleMappingTable = false;
                        $scope.ruleMappingDetailList = '';
                        if(ruleUrl == ''){
                            FlashService.showError("There is no rule found .");
                        }
                    });

            }

            $scope.setRuleMap = function (event, index, selectRule, ruleList) {
                if (selectRule == true) {
                    $scope.ruleAssignList.push(ruleList);
                }
                else {
                    for (var i = 0; i < $scope.ruleAssignList.length; i++) {
                        if ($scope.ruleAssignList[i].id == ruleList.id) {
                            $scope.ruleAssignList.splice(i, 1);
                            break;
                        }
                    }
                }
            }

            $scope.setAttribute = function (index, attribute, ruleList) {
                if (attribute != '') {
                    ruleList.attribute = attribute;
                }
            }

            $scope.assignRules = function () {
                var assignedRules = true;

                if ($scope.ruleAssignList.length == 0) {
                    FlashService.showError("Please select rules");
                    return;
                } else {
                    $scope.ruleAssignList.forEach(element => {
                        if (element.isarrgument == 1 && element.attribute == (undefined)) {
                            assignedRules = false;
                        }
                    });
                }

                if (assignedRules) {
                    var finalArray = [];
                    $scope.ruleAssignList.forEach(rule => {
                        var temObj = {};
                        temObj.ruleId = rule.id;
                        if (rule.attribute) {
                            temObj.arrgument = rule.attribute;
                            temObj.column = rule.arrgumentColumn;
                        }
                        finalArray.push(temObj);
                    });

                    var params = {
                        "identifier": $scope.identifier,
                        "type": $scope.type,
                        "rules": finalArray
                    }

                    $http.post($scope.urlV1 + '/rules', params)
                        .then(function (res) {

                            if (res.data.success == true) {
                                $scope.ruleList = res.data.items;
                                FlashService.show(res.data.message);
                                $scope.type = '';
                                $scope.showType = false;
                                $scope.identifier = '';
                                $scope.ruleMappingTable = false;
                                $scope.ruleAssignList = [];
                                $scope.getRulesDataList($scope.ruleList);
                            }
                            else {
                                var errorMessage = res.data.message;
                                FlashService.showError(errorMessage);
                            }
                        }, function (errorResponse) {
                            FlashService.showError(errorResponse.data.message);
                        });
                }
                else {
                    FlashService.showWarning("Please add attribute to selected rule");
                }

            }

            $scope.getRulesDataList = function (data) {
                $http.get($scope.urlV1 + '/rules')
                    .then(function (res) {
                        if (res.data.success == true) {
                            var ruleList = res.data.items;
                            $scope.getRulesAssignList(ruleList);
                        }
                        else {
                            var errorMessage = res.data.message;
                            FlashService.showError(errorMessage);
                        }
                    });
            }

            $scope.getRulesAssignList = function (data) {
                var table = $('#rules').DataTable({
                    data: data,
                    "pageLength": 5,
                    "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
                    "bDestroy": true,
                    columns: [
                        {
                            "data": "identifier"

                        },
                        {
                            "data": "ruleName"
                        },
                        {
                            "data": "arrgument"
                        },
                        {
                            data: null,
                            render: function (data, type, row) {
                                if (type === 'display') {
                                    return '<button id="remove" title="Remove " class="btn btn-danger">Remove</button>';
                                }
                                return data;
                            }

                        }

                    ]
                });

                $('#rules tbody').on('click', '#remove', function () {
                    var data = table.row($(this).parents('tr')).data();
                    if (data == undefined) {

                    } else {
                        window.removeId = data.id;
                        $scope.$apply();
                        $('#removeModal').modal('show');
                    }
                });
            };


            $scope.removeAssignRule = function () {
                $scope.removeId = $window.removeId;
                $http.delete($scope.urlV1 + '/rules/' + $scope.removeId)
                    .then(function (res) {
                        if (res.data.success == true) {
                            FlashService.show(res.data.message);
                            $scope.getRulesDataList();
                        } else {
                            var errorMessage = res.data.message;
                            FlashService.showError(errorMessage);
                        }
                    });

            }

            $scope.loadData = function () {
                $scope.getRulesDataList();
            }

        }
    ]);

