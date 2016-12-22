angular.module('PROJECT.directives').directive('a', [function(){

    return {
        restrict: "E",
        link: function(scope, element, attrs){
            if(attrs.ngClick || attrs.href === '' || attrs.href === '#'){
                element.on('click', function(e){
                    console.log('prevent');
                    e.preventDefault();
                });
            }
        }
    }
}]);