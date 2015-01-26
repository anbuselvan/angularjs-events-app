'use strict';

eventsApp.controller('homeController', function($scope, $http) {

  $('#spinner').show();
  $http.get('/api/websites')
    .success(function(data) {
      $scope.websites = data;
      $('#spinner').hide();
    })
    .error(function(err) {
      console.log('Error: ', err);
      $('#spinner').hide();
  });

  $scope.deleteWebsite = function(index, docID) {
    $http.delete('/api/website/' + docID)
      .success(function(data) {
        console.log(data);
        $scope.websites.splice(index, 1);
      })
      .error(function(err) {
        console.log('Error: ' + err);
      });
  };

});
