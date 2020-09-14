'use strict';

/* Controllers */

angular.module('app')
    // Chart controller

    .controller('RuleController', ['$scope', 'md5', 'socketIO', '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', '$timeout', '$location', '$window', 'toaster',
        function($scope, md5,socketIO, $rootScope, $http, sessionInjector, config, Sessioncheck, $timeout, $location, $window, toaster) {
            $scope.types = config.ruleType;
            $scope.showrules = false;
            var ruleArry = [];
            $scope.inactive = true;
            $scope.Savebutton = true;
            var getRuleData = function(){
                $http.get(config.host + '/rules')
                .then(function(res) {
                    if(res.data.success == true){
                        var ruleList = res.data.items;
                        if (ruleList.length > 0) {
                            $scope.showTable = false;
                            getRuless(ruleList);
                        } else {
                            $scope.showTable = true;
                        }
                    }
                });
            }
            getRuleData()
            
            var getRuless = function(data){
                var table = $('#rules').DataTable({
                    data: data,
                    "pageLength": 5,
                    "lengthMenu": [ [5, 10, 25, 50, -1], [5, 10, 25, 50, "All"] ],
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
                            render: function(data, type, row) {
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
                        console.log("Click undefined");
                    } else {
                        console.log("Data: ", JSON.stringify(data));
                        $http.delete(config.host + '/rules/'+data.id)
                        .then(function (res) {
                            console.log("Res from server: ", JSON.stringify(res));
                            if(res.data.success == true){
                                getRuleData();
                            }else{

                            }
                        });
                    }
                });
            };


            $scope.changeRule = function(type){
                ruleArry = [];
        
                $scope.identifier = "";
                var dataUrl;
                var ruleUrl;
                var lable ;
                if(type == 1){
                    dataUrl = '/employee';
                    ruleUrl = "/rules/asset";
                    $scope.lable = "Asset";
                }else if(type == 2){
                    dataUrl = "/zone";
                    ruleUrl = "/rules/zone";
                    $scope.lable = "Zone";
                }else if(type == 3){
                    dataUrl = '/assetType';
                    ruleUrl = "";
                    $scope.lable = "Asset Type";
                }else if(type == 4){
                    dataUrl = '/zonetype';
                    ruleUrl = "";
                    $scope.lable = "Zone Type";
                }else if(!type){
                    $scope.Datas = [];
                    $scope.lable = "";
                    $scope.showrules = false;
                }
             
                //Get Data
                $http.get(config.host + dataUrl)
                .then(function (res) {
                    if (res.data.success == true) {
                        var data = res.data.items;
                        $scope.Datas = data;
                    }
                });

                $http.get(config.host + ruleUrl)
                .then(function (res) {
                    if (res.data.success == true) {
                        $scope.showrules = true;
                        var data = res.data.items;
                        console.log("get Rules: ", JSON.stringify(data));
                        $scope.ruleDatas = data;

                        var table = $('#ruleList').DataTable({
                            data: data,
                            "pageLength": 5,
                            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
                            "bDestroy": true,
                            "dom": 'ftipr',
                            columns: [
                                {
                                    "data": "id",
                                    render: function (data, type, row) {
                                      
                                        return '<input id="selectRule" name="'+data+'" type="checkbox">';
                                    }
                                    

                                },
                                {
                                    "data": "name"
                                },
                                {
                                    "data": "opretor"
                                },
                                {
                                    "data": "isarrgument",
                                    render: function (data, type, row) {
                                        //return data;
                                        console.log("Row: data: " + JSON.stringify(row));
                                        if(data == 1){
                                            return '<input id="'+row.id+'" disabled="disabled" type="text" class="form-control" value="" placeholder="Enter rule attribute">';
                                        }else{
                                            return '<input id="'+row.id+'" disabled="disabled" type="text" class="form-control" value="" placeholder="Rule dont have attribute">';
                                        }
                                    
                                        return '';
                                    }
                                },
                                {
                                    "data": "ruleDesc"
                                },
                                {
                                    "data": null,
                                    render: function(data, type, row) {
                                        if (type === 'display') {
                                            return '<a  id="add" style="cursor: pointer;" class="label theme-bg text-white f-12">Add</a>';
                                        }
                                        return data;
                                    },
                                    className: "dt-body-center"
                                }
                            ]
                        });

                        $('#ruleList tbody').on('click', '#selectRule', function () {
                            var data = table.row($(this).parents('tr')).data();
                            if(data == undefined){
                                console.log("Click undefined");
                            }else{
                                console.log("Data checkbox: ", JSON.stringify(data));
                                if(data.isarrgument != null){
                                    var chk = $('input[name='+data.id+']:checked').length;
                                    var id = '#'+data.id;
                                    $(id).prop("disabled", !chk);
                                }

                              //  console.log("Data: ", JSON.stringify(data));
                             
                            }
                        });
                        
                        $('#ruleList tbody').on('click', '#add', function () {
                            var data = table.row($(this).parents('tr')).data();
                            if(data == undefined){
                                console.log("Click undefined");
                            }else{
                              var attr = document.getElementById(data.id).value;
                              console.log("Attr: ", attr)
                              var chk = $('input[name='+data.id+']:checked').length;
                              console.log("chk: ", chk);
                              if(chk === 1){
                                if(attr.length > 0){
                                    data.attribute = attr;  
                                    console.log("Data1: ", JSON.stringify(data));
                                    ruleArry.push(data);
                                    console.log("Data1 rulearray1: ", JSON.stringify(ruleArry));
                                }else if(attr.length == 0 && data.isarrgument == null){
                                    console.log("Data1: ", JSON.stringify(data));
                                        ruleArry.push(data);
                                        console.log("Data2 rulearray2: ", JSON.stringify(ruleArry));
                                } else{
                                    console.log("Please add attribute to selected rule");
                                    toaster.pop({
                                        type: 'warning',
                                        body: 'Please add attribute to selected rule',
                                        timeout: 3000
                                     });
                                }
                              }else{
                                console.log("Please select rule");
                                toaster.pop({
                                    type: 'error',
                                    body: 'Please select rule',
                                    timeout: 3000
                                 });
                                  
                              }

                              


                            }
                        });

                    }
                });
            };

            $scope.removeRule = function(rule){
                var value = rule.id;
                console.log("Rule1: ", ruleArry);
                ruleArry = ruleArry.filter(item => item.id !== value);
                console.log("Rule2: ", ruleArry);
                $scope.rulesArray = ruleArry;
            
            }
            
            $scope.commit = function(){
                if(ruleArry.length > 0){
                    $scope.showList = true;
                    $scope.rulesArray = ruleArry;
                }else{
                    $scope.showList = false;
                }
               
            }

            $scope.cancelAll = function(){
                $scope.type = "";
                $scope.identifier = "";
                ruleArry = [];
                $scope.showrules = false;
            }

            $scope.saveRule = function(){
                var finalArray = [];
                console.log("ruleArry  in save"), JSON.stringify(ruleArry);
                ruleArry.forEach(rule => {
                    var temObj = {};
                    temObj.ruleId = rule.id;
                    if(rule.attribute){
                        temObj.arrgument = rule.attribute;
                        temObj.column = rule.arrgumentColumn;
                    }
                    finalArray.push(temObj);
                });
                console.log(JSON.stringify(finalArray));
                var iden = $scope.identifier;
                var type = $scope.type;
                if(finalArray.length > 0 ){
                    var parms = {
                        "identifier": iden,
                        "type": type,
                        "rules":finalArray
                    };
                    
                    console.log("Final data: ", JSON.stringify(parms));
                    $http.post(config.host + '/rules', parms)
                    .then(function (res) {
                        if(res.data.success == true){
                            var msg = res.data.message;
                            toaster.pop({
                               type: 'success',
                               body: msg,
                               timeout: 3000
                            });
                            getRuleData();
                            $scope.type = "";
                            $scope.identifier = "";
                            ruleArry = [];
                            $scope.showrules = false;
                        }else{
                            var msg = res.data.message;
                            toaster.pop({
                               type: 'warning',
                               body: msg,
                               timeout: 3000
                            });
                            getRuleData();
                            $scope.type = "";
                            $scope.identifier = "";
                            ruleArry = [];
                            $scope.showrules = false;
                        }
                    });
                }else{
                    toaster.pop({
                        type: 'error',
                        body: 'Please select rules',
                        timeout: 3000
                     });
                }

            }


            $scope.update = function(){
                console.log("ruleArry  in update"), JSON.stringify(ruleArry);
            }

        }
    ]);
    
