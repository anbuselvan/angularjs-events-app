'use strict';

eventsApp.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home.html',
      controller: 'homeController'
    })
    .state('add', {
      url: '/add',
      templateUrl: 'views/add.html',
      controller: 'addController'
    })
    .state('edit', {
      url: '/edit/:id',
      templateUrl: 'views/edit.html',
      controller: 'editController'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'views/about.html',
      controller: 'aboutController'
    })
    .state('events', {
      url: '/events/:id',
      templateUrl: 'views/events.html',
      controller: 'eventsController'
    });
});