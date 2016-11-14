(function() {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

function FoundItems() {
  var ddo = {
    restrict: "E",
    templateUrl: 'foodlist.html',
    scope: {
      foundItems: "=",
      onRemove: "&"
    },
    controller: NarrowItDownController,
    controllerAs: 'narrow',
    bindToController: true
  };

  return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrow = this;
  narrow.searchTerm = "";

  narrow.getMatchedMenuItems = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);

  promise.then(function (response) {
    narrow.found = response.data;
  })
  .catch(function (error) {
    console.log('Uh oh!');
  });

  // found.removeItem = function(index){
  //   console.log('Removed: ' + found.meals[index].name + ' Items left: ' + found.meals.length);
  //   found.meals = MenuSearchService.removeItem(index);
  // };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath){
  var service = this;

  service.getMatchedMenuItems = function(searchTerm){
    var foundItems = [];

    return $http({ method: "GET", url: (ApiBasePath + "/menu_items.json"),})
    .then(function (result){
      var foundItems = [];

      for(var i = 0; i < result.data.menu_items.length; i++){
        if(result.data.menu_items[i].description.includes(searchTerm)){
          var item = {
            name: result.data.menu_items[i].name,
            short_name: result.data.menu_items[i].short_name,
            description: result.data.menu_items[i].description
          }
        } else {
          var item = {
            name: result.data.menu_items[i].name,
            short_name: result.data.menu_items[i].short_name,
            description: result.data.menu_items[i].description
          };
        }

        foundItems.push(item);
      };

      console.log(foundItems);
      return foundItems;

    })
    .catch(function (errorResponse) {
      console.log("Not working!");
    });
  };

  // service.removeItem = function(index){
  //   found.meals.splice(index,1);
  // };

}

})();
