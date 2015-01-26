'use strict';

eventsApp.controller('eventsController', function($scope, $stateParams, $http) {

  $scope.layout = 'list';

  $('#spinner').show();
  $http.get('/api/events/' + $stateParams.id)
    .success(function(data) {
      $scope.domain = data.domain;
      $scope.events = data.events;
      console.log(data);
      $('#spinner').hide();
    })
    .error(function(err) {
      console.log('Error: ', err);
      $('#spinner').hide();
  });

});
