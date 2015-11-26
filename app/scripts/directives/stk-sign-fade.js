'use strict';

/**
 * @ngdoc directive
 * @name stockDogApp.directive:stkSignFade
 * @description
 * # stkSignFade
 */
angular.module('stockDogApp')
  .directive('stkSignFade', function ($animate) {
    return {
        restrict: 'A',
        link: function($scope, $element, $attrs) {
            var oldVal = null;
            // [1] use $observe to be notified on value changes
            $attrs.$observe('stkSignFade', function(newVal) {

                if (oldVal && oldVal == newVal) { return; }

                var oldPrice = parseFloat(oldVal);
                var newPrice = parseFloat(newVal);
                oldVal = newVal;

                console.log('directive proceeds');

                // [2] add appropriate direction class, and then remove it
                if (oldPrice && newPrice) {
                    var direction = newPrice - oldPrice >= 0 ? 'up' : 'down';
                    $animate.addClass($element, 'change-' + direction, function(){
                        console.log('$animate callback executes');
                        $animate.removeClass($element, 'change-' + direction);
                    });
                }
            });
        }
    };
  });
