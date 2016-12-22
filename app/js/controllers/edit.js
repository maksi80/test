'use strict';
angular.module('PROJECT.controllers').controller('EditCtrl', ['$rootScope','$scope','$location','userService','$routeParams','messageBox',function($rootScope,$scope,$location,userService,$routeParams,messageBox) {
        
        /*console.log("IS isLogged",$rootScope.layout.isLogged);
        console.log("IS ADMIN",$rootScope.layout.isAdmin);
        console.log("currentUser",$rootScope.globals);*/
        
        var id = $routeParams.id;
        
        if(!$rootScope.layout.isAdmin && $rootScope.globals.currentUser.id != id){
            messageBox.alert("Nemate permisiju za menjanje accounta drugog usera");
            return;
        }
        userService.getById(id).then(function(userData) {
            if(userData){
                $scope.user = userData;
            }
            else{
                messageBox.alert("Ne postoji user");
                return;
            }
        });


        $scope.editAccount = function() {
            if(!$scope.editForm.$valid){
                messageBox.alert("nije validna Register forma");
                //$scope.registerForm.$setPristine();
                return;
            }

            var user = {
                username:       $scope.user.username,
                email:          $scope.user.email,
                password:       $scope.user.password,
                role:           $scope.user.role,
                registerDate:   $scope.user.registerDate,
                latsChange:     new Date().getTime(),
                id:             $scope.user.id
            };

            userService.update(user)
                .then(function (response) {
                    if (response.success) {
                        alert('Uspesno promenjen podaci');
                        if($rootScope.layout.isAdmin){
                            $location.path('/lists');
                            return;
                        }
                        $location.path('/');
                    } else {
                        messageBox.alert(response.message);
                    }
                });
        }
       
    }
]);

