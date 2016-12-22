'use strict';

angular.module('PROJECT.services').factory('userService', ['$rootScope','$timeout','$filter','$q', function($rootScope, $timeout, $filter, $q) {

    var service = {
        getAll: function() {
            var deferred = $q.defer();
            deferred.resolve(getUsers());
            return deferred.promise;
        },
        getById: function(id) {
            var deferred = $q.defer();
            //var filtered = $filter('filter')(getUsers(), { id: id });
            var filtered = getUsers().filter(function(user){
                return user.id == id;
            });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        },
        getByUsername: function(username) {
            var deferred = $q.defer();
            var filtered = getUsers().filter(function(user){
                return user.username == username;
            });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        },
        create: function(user) {
            var deferred = $q.defer();
            var _this = this;
            // simulate api call with $timeout
            $timeout(function () {
                _this.getByUsername(user.username)
                    .then(function (duplicateUser) {
                        if (duplicateUser !== null) {
                            deferred.resolve({ success: false, message: 'Username "' + user.username + '" is already taken' });
                        } else {
                            var users = getUsers();

                            // assign id
                            var lastUser = users[users.length - 1] || { id: 0 };
                            user.id = lastUser.id + 1;

                            // save to local storage
                            users.push(user);
                            setUsers(users);

                            deferred.resolve({ success: true });
                        }
                    });
            }, 1000);

            return deferred.promise;
        },
        update: function(user) {
            var deferred = $q.defer();

            var users = getUsers();
            for (var i = 0; i < users.length; i++) {
                if (users[i].id === user.id) {
                    users[i] = user;
                    break;
                }
            }
            setUsers(users);
            deferred.resolve({ success: true });

            return deferred.promise;
            
            /*var deferred = $q.defer();
            var _this = this;

            $timeout(function () {
                _this.getByUsername(user.username)
                    .then(function (duplicateUser) {
                        if (duplicateUser !== null) {
                            deferred.resolve({ success: false, message: 'Username "' + user.username + '" is already taken' });
                        } else {
                            var users = getUsers();

                            for (var i = 0; i < users.length; i++) {
                                if (users[i].id === user.id) {
                                    users[i] = user;
                                    break;
                                }
                            }
                            setUsers(users);
                            deferred.resolve({ success: true });
                        }
                    });
            }, 1000);

            return deferred.promise;*/
        },
        delete: function(id) {
            var deferred = $q.defer();

            var users = getUsers();
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                if (user.id === id) {
                    users.splice(i, 1);
                    break;
                }
            }
            setUsers(users);
            deferred.resolve();

            return deferred.promise;
        },
        login: function(username, password, callback) {
            var _this = this;
            $timeout(function () {
                var response;
                _this.getByUsername(username)
                    .then(function (user) {
                        if (user !== null && user.password === password) {
                            response = { success: true , data: user };
                        } else {
                            response = { success: false, message: 'Username or password is incorrect' };
                        }
                        callback(response);
                    });
            }, 1000);
        },
        isLogged: function() {
            if(!localStorage.isLogged){
                localStorage.isLogged = JSON.stringify(false);
            }

            return JSON.parse(localStorage.isLogged);
        },
        clearCredentials: function() {
            try{
              localStorage.setItem('currentUser', JSON.stringify(null));
              localStorage.setItem('isLogged', false);
            }
            catch(e){}
        },
        setCredentials: function(user) {
            try{
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('isLogged', true);
            }
            catch(e){}
        },
        pullUserData: function() {
            var deferred = $q.defer();
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            var isLogged = JSON.parse(localStorage.getItem('isLogged'));

            if(!isLogged || !currentUser){
                localStorage.setItem('currentUser', JSON.stringify(null));
                localStorage.setItem('isLogged', false);
            }

            deferred.resolve(currentUser);
            return deferred.promise;
        },
        ClearAll: function() {
            try{
                localStorage.clear();
            }
            catch(e){}
        }
    };
    
    return service;

    // private functions

    function getUsers() {
        if(!localStorage.users){
            localStorage.users = JSON.stringify([]);
        }

        return JSON.parse(localStorage.users);
    }

    function setUsers(users) {
        localStorage.users = JSON.stringify(users);
    }
   
}]);