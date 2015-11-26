'use strict';

/**
 * @ngdoc service
 * @name stockDogApp.QuoteService
 * @description
 * # QuoteService
 * Service in the stockDogApp.
 */
angular.module('stockDogApp')
  .service('QuoteService', function QuoteService($http, $interval) {
  	var stocks = [];
  	var BASE = 'http://query.yahooapis.com/v1/public/yql';

  	// [1] Update stock model with quote data
  	var update = function(quotes) {
  		console.log(quotes);
  		if (quotes.length === stocks.length) {
  			_.each(quotes, function(quote, idx) {
  				var stock = stocks[idx];
				stock.lastPrice = parseFloat(quote.LastTradePriceOnly);
  				stock.change = quote.Change;
  				stock.percentChange = quote.ChangeinPercent;
  				stock.marketValue = stock.shares * stock.lastPrice;
  				stock.dayChange = stock.shares * parseFloat(stock.change);
  			});
  		}
  	};

  	// [2] Helper functions managing which stocks we pull quotes for
	this.register = function(stock) {
		stocks.push(stock);
	};
	this.deregister = function(stock) {
		_.remove(stocks, stock);
	};
	this.clear = function() {
		stocks = [];
	};

	// [3] Main func for talking to Yahoo Finance API
	this.fetch = function() {
		var symbols = _.reduce(stocks, function(symbols, stock){
			symbols.push(stock.company.symbol);
			return symbols;
		}, []);

		var query = encodeURIComponent('select * from yahoo.finance.quotes ' + 'where symbol in (\'' + symbols.join(',') + '\')');

		var url = BASE + '?' + 'q=' + query + '&format=json&diagnostics=true' + '&env=http://datatables.org/alltables.env';
		
		$http.jsonp(url + '&callback=JSON_CALLBACK')
			.success(function(data){
				if (data.query.count) {
					var quotes = data.query.count > 1 ? data.query.results.quote : [data.query.results.quote];
					update(quotes);
				}
			})
			.error(function(data){
				console.log(data);
			});
	};

	// [4] Fetch new data every 5 secs
	$interval(this.fetch, 5000);

  });
