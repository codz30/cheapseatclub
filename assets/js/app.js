var cheapSeatApp = angular.module('cheapSeatApp', []);

cheapSeatApp.controller('DealListController', ['$scope', function($scope) {
  $scope.deals = [
    {
      title: 'Flights to Thailand from $282 Return on Scoot Airlines. Min 2 passengers.',
      description: 'Scoot is having a sale on flights to Bangkok, Thailand. Travel in 25/Jul - 15/Nov. Minimum 2 passengers.',
      url: 'http://iwantthatflight.com.au/d12467-Flights-to-Thailand-from-282-Return-on-Scoot-Airlines-Min-2-passengers.aspx?afid=2361',
      image: 'http://iwantthatflight.com.au/pics/locations/BKK_640.jpg'
    }, {
      title: 'Flights to Japan from $649 Return on Japan Airlines',
      description: 'Japan Airlines has reduced prices even further on flights to Tokyo. Travel in Oct - Nov/17. Flights are direct from Melbourne, other cities fly Qantas to Melbourne then onto Japan.',
      url: 'http://iwantthatflight.com.au/d12468-Flights-to-Japan-from-649-Return-on-Japan-Airlines.aspx?afid=2361',
      image: 'http://iwantthatflight.com.au/pics/locations/NRT_640.jpg'
    }, {
      title: 'Flights to Singapore from $196 Return on Scoot Airlines. Min 2 Passengers',
      description: 'Scoot is having a sale on flights to Singapore. Travel in 25/Jul - 15/Nov. Flights are direct to Singapore. Minimum 2 passengers.',
      url: 'http://iwantthatflight.com.au/d12466-Flights-to-Singapore-from-196-Return-on-Scoot-Airlines-Min-2-Passengers.aspx?afid=2361',
      image: 'http://iwantthatflight.com.au/pics/locations/SIN_640.jpg'
    }
  ];
}]);
