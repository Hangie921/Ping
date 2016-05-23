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

app.run(['$rootScope', '$location', '$http', '$window', 'Auth0Store', function($rootScope, $location, $http, $window, Auth0Store) {
    $rootScope.autoRedirectLogin = false;

    // Inspect session exist, clear cookie and redirect
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        console.log('Auth0Store.isLoggedIn()', Auth0Store.isLoggedIn());
        if (!Auth0Store.isLoggedIn()) {
            if ($rootScope.autoRedirectLogin)
                $location.path('login');
        } else {
            $http.post('api/session/check').then(function(res) {
                switch (res.data.code) {
                    case 200:
                        break;
                    default:
                        $window.alert('no session or session expired');
                        Auth0Store.clean();

                }

            });
        }

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
