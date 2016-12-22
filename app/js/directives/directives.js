'use strict';

angular.module('PROJECT.directives',[]).directive('changeOnScroll', [function($window){
    return {
        link: function(scope, element, attrs) {
        	
            var t = $(element).offset().top + $(element).height();
            
            $(window).scroll(function() {
                $(this).scrollTop() > t ? $(element).addClass("change") : $(element).removeClass("change");
            });
        }
    };
}])

.directive('validPassword', [function(){
    return {
        require: 'ngModel',
        link: function(scope, element, attr, ctrl) {

            function passwordValidator(ngModelValue) {

                if(ngModelValue.length < 5){

                    ctrl.$setValidity('noValidPassword', false);

                }else if(ngModelValue.length > 8){

                    ctrl.$setValidity('noValidPassword', false);

                }else if(!/([a-zA-Z0-9]){1,}/.test(ngModelValue)) {

                    ctrl.$setValidity('noValidPassword', false);

                /*}else if(!/([\-,\!,\#,\@,\/,\$,\(,\),\%,\&,\^,\*,\?,\{,\[,\},\\,\_,\~,\+,\|,\<,\>,\=,\:,\;,\.,\",\']){1,}/.test(ngModelValue)){
                    
                    ctrl.$setValidity('noValidPassword', false);
                }*/
                }else{
                    
                    ctrl.$setValidity('noValidPassword', true);
                }
            
                return ngModelValue;
            }


            ctrl.$parsers.push(passwordValidator);
            
        }
    }
}]);