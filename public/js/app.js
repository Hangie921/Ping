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
            controller: 'LoginCtrl',
            data: {
                bodyClass: "login"
            }
        })
        .when('/dashboard', {
            // templateUrl: 'modules/menu',
            templateUrl: 'pages/dashboard',
            // templateUrl: 'partials/home',
            // controller: 'dashboardCtrl'
        })
        .when('/companies/:profileId',{
            templateUrl: 'pages/company_profile',
            controller:'viewCtrl',

            data:{
                bodyClass:"view profile"
            }
        })
        .when('/companies/profile/edit',{
            templateUrl:'pages/company_profile_edit',
            controller:'EditSettingAndImageCtrl',
            data:{
                bodyClass:"edit"
            }
        })
        .when('/companies/profile/edit_detail',{
            templateUrl:'pages/company_profile_edit_detail',
            controller:'EditCompanyDetailCtrl',
            data:{
                bodyClass:"edit detail"
            }
        })
        .when('/companies/profile/edit_social',{
            templateUrl:'pages/company_profile_edit_social',
            controller:'EditSocialBtnsCtrl',
            data:{
                bodyClass:"edit social"
            }
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
    $rootScope.autoRedirectLogin = false;
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
