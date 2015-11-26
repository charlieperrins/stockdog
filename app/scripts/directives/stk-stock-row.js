'use strict';

/**
 * @ngdoc directive
 * @name stockDogApp.directive:stkStockRow
 * @description
 * # stkStockRow
 */
angular.module('stockDogApp')
  .directive('stkStockRow', function ($timeout, QuoteService) {
    return {
    	// [1] use as element attribute and require stkStockTable controller
      restrict: 'A',
      require: '^stkStockTable',
      scope: {
      	stock: '=',
      	isLast: '='
      },
      // [2] required controller made available at the end
      link: function($scope, $element, $attrs, stockTableCtrl) {
      	// [3] Create tooltip for stock row
      	$element.tooltip({
      		placement: 'left',
      		title: $scope.stock.company.name
      	});

      	// [4] add this row to the TableCtrl
      	stockTableCtrl.addRow($scope);

      	// [5] register this stock with the QuoteService
      	QuoteService.register($scope.stock);

      	//[6] deregister company on $destroy
      	$scope.$on('$destroy', function(){
      		stockTableCtrl.removeRow($scope);
      		QuoteService.deregister($scope.stock);
      	});

      	// [7] if this is last stock row retch quotes immediately
      	if($scope.isLast) {
      		$timeout(QuoteService.fetch);
      	}

      	// [8] watch for changes in shares and recalculate fields
      	$scope.$watch('stock.shares', function(){
      		$scope.stock.marketValue = $scope.stock.shares * $scope.stock.lastPrice;
      		$scope.stock.dayChange = $scope.stock.shares * parseFloat($scope.stock.change);
      		$scope.stock.save();
      	});
      }
    };
  });
