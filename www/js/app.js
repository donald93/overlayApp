// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .controller('overlayController', function ($scope, $timeout, $cordovaCamera) {

    $scope.baseImage = "img/image.jpg";
    $scope.image = $scope.baseImage;
    $scope.topText = "";
    $scope.bottomText = "";
    var canvas = document.getElementById('tempCanvas');
    var context = canvas.getContext('2d');

    $scope.displayMeme = function () {
      var source = new Image();
      source.src = $scope.baseImage;
      canvas.width = source.width;
      canvas.height = source.height;
      context.drawImage(source, 0, 0);

      context.font = "100px impact";
      textWidth = context.measureText($scope.frase).width;

      if (textWidth > canvas.offsetWidth) {
        context.font = "40px impact";
      }
      context.textAlign = 'center';
      context.fillStyle = 'white';

      context.fillText($scope.bottomText, canvas.width / 2, canvas.height * 0.9);
      context.fillText($scope.topText, canvas.width / 2, canvas.height * 0.13);

      var imgURI = canvas.toDataURL();

      $timeout(function () {
        $scope.image = imgURI;
      }, 200);

      $scope.href = canvas.toDataURL();

    };

    //take picture here

    //save picture here


  });


