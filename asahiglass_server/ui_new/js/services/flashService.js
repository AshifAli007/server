angular.module('app').factory("FlashService", ["$rootScope", "toaster", function ($rootScope, toaster) {
    return {
        show: function (message) {
            // Display a success toast, with a title
            toaster.pop({
                type: 'success',
                body: message,
                showCloseButton: true,
                "progressBar": true,
                timeout: 3000
            });
        },
        showInfo: function (message) {
            toaster.pop({
                type: 'info',
                body: message,
                showCloseButton: true,
                timeout: 3000
            });
        },
        showWarning: function (message) {
            toaster.pop({
                type: 'warning',
                body: message,
                showCloseButton: true,
                timeout: 3000
            });
        },
        showError: function (message) {
            toaster.pop({
                type: 'error',
                body: message,
                showCloseButton: true,
                timeout: 3000
            });
        },
        clearAll:function(){
        toaster.clear();
        }
    };

}]);
