// app.js

'use strict';
// define our application and pull in ngRoute and ngAnimate
var universityApp = angular.module('universityApp', ['ngRoute', 'ngAnimate', 'ngResource', 'ui.directives', 'ui.filters','angular-click-outside'])


var feeds = [];

function decode_utf8(s) {
  return decodeURIComponent(escape(s));
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
        {title: 'g', url:'http://baianai.es/category/fffres-co/fffres-co-recursos/feed/'},
        {title: 'h', url:'http://lacriaturacreativa.com/feed/'},
        {title: 'i', url:'http://www.area-visual.com/feeds/posts/default'},
         {title: 'k', url:'http://mix.chimpfeedr.com/77124-lomasfffresco'}
//{title: 'k', url:'http://feedkiller.com/feed-40883'}

      ]



      if (feeds.length === 0) {
        for (var i=0; i < feedSource.length; i++) {

          FeedLoader.fetch({q: feedSource[i].url, num:250}, {}, function (data) {
          var feed = angular.copy(data.responseData.feed);

          feeds.push(feed);
          console.log(feed.title);

            // if(feed.title = "lomasfffresco") {
            //   console.log('in');
            //
            //   for (var i=0; i < feed.entries.length; i++) {
            //
            //     console.log(feed.entries);
            //
            //     var titulo = angular.element( document.querySelector( '.titulo' ) );
            //     titulo.addClass('red');
            //
            // }
            //
            // };
          angular.forEach(feed.entries, function(value){

            //console.log(value.link);

            var content = '<div>'+value.content+'</div>';

            //var contentSnippet = decode_utf8(value.contentSnippet);

            value.sImage =  $(content).find('img').eq(0).attr('src');

            if (value.link.indexOf('graffica') > -1) {
              value.source = 'Gràffica';
              console.log(value.source);
            };

            if (value.link.indexOf('area-visual') > -1) {
              value.source = 'Área Visual';
              console.log(value.source);
            };
            if (value.link.indexOf('baianai') > -1) {
              value.source = 'Staff Pick';
              console.log(value.source);
            };
            if (value.link.indexOf('brandemia') > -1) {
              value.source = 'Brandemia';
              console.log(value.source);
            };
            if (value.link.indexOf('lacriaturacreativa') > -1) {
              value.source = 'La Criatura Creativa';
              console.log(value.source);
            };
            if (value.link.indexOf('40defiebre') > -1) {
              value.source = '40 de Fiebre';
              console.log(value.source);
            };



          //   switch (value.link) {
          //     case 'grafica':
          //       value.link
          //     case '2':
          //         alert("Selected Case Number is 2");
          //         break;
          //     default:
          //
          // }

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
  $scope.source = function() {
    if ($scope.myFilter = {title: 'fffresco'} ) {
console.log($scope.myFilter);
      $scope.changeSource = 'tag-source';
    };
  }

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
