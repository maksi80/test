angular.module('PROJECT.services').factory('messageBox', ['popup', '$rootScope', '$q', function(popup, $rootScope, $q){
    return {
        alert: function(message,showClose){
            var scope = $rootScope.$new(),
                close;
            
            scope.message = message;
            scope.showClose = showClose;
            scope.close = popup.create('message-box-alert.html', scope);

        },
        alertCb: function(message,showClose,cb){
            var scope = $rootScope.$new(),
                close;
            
            scope.message = message;
            scope.showClose = showClose;
            scope.close = popup.create('message-box-alert.html', scope, false, cb);

        }/*,
        confirm: function(text,showClose,buttonTittle,buttonTittleOk){

            var scope = $rootScope.$new(),
                deferred = $q.defer(),
                close;

            scope.showClose = showClose ? showClose: false;
            scope.text = text;
            scope.buttonTittle = buttonTittle ? buttonTittle : '';
            scope.buttonTittleOk = buttonTittleOk ? buttonTittleOk : '';
            scope.confirm = function(){
                deferred.resolve();
                close();
            }
            scope.reject = function(){
                deferred.reject();
                close();
            }
            close = popup.create('message-box-confirm.html', scope);
            return deferred.promise;
        }*/

    }

}])