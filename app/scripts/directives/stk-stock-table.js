'use strict';

/**
 * @ngdoc directive
 * @name stockDogApp.directive:stkStockTable
 * @description
 * # stkStockTable
 */
angular.module('stockDogApp')
  .directive('stkStockTable', function () {
    return {
      templateUrl: 'views/templates/stock-table.html',
      restrict: 'E',
      // [1] isolate scope
      scope: {
      	watchlist: '='
      },
      // [2] create controller, serves as api for this directive
      controller: function($scope) {
      	var rows = [];
      	$scope.$watch('showPercent', function(showPercent){
      		if(showPercent) {
      			_.each(rows, function(row){
      				row.showPercent = showPercent;
      			});
      		}
      	});

      	this.addRow = function(row) {
      		rows.push(row);
      	};

      	this.removeRow = function(row) {
      		_.remove(rows, row);
      	};

      },
      // [3] standard link implementation
      link: function ($scope) {
      	$scope.showPercent = false;
      	$scope.removeStock = function(stock) {
      		$scope.watchlist.removeStock(stock);
      	};
      }
    };
  });
