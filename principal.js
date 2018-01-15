var myApp = angular.module('myApp', []);

myApp.controller("fotoController", function ($scope, $http) {

  var url = 'https://vision.googleapis.com/v1/images:annotate?key=', key = 'AIzaSyDhsFgqjxXhMI6XFP6bgSmwogGI_e3AjuI';
  var urlApi = url + key;
  var gdg = {};
  $scope.gdg = {
    tipo: [
      //  'TYPE_UNSPECIFIED',
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
    ],
    urlDisplay: '',
    altUrl:'',
    showBase64 : false,
    showUrl : false,
    base64: {
      binary: null
    }
  };


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

  $scope.convertBase64 = function () {
    var arquivo = document.getElementById('selecionaArquivo').files[0];
    var reader = new FileReader();
   // $scope.gdg.altUrl = arquivo.name;
    reader.readAsBinaryString(arquivo);
    return reader.onload = function ()  {
      ($scope.gdg.base64.binary = btoa(reader.result));
    }
    $scope.url = '';
    $scope.gdg = $scope.gdg;
  };


  $scope.enviaPhoto = function () {

    console.log($scope.gdg);

    if ($scope.gdg.url == null || $scope.gdg.url == '') {
      var enviado = sendBase64($scope.gdg.base64.binary, $scope.gdg.valueTipo, 2);
      $scope.gdg.showBase64= true;
      $scope.gdg.showUrl = false;
    } else {
      var enviado = sendUrl($scope.gdg.url, $scope.gdg.valueTipo, 2);
      $scope.gdg.showBase64= false;
      $scope.gdg.showUrl = true;
    }
$scope.retornoJson ='';
    $http.post(urlApi,
      enviado, {
        headers: { 'Content-Type': undefined }
      }
    ).then(function (res) {
      console.log(res.data.responses);
      var myJson = JSON.stringify(res.data.responses, 0, 6);
      $scope.retornoJson = " Resultado : "+ myJson ;
    })
  };

});