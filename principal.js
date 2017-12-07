var myApp = angular.module('myApp', []);

myApp.controller("fotoController", function ($scope, $http) {

  var url = 'https://vision.googleapis.com/v1/images:annotate?key=', key = 'AIzaSyDhsFgqjxXhMI6XFP6bgSmwogGI_e3AjuI';
  var urlApi = url + key, gdg = {};
  $scope.gdg =  { tipo : [
    'TYPE_UNSPECIFIED',
    'FACE_DETECTION',
    'LANDMARK_DETECTION',
    'LOGO_DETECTION',
    'LABEL_DETECTION',
    'TEXT_DETECTION',
    'DOCUMENT_TEXT_DETECTION',
    'SAFE_SEARCH_DETECTION',
    'IMAGE_PROPERTIES',
    'CROP_HINTS',
    'WEB_DETECTION'
  ]};


  var sendUrl = function (url, type, maxResults) {
    return sendimageUri = {
      "requests": [
        {
          "image": {
            "source": {
              "imageUri": url
            }
          },
          "features": [
            {
              "type": type,
              "maxResults": maxResults
            }
          ]
        }
      ]
    }
  }

  var sendBase64 = function (base64, type, maxResults) {
    return sendimageBase64 = {
      "requests": [
        {
          "image": {
            "content": base64
          },
          "features": [
            {
              "type": type,
              "maxResults": maxResults
            }
          ]
        }
      ]
    }
  }


  $scope.enviaPhoto = function () {

    var arquivo = document.getElementById('selecionaArquivo').files[0];
    var base64 = {
      binary: ''
    };
    var reader = new FileReader();

    reader.readAsBinaryString(arquivo);

    reader.onload = function () {
      base64.binary = (btoa(reader.result));
      console.warn("start");
    };

    console.log(base64.binary);
    console.log($scope.gdg);

    var enviado = sendUrl($scope.gdg.url, $scope.gdg.valueTipo, 2);

    $http.post(urlApi,
      enviado, {
        headers: { 'Content-Type': undefined }
      }
    ).then(function (res) { 
      console.log( res);
    })
  };

});