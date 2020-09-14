'use strict';

/* Controllers */
angular.module('app')

    .controller('otaCtrl', ['$scope', 'socketIO', '$sce', '$compile', '$http', 'sessionInjector', 'Config', '$timeout', '$location', '$window', 'FlashService', 'fileUpload', 'toaster',
        function ($scope, socketIO, $sce, $compile, $http, sessionInjector, config, $timeout, $location, $window, FlashService, fileUpload, toaster) {
           
            $scope.softwareTypes = config.softwaretype;
          
            /* Real Time Notifications */
            $scope.getOTADetailsList = function () {
                $http.get(config.host + '/ota')
                .then(function (res) {
                    if (res.data.success == true) {
                        var realTimeData = res.data.items;
                        var table = $('#otaDatatable').DataTable({
                            "order": [[3, "desc"]],
                            data: realTimeData,
                            scrollY: 300,
                            "bSort" : false,
                            "pageLength": 50,
                            "lengthMenu": [[50, 100, 250, 500, 1000, -1], [50, 100, 250, 500, 1000, "All"]],
                            "bDestroy": true,
                            "columnDefs": [
                                { "visible": false, "targets": 3 }
                            ],
                            columns: [
                                {
                                    data: "type",
                                    render: function (data, type, row) {
                                        if (data==1) {
                                            return 'Node';
                                        }else if(data == 2){
                                            return 'Gateway Node'
                                        }else if(data == 3){
                                            return 'Gateway'
                                        }else{
                                            return '';
                                        }
                                        
                                    }
                                },
                                {
                                    data: "filename",
                                    render: function (data, type, row) {
                                        if (data) {
                                            return data;
                                        }
                                        return '';
                                    }
                                },
                                {
                                    data: "version",
                                    render: function (data, type, row) {
                                        if (data) {
                                            return data;
                                        }
                                        return '';
                                    }
                                },
                                {
                                    data: "size",
                                    render: function (data, type, row) {
                                        if (data) {
                                            return data;
                                        }
                                        return '';
                                    }
                                },
                                {
                                    data: "crc",
                                    render: function (data, type, row) {
                                        if (data) {
                                            return data;
                                        }
                                        return '';
                                    }
                                },
                                {
                                    data: "description",
                                    render: function (data, type, row) {
                                        if (data) {
                                            return data;
                                        }
                                        return '';
                                    }
                                },
                                {
                                    "data": "uploadedOn",
                                    render: function(data) {

                                        var lastConndate = new Date(parseInt(data));
                                        var lDate =  moment(lastConndate).format("DD MMM YY (hh:mm a)");
                                        return lDate;
                                        
                                    }

                                },
                            ]
                });
                    }
                
                });



                
            }

            $scope.loadData = function(){
                $scope.getOTADetailsList();
            }

          var segmentA;
          $scope.segmentA = function(){
              var crc32 = new Crc32();
              var fileReader = new FileReader();
              var segA = document.getElementById('segment-A').files[0];
              var callback = function(sega){
                 
                  segmentA = sega;
              }
              fileReader.readAsArrayBuffer(segA);
              fileReader.onload = function(e) {
             
              crc32.update(e.target.result);
                  if(fileReader.result){
                      callback(crc32.digest());
                  }
              };
              fileReader.onerror = function(event) {
                  console.error("File could not be read! Code " + event.target.error.code);
 
              };
          }

          $scope.uploadFile = function(){
            var file = $scope.segmenta;
            var type = $scope.type;
            var name = file.name
            var crc =  segmentA; 
            var desc = $scope.description;
           
            var uploadUrl = config.host + `/ota/?type=${type}&description=${desc}&name=${name}&crc=${crc}`;
            console.log("Upload url: ", uploadUrl)
            var fileUrl = fileUpload.uploadFileToUrl(file, uploadUrl);
            fileUrl.then(function (data) {
                console.log("Upload return msg: ", data)
                if (data.data.success == true) {
                    
                    var msg = data.data.message;
                    toaster.pop({
                        type: 'success',
                        body: msg,
                        timeout: 3000
                    });
                    $scope.getOTADetailsList();
                    $scope.type = "";
                    $scope.description = "";
                    angular.element("input[type='file']").val(null);
                } else {
                  
                    var msg = data.data.message;
                    toaster.pop({
                        type: 'error',
                        body: msg,
                        timeout: 3000
                    });
                }
            });

          }
          
        }
        

    ]).directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]).directive('customOnChange', function() {
        return {
          restrict: 'A',
          link: function (scope, element, attrs) {
            var onChangeFunc = scope.$eval(attrs.customOnChange);
            element.bind('change', onChangeFunc);
          }
        };
      }).service('fileUpload', ['$http', function ($http) {

        this.uploadFileToUrl = function (file, uploadUrl) {
            var fd = new FormData();
            fd.append('file', file);
            return $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }).then(function (data) {
                return data;
            });
        };

    }]);




