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

        if(!localStorage.users){
            localStorage.users = JSON.stringify(users);
        }

    	//localStorage.users = JSON.stringify(users);
        this.$get = function() {
            return JSON.parse(localStorage.users);
        };
    }
)