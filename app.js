// app.js

'use strict';
// define our application and pull in ngRoute and ngAnimate
var universityApp = angular.module('universityApp', ['ngRoute', 'ngAnimate', 'ngResource', 'ui.directives', 'ui.filters','angular-click-outside', 'ngTouch'])


var feeds = [];






  universityApp.factory('FeedLoader', function ($resource) {
      return $resource('http://ajax.googleapis.com/ajax/services/feed/load', {}, {
        fetch: { method: 'JSONP', params: {v:'1.0', callback:'JSON_CALLBACK'}, header : {'Content-Type' : 'application/json; charset=UTF-8'} }
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
        {title: 'k', url:'http://mix.chimpfeedr.com/7e4a7-lomasfffresco'},
        {title: 'm', url:'http://thecreatorsproject.vice.com/es/rss'},
        {title: 'n', url:'http://nfgraphics.com/feed/'},
        {title: 'o', url:'http://www.domestika.org/es/blog/rss'},
        {title: 'p', url:'http://www.awwwards.com/feed/'},
        {title: 'q', url:'http://www.csswinner.com/feed'},
        //{title: 'r', url:'https://www.producthunt.com/feed'},
        {title: 's', url:'http://www.fubiz.net/feed/'}
        //{title: 'empleo', url:'http://mix.chimpfeedr.com/74a48-empleofffresco'}


        //{title: 't', url:'https://www.smashingmagazine.com/feed/'}




      ]



      if (feeds.length === 0) {
        for (var i=0; i < feedSource.length; i++) {

          FeedLoader.fetch({q: feedSource[i].url, num:250}, {}, function (data) {
          var feed = angular.copy(data.responseData.feed);

          feeds.push(feed);
          //console.log(feed.title);

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



            var content = '<div>'+value.content+'</div>';
            //var description = '<div>'+value.description+'</div>';


            // value.contentSni = utf8_decode(value.contentSnippet);
            //    console.log(value.contentSni);
            value.sImage =  $(content).find('img').eq(0).attr('src');



            //asign source name

              if (value.link.indexOf('graffica') > -1) {
                value.source = 'Gràffica';
                //console.log(value.source);
              };

              if (value.link.indexOf('area-visual') > -1) {
                value.source = 'Área Visual';
                //console.log(value.source);
              };
              if (value.link.indexOf('baianai') > -1) {
                value.source = 'Staff Pick';
                //console.log(value.source);
              };
              if (value.link.indexOf('brandemia') > -1) {
                value.source = 'Brandemia';
                //console.log(value.source);
              };
              if (value.link.indexOf('lacriaturacreativa') > -1) {
                value.source = 'La Criatura Creativa';
                //console.log(value.source);
              };
              if (value.link.indexOf('40defiebre') > -1) {
                value.source = '40 de Fiebre';
                //console.log(value.source);
              };
              if (value.link.indexOf('thecreatorsproject') > -1) {
                value.source = 'The Creators Project';
                //console.log(value.source);
              };
              if (value.link.indexOf('CosasVisuales') > -1) {
                value.source = 'Cosas Visuales';
                //console.log(value.source);
              };
              if (value.link.indexOf('nfgraphics') > -1) {
                value.source = 'Nice Fucking Graphics!';
                //console.log(value.source);
              };
              if (value.link.indexOf('behance') > -1) {
                value.source = 'Behance';
                //console.log(value.source);
              };
              if (value.link.indexOf('dribbble') > -1) {
                value.source = 'Dribbble';
                //console.log(value.source);
              };
              if (value.link.indexOf('ffffound') > -1) {
                value.source = 'FFFFOUND';
                //console.log(value.source);
              };
              if (value.link.indexOf('domestika') > -1) {
                value.source = 'Domestika';
                //console.log(value.source);
              };
              if (value.link.indexOf('awwwards') > -1) {
                value.source = 'Awwwards';
                //console.log(value.source);
              };
              if (value.link.indexOf('csswinner') > -1) {
                value.source = 'CSS Winner';
                //console.log(value.source);
              };

              if (value.link.indexOf('producthunt') > -1) {
                value.source = 'Product Hunt';
                //console.log(value.source);
              };
              if (value.link.indexOf('fubiz') > -1) {
                value.source = 'Fubiz';
                //console.log(value.source);
              };
              if (value.link.indexOf('smashingmagazine') > -1) {
                value.source = 'Smashing Magazine';
                //console.log(value.source);
              };
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

  // initial feed index
  //
  // if (!$scope._Index) {
  //   $scope._Index = 0;
  // }
  //
  // // if a current feed is the same as requested feed
  // $scope.isActive = function (index) {
  //     return $scope._Index === index;
  //
  // };
  //
  // // show prev feed
  // $scope.showPrev = function () {
  //     $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.feeds.length - 1;
  //
  // };
  //
  // // show next feed
  // $scope.showNext = function () {
  //     $scope._Index = ($scope._Index < $scope.feeds.length - 1) ? ++$scope._Index : 0;
  // };




});


universityApp.controller('nightModeCtrl', function($scope) {

//night mode

  var theme = localStorage.getItem('theme');
  $scope.mode = 'día';


  $scope.initMode = function() {
    $scope.mode = $scope.mode;

    if(theme == 'night-mode'){
        angular.element('body').addClass('night-mode');

        $scope.mode = 'noche';
    }

  }

  $scope.initMode();

  $scope.setMode = function()  {
    if ($scope.nightMode == false) {
      $scope.mode = 'día';
      localStorage.setItem('theme', 'day-mode');

    }
    else {
      $scope.mode = 'noche';
      localStorage.setItem('theme', 'night-mode');
    }

  }



  $scope.nightModeBtn = function() {

    $scope.nightMode = !$scope.nightMode;

    $scope.setMode();

  }

  // $scope.checkInstalled = function() {
  //
  // if (chrome.app.isInstalled) {
  //   document.getElementById('install-button').style.display = 'none';
  // }
  //
  // }

//source tag
 $scope.myFilter = {title: 'lomasfffresco'};

    //  $scope.setTag = function() {
    //    if ($scope.myFilter = {title: 'fffresco'}) {
    //        console.log($scope.myFilter);
    //      angular.element('.source').addClass('tag-source');
    //    };
    //  }
     //
    //  $scope.setTag();

//aside slider
  $scope.isVisible = false;



  $scope.isVisibleBtn  = function() {
    $scope.isVisible = !$scope.isVisible;

    //console.log($scope.isVisible);
  }

  //
  $scope.closeThis = function() {
    $scope.isVisible = false;
  }

  //close menu-mobile
  $scope.closeThat = function() {
    angular.element('.demo-drawer').removeClass('is-visible');
    angular.element('.mdl-layout__obfuscator').removeClass('is-visible');
  }
});

universityApp.controller('switchCtrl', function($scope, $rootScope) {
  //  $scope.x = {random: true};
  // console.log($scope.x);
  //width
  var mobileWidth= '653px';
  var tabletWidth= '653px';

  $scope.getWidth = function() {
      var width = $(document).width();

      $scope.mobile = width > mobileWidth;
      $scope.tablet = width > tabletWidth;
    ;
  }

  $scope.getWidth();
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

        .when('/newsletter', {
            templateUrl: 'newsletter.html'

        })
        .when('/recursos', {
            templateUrl: 'recursos.html'
        })
        .when('/blog', {
            templateUrl: 'blog.html'

        })
        .when('/sugerir-link', {
            templateUrl: 'sugerir-link.html'

        })
        .when('/contacto', {
            templateUrl: 'contacto.html'

        })
        .when('/extension', {
            templateUrl: 'extension.html'

        })







});
