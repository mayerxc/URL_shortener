var app = angular.module('shortURLApp', []);

app.controller('shortAppCtrl', ($scope) => {
    $scope.urlToShorten = "hello world";
})