var app = angular.module('pingApp', ['ngRoute',
    'searchControllers',
]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            template: '这是index.jade',
            // controller: 'mainCtrl'
        })
        .when('/home', {
            templateUrl: 'partials/home',
        })
        .when('/search', {
            templateUrl: 'pages/find_talent',
            controller: 'SearchTalentCtrl'
        })
        .when('/login', {
            template: 'this is login',
            // controller: 'loginCtrl'
        })
        .otherwise({ template: '这是index.jade' });
    // .otherwise({ redirectTo: '/' });
}]);

app.controller('myCtrl', function($scope) {
    $scope.name = "John Doe";
});
