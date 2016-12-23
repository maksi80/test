'use strict';
angular.module('PROJECT.controllers').controller('UserCtrl', ['$rootScope','$scope','$location','userService','$window','messageBox','$timeout',function($rootScope, $scope,$location,userService, $window,messageBox,$timeout) {

        $scope.user = {
            username : "",
            email: "",
            password: ""
        };

        $scope.login = function() {
            if(!$scope.loginForm.$valid){
                console.log("nije validna login forma");
                //$scope.loginForm.$setPristine();
                return;
            }
            var user = {
                username: $scope.user.username,
                password: $scope.user.password
            };

            userService.login(user.username, user.password, function (response) {
                if (response.success) {
                    userService.setCredentials(response.data);
                    $rootScope.$broadcast('authSuccess');
                    
                    messageBox.alert('Dobrodosli!Uspesno ste se logovali',false,$timeout(function () {
                        if(response.data.role == "admin"){
                            $location.path('/lists');
                            return;
                        }
                        $location.path('/home');
                    }, 2000));
                } else {
                    messageBox.alert(response.message,false);
                }
            }); 
        }

        $scope.register = function() {
        	if(!$scope.registerForm.$valid){
                console.log("nije validna Register forma");
                //$scope.registerForm.$setPristine();
                return;
            }

            var user = {
                username:      $scope.user.username,
                email:         $scope.user.email,
                password:      $scope.user.password,
                registerDate:  new Date().getTime(),
                latsChange:    new Date().getTime(),
                role:          "user" //"admin"
            };

            userService.create(user)
                .then(function (response) {
                    if (response.success) {
                        messageBox.alert('Registration successful',false,$timeout(function () {
                            $location.path('/login');
                        }, 2000));
                        /*alert('Registration successful');
                        $location.path('/login');*/
                    } else {
                        messageBox.alert(response.message);
                    }
                });
        }

        $scope.logout = function() {
            userService.clearCredentials();
            $window.location.reload(true);
        }
    }
]);