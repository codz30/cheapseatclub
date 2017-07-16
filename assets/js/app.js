var cheapSeatApp = angular.module('cheapSeatApp', []);

cheapSeatApp.controller('DealListController', ['$scope', '$http', function($scope, $http) {
    $scope.method = 'GET';
    $scope.url = 'http://iwantthatflight.com.au/deals.aspx?format=xml&afid=2361';
    $scope.code = null;
    $scope.response = null;
    $http({method: $scope.method, url: $scope.url, cache: $templateCache}).
        then(function(response) {
          $scope.status = response.status;
          $scope.data = response.data;
        }, function(response) {
          $scope.data = response.data || 'Request failed';
          $scope.status = response.status;
     });
    $scope.deals = xml2json($scope.data);
}]);
