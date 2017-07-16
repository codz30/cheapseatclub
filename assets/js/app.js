var cheapSeatApp = angular.module('cheapSeatApp', []);

cheapSeatApp.controller('DealListController', ['$scope', '$http', function($scope, $http) {
    $scope.loading = true;
    $http.get('https://cors-anywhere.herokuapp.com/http://iwantthatflight.com.au/deals.aspx?format=xml&afid=2361')
    .then(function(response) {
	var x2js = new X2JS();
	var xml = response.data.replace(/&/g, "&amp;");   
        $scope.deals = x2js.xml_str2json(xml).deals.deal;
    }).finally(function(){
	 $scope.loading = false; 
    });
}]);
