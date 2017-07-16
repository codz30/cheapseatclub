var cheapSeatApp = angular.module('cheapSeatApp', []);

cheapSeatApp.controller('DealListController', function DealListController($scope) {
  $scope.deals = [
    {
      name: 'Nexus S',
      snippet: 'Fast just got faster with Nexus S.'
    }, {
      name: 'Motorola XOOM™ with Wi-Fi',
      snippet: 'The Next, Next Generation tablet.'
    }, {
      name: 'MOTOROLA XOOM™',
      snippet: 'The Next, Next Generation tablet.'
    }
  ];
});