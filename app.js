// app.js

'use strict';
// define our application and pull in ngRoute and ngAnimate
var universityApp = angular.module('universityApp', ['ngRoute', 'ngAnimate', 'ngResource', 'ui.directives', 'ui.filters','angular-click-outside', 'ngTouch'])


var feeds = [];

  // CONTROLLERS ============================================

universityApp.controller('feedsCtrl', function($scope) {



    $scope.getFeeds = function() {
        /*FeedList.get().then(function(data){
            $scope.feeds = data;
            console.log($scope.feeds);
        });*/
        var feedList=$.ajax({
            type: "POST",
            dataType: "json",
            url: "includes/script.php?action=getFeeds",
            error: function(error){
                console.log(error);
            },
            async: false,
        });

        $scope.feeds=feedList.responseJSON;
        console.log(feedList.responseJSON);
        //return feedList.responseJSON;
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
