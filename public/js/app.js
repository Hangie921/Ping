var app = angular.module('pingApp', ['ngRoute',
    'searchControllers',
    'loginControllers',
    'profileViewCtrls',
    'profileEditControllers'
]);


app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            template: '这是index.jade',
            redirectTo: '/dashboard'
        })
        .when('/home', {
            templateUrl: 'partials/home',
        })
        .when('/search', {
            templateUrl: 'pages/find_talent',
            controller: 'SearchTalentCtrl',
            reloadOnSearch: false
        })
        .when('/login', {
            templateUrl: 'pages/login',
            controller: 'LoginCtrl',
            data: {
                bodyClass: "login"
            }
        })
        .when('/dashboard', {
            templateUrl: 'pages/dashboard',
        })
        .when('/companies/:profileId', {
            templateUrl: 'pages/company_profile',
            controller: 'viewCtrl',

            data: {
                bodyClass: "view profile"
            }
        })
        .when('/companies/profile/edit', {
            templateUrl: 'pages/company_profile_edit',
            controller: 'EditSettingAndImageCtrl',
            data: {
                bodyClass: "edit"
            }
        })
        .when('/companies/profile/edit_detail', {
            templateUrl: 'pages/company_profile_edit_detail',
            controller: 'EditCompanyDetailCtrl',
            data: {
                bodyClass: "edit detail"
            }
        })
        .when('/companies/profile/edit_social', {
            templateUrl: 'pages/company_profile_edit_social',
            controller: 'EditSocialBtnsCtrl',
            data: {
                bodyClass: "edit social"
            }
        })
        .otherwise({ template: '404 Not Found' });
    // .otherwise({ redirectTo: '/' });
}]);

app.controller('myCtrl', function($scope) {
    $scope.name = "John Doe";
});

app.run(['$rootScope', '$location', 'Auth0Store', function($rootScope, $location, Auth0Store) {
    $rootScope.autoRedirectLogin = true;
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        if (!Auth0Store.isLoggedIn()) {
            console.log('DENY');
            if ($rootScope.autoRedirectLogin)
                $location.path('login');
        } else
            console.log('ALLOW');

        if (next.data)
            $rootScope.bodyClass = next.data.bodyClass;
        else
            $rootScope.bodyClass = "";
    });

    $rootScope.logout = function() {
        console.log("rootScope. logout");
        Auth0Store.clean();
    };


}]);
