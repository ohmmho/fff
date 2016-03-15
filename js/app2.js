

// app.js
'use strict';
// define our application and pull in ngRoute and ngAnimate
var universityApp = angular.module('universityApp', ['ngRoute', 'ngAnimate', 'ngResource'])


var feeds = [];


universityApp.factory('FeedLoader', function ($resource) {
    return $resource('http://ajax.googleapis.com/ajax/services/feed/load', {}, {
      fetch: { method: 'JSONP', params: {v:'1.0', callback:'JSON_CALLBACK'} }
    });

});


  universityApp.service('FeedList', function ($rootScope, FeedLoader, $q) {
    this.get = function($scope) {
      var deffered = $q.defer();
      var feedSource = [
        {title: '1', url: 'http://40defiebre.com/feed'},
        {title: '2', url:'https://dribbble.com/shots/popular.rss'  }
      ];

      if (feeds.length === 0) {
        for (var i=0; i < feedSource.length; i++) {
          FeedLoader.fetch({q: feedSource[i].url, num:50}, {}, function (data) {
            var feed = angular.copy(data.responseData.feed);
            feeds.push(feed);

            // Get the images here
           angular.forEach(feed.entries, function(value){
           value.sImage = $(value.content).find('img').eq(0).attr('src');
           });

            deffered.resolve(feeds);
          });

        }
      }
      return deffered.promise;
    };
  });


universityApp.controller('firstCtrl', function($scope, FeedList) {

  $scope.indexAct = 0;

  $scope.getFeeds = function() {
    FeedList.get().then(function(data){
        // Do nothing
    })
  }

  $scope.changeFeed = function(index) {
    $scope.indexAct = index
    $scope.getFeeds();
  }

  $scope.getFeeds();

});



// CONTROLLERS ============================================
// home page controller
universityApp.controller('mainController', function($scope) {

});

// about page controller
universityApp.controller('aboutController', function($scope) {
    $scope.pageClass = 'page-about';
});

// contact page controller
universityApp.controller('contactController', function($scope) {
    $scope.pageClass = 'page-contact';
});


// ROUTING ===============================================
// set our routing for this application
// each route will pull in a different controller
universityApp.config(function($routeProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'home.html',
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
