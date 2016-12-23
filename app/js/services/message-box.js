angular.module('PROJECT.services').factory('messageBox', ['popup', '$rootScope', '$q', function(popup, $rootScope, $q){
    return {
        alert: function(message, showClose, cb){
            var scope = $rootScope.$new(),
                close;
            
            scope.message = message;
            scope.showClose = showClose;
            scope.close = !cb ? popup.create('message-box-alert.html', scope) : popup.create('message-box-alert.html', scope, false, cb) ;

        }

    }

}])