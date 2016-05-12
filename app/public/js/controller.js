var app = angular.module('pingApp', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', { template: '这是index.jade' })
            .when('/home', {
                templateUrl: 'partials/home',
            })
            .otherwise({ template: '这是index.jade' });
        // .otherwise({ redirectTo: '/' });
    }]);

app.controller('myCtrl', function($scope) {
    $scope.name = "John Doe";
});
