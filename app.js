// app.js
'use strict';
// define our application and pull in ngRoute and ngAnimate
var universityApp = angular.module('universityApp', ['ngRoute', 'ngAnimate', 'ngResource'])


var feeds = [];

// -> Fisher–Yates shuffle algorithm
var shuffleArray = function(array) {
  var m = array.length, t, i;
console.log('executing');
  // While there remain elements to shuffle
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
console.log('shuffled');
  return array;
}
// function shuffle(sourceArray) {
//     for (var i = 0; i < sourceArray.length - 1; i++) {
//         var j = i + Math.floor(Math.random() * (sourceArray.length - i));
//
//         var temp = sourceArray[j];
//         sourceArray[j] = sourceArray[i];
//         sourceArray[i] = temp;
//     }
//     return sourceArray;
// }

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
        // {title:'brandemia', url:'http://brandemia.org/feed'},
        {title: 'e', url:'http://ffffound.com/feed'},
        {title: 'f', url:'https://www.behance.net/rss'},
        {title: 'g', url:'http://agenciabai.es/category/recursos-university/diseno-recursos-university/feed/'},
        {title: 'h', url:'http://www.tagoartwork.com/feed/'},
        {title: 'i', url:'http://www.area-visual.com/feeds/posts/default'}]
        // var feedSource1 = feedSource[0].concat(feedSource[1], feedSource[2], feedSource[3],feedSource[4], feedSource[5],feedSource[6],feedSource[7], feedSource[8]);
        // console.log(feedSource1);
      if (feeds.length === 0) {
        for (var i=0; i < feedSource.length; i++) {
        console.log(feedSource[i]);
          FeedLoader.fetch({q: feedSource[i].url, num:100}, {}, function (data) {
          var feed = angular.copy(data.responseData.feed);

          feeds.push(feed);




          angular.forEach(feed.entries, function(value){
            var content = '<div>'+value.content+'</div>';
            value.sImage =  $(content).find('img').eq(0).attr('src');
            
            // console.log('image' + value.sImage);

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

  // $scope.indexAct = 0;

  $scope.getFeeds = function() {
    FeedList.get().then(function(data){

       $scope.feeds = data;

       console.log($scope.feeds);

       //shuffleArray($scope.feeds);
       //shuffle($scope.feeds);

   })
  }



  $scope.getFeeds();

});


universityApp.controller('nightModeCtrl', function($scope) {
  $scope.nightMode = false;
  $scope.nightModeBtn = function() {

    $scope.nightMode = !$scope.nightMode;
  }
});

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



});
