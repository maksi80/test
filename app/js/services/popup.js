angular.module('PROJECT.services').factory('popup', ['$document', '$q', '$templateCache', '$compile', '$window',
    function($document, $q, $templateCache, $compile, $window) {

        var popupCount = 0;
        var zIndex = 9999,
            $win = $(window),
            $doc = $('html, body'),
            $html = $('html');

        return {

            create: function(template, $scope, modal, callback) {

                //if modal falg is omitted third arg is callback
                angular.isFunction(modal) && (callback = modal);

                popupCount += 1;


                function close(){
                    if (!element) return;
                    element.remove();
                    element = null;

                    zIndex -= 1;
                    popupCount -= 1;
                    
                    if (!popupCount){
                        // enable background scroll when popup closed
                        $html.css({overflowY:'scroll'});
                        body.removeClass('popup-visible')
                        $doc.scrollTop(scrollTop);
                    }   
                    if (angular.isFunction(callback)) callback();
                }

                
                var template = $templateCache.get(template).trim(),
                    element = $compile(template)($scope),
                    body = angular.element($document).find('body'),
                    scrollTop = $win.scrollTop();

                // disable background scroll when popup opened
                $html.css({overflow:'hidden'});

                $scope.$on('$destroy', close);

                if (!modal){
                    $scope.$on('$locationChangeSuccess', close);
                }
                element.css('zIndex', zIndex);
                zIndex += 1;

                body
                    .scrollTop(0)
                    .addClass('popup-visible')
                    .prepend(element);


                return close;

            }

        }

    }
])
