angular.module('PROJECT.directives').directive('fsNotification', [function(){
  return {
    template: '<div class="error-container"><div class="error-message">{{layout.notification}}</div></div>',
    require: '^MainCtrl',
    link: function(scope, element, args){
      var notificationVisible = scope.layout.showNotification;
      

      scope.$watch('layout', function(){
        scope.layout.showNotification ? show() : hide();
      });

      function show(){
        element.show();
      }
      function hide(){
        element.hide();
      }
    }
  }
}]);
