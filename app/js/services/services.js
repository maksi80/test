'use strict';

angular.module('PROJECT.services',[]).factory('navigation', ['$location', '$routeParams',
    function($location, $routeParams) {

        return function() {

            var path = $location.path();
            var pathParts = path.match(/\/([^\/]*)\/?([^\/]*)\/?([^\/]*)/)

            var nav = pathParts[1] ? pathParts[1] : null;
            var subNav = pathParts[2] ? pathParts[2] : null;
            var navigation;


            function getNavigation(value){
                return {
                    a:1,
                    n:2
                }
            }

            return {
                activeNav: nav,
                activeSubNav: subNav,
                navigation: getNavigation(nav)
            }
        }
    }
])