'use strict';

angular.module('PROJECT.providers',[]).provider('myProvider', 
    function() {

    	var users = [{
            username:       "admin",
            email:          "admin@gmail.com",
            password:       "12345",
            role:           "admin",
            registerDate:   new Date().getTime(),
            latsChange:     new Date().getTime(),
            id:             1
        }];

        if(!localStorage.getItem(normalizeKey('users'))) {
            localStorage.setItem(normalizeKey('users'), JSON.stringify(users));
        }

        function normalizeKey( key ) {
            return( "storage_" + key );
        }

        this.$get = function() {
            return JSON.parse(localStorage.getItem(normalizeKey('users')));
        };
    }
)