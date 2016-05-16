var app = angular.module('pingApp', ['ngRoute', 'searchControllers']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', { template: '这是index.jade' })
        .when('/home', {
            templateUrl: 'partials/home',
            controller: 'SearchTalentCtrl'
        })
        .when('/search', {
            templateUrl: 'pages/find_talent',
            controller: 'SearchTalentCtrl'
        })
        .otherwise({ template: '这是index.jade' });
    // .otherwise({ redirectTo: '/' });
}]);

app.controller('myCtrl', function($scope) {
    $scope.name = "John Doe";
});
