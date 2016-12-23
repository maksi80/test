'use strict';
angular.module('PROJECT.controllers',[]).controller('MainCtrl', ['$scope','$rootScope','userService','navigation','$location','myProvider',function($scope, $rootScope, userService,navigation, $location,myProvider) {
        //console.log("MyController - myProvider: " + myProvider);
        $rootScope.globals = {};
        $rootScope.layout = {
            loader: false,
            notification: 'Ovo je isprobavanje',
            showNotification: true
        };

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
                    //console.log('is admin', $rootScope.layout.isAdmin);
                }
            })
        });

        $rootScope.$on('$routeChangeSuccess', function(next, current) {
            setupNavigation();
            $scope.layout.loader = false;
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
            $scope.layout.navigation = nav.navigation;
            $scope.layout.activeSubNav = nav.activeSubNav;
        }

    }
])

.controller('404Ctrl', ['$scope', function($scope) {

}]);