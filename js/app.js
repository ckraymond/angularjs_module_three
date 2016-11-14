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
  //narrow.found = [{name:}];

  narrow.getMatchedMenuItems = function(){
    narrow.found = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);
    console.log(narrow.found[1]);
  };

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
        // if(result.data.menu_items[i].description.includes(searchTerm)){
        //   var item = {
        //     name: result.data.menu_items[i].name,
        //     description: result.data.menu_items[i].description
        //   };

        var item = {
          name: result.data.menu_items[i].name,
          description: result.data.menu_items[i].description
        };

        foundItems.push(item);
      };

      var temp_array = ["TEST","TEST2"];
      console.log(temp_array[0]);
      return temp_array;

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
