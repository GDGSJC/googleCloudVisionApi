var myApp = angular.module('myApp', []);


myApp.controller("fotoController", function ($scope, $http) {

        $scope.enviaPhoto = function (value) {

          //  var img = $('#selecionaArquivo');
            var imagem = document.getElementById('selecionaArquivo');
       
           var imagemFile = imagem.files[0];
            var formData = new FormData();
            formData.append('imagem', imagemFile);

            
           console.log(imagemFile);

           $http.post('upload',formData).then(
             function (resposta) {
               console.log(resposta);
               }
           )
            
        };

    });