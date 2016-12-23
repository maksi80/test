'use strict';
angular.module('PROJECT.controllers').controller('HomeCtrl', ['$rootScope','$scope','$location','userService','$routeParams',function($rootScope,$scope,$location,userService,$routeParams) {
        
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

