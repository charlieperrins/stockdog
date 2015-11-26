'use strict';

/**
 * @ngdoc directive
 * @name stockDogApp.directive:stkSignColor
 * @description
 * # stkSignColor
 */
angular.module('stockDogApp')
  .directive('stkSignColor', function () {
    return {
    	restrict: 'A',
    	link: function($scope, $element, $attrs) {
    		// [1] use $observe to watch expression for changes
    		$attrs.$observe('stkSignColor', function(newVal) {
    			var newSign = parseFloat(newVal);
    			// [2] set elements style colour based on sign
    			if (newSign > 0) {
    				$element[0].style.color = 'Green';
    			} else {
    				$element[0].style.color = 'Red';
    			}
    		});
    	}
    };
  });
