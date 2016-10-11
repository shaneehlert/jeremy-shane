var mapRight = angular.module('mapRight', ['ui.router']);



mapRight.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){

  $urlRouterProvider.otherwise('/404');

  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'app/views/home.html'
    
    
   }).state('map', {
    url: '/',
    templateUrl: 'app/views/map.html',
    controller: 'indexController'
    
    

  }).state('404', {
    url: '/404',
    templateUrl: 'app/views/404.html'

  });

  $locationProvider.html5Mode(true);

}]);

 

