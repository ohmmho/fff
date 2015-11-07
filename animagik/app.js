// app.js

// define our application and pull in ngRoute and ngAnimate
var animagikApp = angular.module('animagikApp', ['ngRoute', 'ngAnimate']);

// ROUTING ===============================================
// set our routing for this application
// each route will pull in a different controller
animagikApp.config(function($routeProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'page-home.html',
            controller: 'mainController'
        })

        // about page
        .when('/about', {
            templateUrl: 'page-about.html',
            controller: 'aboutController'
        })

        // contact page
        .when('/contact', {
            templateUrl: 'page-contact.html',
            controller: 'contactController'
        });

});


// CONTROLLERS ============================================
// home page controller
animagikApp.controller('mainController', function($scope) {
    $scope.pageClass = 'page-home';
});

// about page controller
animagikApp.controller('aboutController', function($scope) {
    $scope.pageClass = 'page-about';
});

// contact page controller
animagikApp.controller('contactController', function($scope) {
    $scope.pageClass = 'page-contact';
});
