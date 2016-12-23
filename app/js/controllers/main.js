'use strict';
angular.module('PROJECT.controllers',[]).controller('MainCtrl', ['$scope','$rootScope','userService','navigation','$location','myProvider',function($scope, $rootScope, userService,navigation, $location,myProvider) {
        $rootScope.globals = {};
        $rootScope.layout = {};

        $rootScope.layout.isLogged = userService.isLogged();

        $rootScope.$on('authRequired', function(event) {
            userService.clearCredentials();
            $location.path('/login');
        });

        $rootScope.$on('authSuccess', function(event, args) {
            $rootScope.layout.isLogged = true;
            userService.pullUserData().then(function(userData) {
                if(userData){
                    if ($rootScope.globals) {
                        $rootScope.globals.currentUser = userData;
                    } else {
                        $rootScope.globals = {
                            currentUser: userData
                        }
                    }
                    $rootScope.layout.isAdmin = userData.role == "admin" ? true : false;
                }
            })
        });

        $rootScope.$on('$routeChangeSuccess', function(next, current) {
            setupNavigation();
        });

        userService.pullUserData().then(function(userData) {
            if(userData){
                if ($rootScope.globals) {
                    $rootScope.globals.currentUser = userData;
                } else {
                    $rootScope.globals = {
                        currentUser: userData
                    }
                }

                $rootScope.layout.isAdmin = userData.role == "admin" ? true : false;
            }

        })

        function setupNavigation() {
            var nav = navigation();
            $scope.layout.activeNav = nav.activeNav;
            $scope.layout.activeSubNav = nav.activeSubNav;
        }

    }
])

.controller('404Ctrl', ['$scope', function($scope) {

}]);