'use strict';
angular.module('PROJECT.controllers').controller('HomeCtrl', ['$rootScope','$scope','$location','userService','$routeParams',function($rootScope,$scope,$location,userService,$routeParams) {
        
        /*console.log("IS isLogged",$rootScope.layout.isLogged);
        console.log("IS ADMIN",$rootScope.layout.isAdmin);
        console.log("currentUser",$rootScope.globals);*/
        
        userService.pullUserData().then(function(userData) {
            $scope.user = userData
        });

        $scope.allUsers = [];
        loadAllUsers();

        function loadAllUsers() {
            userService.getAll()
                .then(function (users) {
                    $scope.allUsers = users;
                });
        }

        $scope.redirect = function(user) {
            $location.path('/edit/' + user.id);
        };
       
    }
]);

