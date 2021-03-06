'use strict';

angular.module('PROJECT', [ 'ngRoute', 'ngMessages', 'ngSanitize','PROJECT.controllers', 'PROJECT.services', 'PROJECT.directives']).
config(['$routeProvider', '$httpProvider', '$locationProvider', function($routeProvider, $httpProvider, $locationProvider) {
    
    $routeProvider.when('/', {redirectTo: '/home'});

    $routeProvider.when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'UserCtrl'
    });

    $routeProvider.when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'UserCtrl'
    });

    $routeProvider.when('/home', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl',
      authorize: true
    });

    $routeProvider.when('/lists', {
      templateUrl: 'partials/lists.html',
      controller: 'HomeCtrl',
      authorize: true
    });

    $routeProvider.when('/edit/:id', {
      templateUrl: 'partials/edit.html',
      controller: 'EditCtrl',
      authorize: true
    });

    $routeProvider.when('/404', {
      templateUrl: 'partials/404.html',
      controller: '404Ctrl'
    });
    
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/404'});

    
}])
.constant('configValue', {
      LS_KEY:    "my_storage_", 
      USERS:     [{
                username:       "admin",
                email:          "admin@gmail.com",
                password:       "12345",
                role:           "admin",
                registerDate:   new Date().getTime(),
                latsChange:     new Date().getTime(),
                id:             1
            }]
})
.run(['$rootScope','$location','userService',function($rootScope,$location, userService ){

    $rootScope.$on("$routeChangeStart", function(event, next, current) {
      if(userService.isLogged() && (next.$$route.originalPath == '/login' || next.$$route.originalPath == '/register')){
        if($rootScope.layout.isAdmin){
          $location.path('/lists');
        }else{
          $location.path('/');
        }
      }
      if(next.authorize === true && !userService.isLogged()) {
          event.preventDefault();
          $rootScope.$broadcast('authRequired');
      }
        
    });

}]);