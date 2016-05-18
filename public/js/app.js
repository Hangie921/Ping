var app = angular.module('pingApp', ['ngRoute',
    'searchControllers',
    'loginControllers',
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
            templateUrl: 'pages/login',
            // templateUrl: 'partials/home',
            controller: 'loginCtrl',
            data: {
                bodyClass: "login"
            }
        })
        .when('/dashboard', {
            templateUrl: 'modules/menu',
            // templateUrl: 'pages/dashboard',
            // templateUrl: 'partials/home',
            // controller: 'dashboardCtrl'
        })
        .otherwise({ template: '这是index.jade' });
    // .otherwise({ redirectTo: '/' });
}]);

app.controller('myCtrl', function($scope) {
    $scope.name = "John Doe";
});

app.controller('debugCtrl', function($scope) {
    $scope.debug = true;
});

app.run(['$rootScope', '$location', 'Auth0Store', function($rootScope, $location, Auth0Store) {
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        if (next.data)
            $rootScope.bodyClass = next.data.bodyClass;
        else
            $rootScope.bodyClass = "";
    });
    console.log('Auth0Store.getUser123()', Auth0Store.getUser());

    // $rootScope.$watch(Auth0Store.isLoggedIn, function(value, oldValue) {
    //     console.log('app run', value,oldValue);
    //     // if (!value && oldValue) {
    //     //     console.log("Disconnect");
    //     //     $location.path('#/login');
    //     // }

    //     // if (value) {
    //     //     console.log("Connect");
    //     //     //Do something when the user is connected
    //     // }

    // }, true);


}]);
