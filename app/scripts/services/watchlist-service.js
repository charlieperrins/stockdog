'use strict';

/**
 * @ngdoc service
 * @name stockDogApp.WatchlistService
 * @description
 * # WatchlistService
 * Service in the stockDogApp.
 */
angular.module('stockDogApp')
  .service('WatchlistService', function WatchlistService() {
    // AngularJS will instantiate a singleton by calling "new" on this function

    // [1] Load helper
    var loadModel = function() {
    	var model = {
    		watchlists: localStorage['StockDog.watchlists'] ?
    			JSON.parse(localStorage['StockDog.watchlists']) : [],
    		nextId: localStorage['StockDog.nextId'] ?
    			parseInt(localStorage['StockDog.nextId']) : 0
    	};
    	return model;
    };

    // [2] save helper
    var saveModel = function() {
    	localStorage['StockDog.watchlists'] = JSON.stringify(Model.watchlists);
    	localStorage['StockDog.nextId'] = Model.nextId;
    };

    // [3] lodash find watchlist by id
    var findById = function(listId) {
    	return _.find(Model.watchlists, function(list){
    		return list.id === parseInt(listId);
    	});
    };

    // [4] return all lists or find by id
    this.query = function(listId) {
    	if (listId) {
    		return findById(listId);
    	} else {
    		return Model.watchlists;
    	}
    };

    // [5] save new list to model
    this.save = function(watchlist) {
    	watchlist.id = Model.nextId++;
    	Model.watchlists.push(watchlist);
    	saveModel();
    };

    // [6] remove list from model
    this.remove = function(watchlist) {
    	_.remove(Model.watchlists, function(list){
    		return list.id === watchlist.id;
    	});
    	saveModel();
    };

    // [7] initialise Model
    var Model = loadModel();
  });
