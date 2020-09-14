'use strict';

/* Controllers */

angular.module('app')
    // Chart controller

    .controller('mapConfig', ['$scope', 'md5', '$rootScope', '$http', 'sessionInjector', 'Config', 'Sessioncheck', 'fileUpload', '$timeout', '$location', '$window', 
        function($scope, md5, $rootScope, $http, sessionInjector, config, Sessioncheck, fileUpload, $timeout, $location, $window) {

          //  alertalert("Map COnfig");
            $scope.uploadMap = function(){
              //  alert("Upload map");
                var areaName = $scope.areaName,
                    type = $scope.type,
                    object = $scope.object,
                    entity = $scope.entity;
                
                
                var file = $scope.myFile;

                $scope.$watch('myFile', function(newFileObj){
                        if(newFileObj)
                            $rootScope.Filesize = newFileObj.size;
                            $rootScope.Filename = newFileObj.name;
                            var uploadUrl = config.host + '/area?name='+areaName+'&type='+type+'&object='+object+'&entity='+entity;
                            var uploadFilename = $rootScope.Filename;
                            var uploadFilesize = $rootScope.Filesize;
                            console.log("File Name" + $rootScope.Filename);
                            console.log("File Size" + uploadFilesize);
                            fileUpload.uploadFileToUrl(file, uploadUrl);
                });
                
            }

            

        }
    ]).service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function(file, uploadUrl){
            var fd = new FormData();
            fd.append('file', file);
            console.log("Service Run");
            $http.post(uploadUrl, fd,  {
               transformRequest: angular.identity,
               headers: {'Content-Type': undefined}
            })
            .then(function (res) {
                console.log('Upload File' + JSON.stringify(res.data));
          if(res.data === "1"){
              console.log("Reset run");
              window.location.reload();
             //$scope.reset();
          }


            });
         }
     }]).directive('fileModel', ['$parse', function ($parse) {
        return {
           restrict: 'A',
           link: function(scope, element, attrs) {
              var model = $parse(attrs.fileModel);
              var modelSetter = model.assign;

              element.bind('change', function(){
                 scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                 });
              });
           }
        };
     }]);