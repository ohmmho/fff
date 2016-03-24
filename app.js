// app.js

'use strict';
// define our application and pull in ngRoute and ngAnimate
var universityApp = angular.module('universityApp', ['ngRoute', 'ngAnimate', 'ngResource', 'ui.directives', 'ui.filters','angular-click-outside'])


var feeds = [];


// -> Fisher–Yates shuffle algorithm
var shuffleArray = function(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

  universityApp.factory('FeedLoader', function ($resource) {
      return $resource('http://ajax.googleapis.com/ajax/services/feed/load', {}, {
        fetch: { method: 'JSONP', params: {v:'1.0', callback:'JSON_CALLBACK'} }
      });


  });

  universityApp.service('FeedList', function ($rootScope, FeedLoader, $q) {
    this.get = function($scope) {
      var deffered = $q.defer();
      var feedSource = [
        {title: 'a', url:'http://agenciabai.es/category/university/feed/'},
        {title: 'b', url:'http://graffica.info/feed'},
        {title: 'c', url:'http://40defiebre.com/feed'},
        {title: 'd', url:'https://dribbble.com/shots/popular.rss'  },
        {title:'brandemia', url:'http://brandemia.org/feed'},
        {title: 'e', url:'http://ffffound.com/feed'},
        {title: 'f', url:'https://www.behance.net/rss'},
        {title: 'g', url:'http://agenciabai.es/category/recursos-university/diseno-recursos-university/feed/'},
        {title: 'h', url:'http://lacriaturacreativa.com/feed/'},
        {title: 'i', url:'http://www.area-visual.com/feeds/posts/default'},
        // {title: 'j', url:'http://www.weloveadvertising.es/feed/'}
        {title: 'k', url:'http://mix.chimpfeedr.com/1c890-fffresco'}
      ]



      if (feeds.length === 0) {
        for (var i=0; i < feedSource.length; i++) {

          FeedLoader.fetch({q: feedSource[i].url, num:200}, {}, function (data) {
          var feed = angular.copy(data.responseData.feed);
          // console.log(upfeed);
          feeds.push(feed);

            // for (var j=0; j < upfeed.length; j++) {
            //   var feed = angular.copy(upfeed[j]);
            //   feeds.push(feed);
            //   // console.log(feed);
            // }

          angular.forEach(feed.entries, function(value){

            var content = '<div>'+value.content+'</div>';

            value.sImage =  $(content).find('img').eq(0).attr('src');

            // console.log(feed.sImage);

            // if(value.sImage = value.sImage){
            //
            // return value.sImage;
            //   }
            //
            // else {
            //
            //   angular.forEach(feed.entries, function(value){
            //     value.sImage =
            //     $(value).find('content:\\encoded').find('img').attr('src');
            //     console.log('no image' + " " + value.sImage);
            //      });
            //    }

            });


           deffered.resolve(feeds);


           });

        }
      }

      return deffered.promise;
    };

  });




  // CONTROLLERS ============================================

universityApp.controller('feedsCtrl', function($scope, FeedList) {



$scope.getFeeds = function() {
    FeedList.get().then(function(data){

       $scope.feeds = data;

       console.log($scope.feeds);
   })
  }


  $scope.getFeeds();


});


universityApp.controller('nightModeCtrl', function($scope) {
  $scope.nightMode = false;



    $scope.myFilter = {title: 'fffresco'};
  $scope.nightModeBtn = function() {

    $scope.nightMode = !$scope.nightMode;






  }

  $scope.isVisible = false;

  $scope.isVisibleBtn  = function() {
    $scope.isVisible = true;


    console.log($scope.isVisible);



  }
  //
  $scope.closeThis = function() {
    $scope.isVisible = false;
  }

});

universityApp.controller('switchCtrl', function($scope) {
  //  $scope.x = {random: true};
  // console.log($scope.x);
})

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

        .when('/about', {
            templateUrl: 'about.html',
            controller: 'aboutController'
        })

        // .when('/random', {
        //     templateUrl: 'random.html',
        //     controller: 'aboutController'
        // })



});
