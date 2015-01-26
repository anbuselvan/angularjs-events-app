'use strict';

eventsApp.controller('editController', function($scope, $stateParams, $state, $http) {

  console.log($stateParams);

  $('#spinner').show();
  $scope.formData = {};
  $http.get('/api/website/' + $stateParams.id)
    .success(function(data) {
      $scope.formData.domain = data.domain;
      $scope.formData.url = data.config.url;
      $scope.formData.item = data.config.item;
      $scope.formData.title = data.config.title;
      $scope.formData.link = data.config.link;
      $scope.formData.link_attr = data.config.link_attr;
      $scope.formData.link_prefix = data.config.link_prefix;
      $scope.formData.image_url = data.config.image_url;
      $scope.formData.image_url_prefix = data.config.image_url_prefix;
      $scope.formData.date = data.config.date;
      $scope.formData.date_regex = data.config.date_regex;
      $scope.formData.time = data.config.time;
      $scope.formData.time_regex = data.config.time_regex;
      console.log(data);
      $('#spinner').hide();
    })
    .error(function(err) {
      console.log('Error: ', err);
      $('#spinner').hide();
  });

  $scope.saveWebsite = function(isValid) {
    if (isValid) {
      $http.put('/api/website/' + $stateParams.id, $scope.formData)
        .success(function(data) {
          $scope.formData = data;
          console.log(data);
          $state.go('home');
        })
        .error(function(err) {
          console.log('Error: ', err);
      });
    }
  };

});