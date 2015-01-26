'use strict';

eventsApp.controller('addController', function($scope, $state, $http) {

  $scope.formData = {};

  $scope.createWebsite = function(isValid) {
    if (isValid) {
      $http.post('/api/website', $scope.formData)
        .success(function(data) {
          $scope.formData = {};
          $scope.website = data;
          console.log(data);
          $state.go('home');
        })
        .error(function(err) {
          console.log('Error: ', err);
      });
    }
  };

});