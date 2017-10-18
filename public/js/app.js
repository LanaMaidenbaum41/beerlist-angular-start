var app = angular.module('beerList', ['ui.router']);

app.config(['$stateProvider','$urlRouterProvider','$locationProvider',function($stateProvider,$urlRouterProvider,$locationProvider){
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/home'); 
    $stateProvider
    .state('home',{
        url:'/home',
        controller:'mainCtrl',
        templateUrl:'/templates/home.html'
    })
    .state('beer',{
        url:'/beers/:id',
        controller:'beersCtrl',
        params: {
            beerParam: null
        },
        templateUrl:'/templates/beer.html'
    })
}])
