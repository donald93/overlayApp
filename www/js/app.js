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
    $scope.textOverlay = "";

    var canvas = document.getElementById('tempCanvas');
    var context = canvas.getContext('2d');

    $scope.createOverlay = function () {

      var source = new Image();
      source.src = $scope.baseImage;
      canvas.width = source.width;
      canvas.height = source.height;

      console.log(canvas);

      context.drawImage(source, 0, 0);

      context.font = "100px impact";
      textWidth = context.measureText($scope.frase).width;

      if (textWidth > canvas.offsetWidth) {
        context.font = "40px impact";
      }
      context.textAlign = 'center';
      context.fillStyle = 'white';

      context.fillText($scope.textOverlay, canvas.width / 2, canvas.height * 0.8);

      var imgURI = canvas.toDataURL();

      $timeout(function () {
        $scope.image = imgURI;
      }, 200);


    };

    $scope.takePicture = function () {
      var options = {
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function (imageData) {
        $scope.baseImage = "data:image/jpeg;base64," + imageData;
        $scope.image = $scope.baseImage;
      }, function (err) {
        // An error occured. Show a message to the user
      });
    }


  });