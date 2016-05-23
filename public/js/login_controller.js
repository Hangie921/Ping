var loginControllers = angular.module('loginControllers', ['angular-storage']);

loginControllers.run(['$rootScope', '$location', '$window', 'Auth0Store', function($rootScope, $location, $window, Auth0Store) {


    $rootScope.$watch(Auth0Store.isLoggedIn, function(value) {
        $rootScope.user = Auth0Store.getUser();
        if (!value) {
            console.log("Disconnect");
            $location.path('login');
        }

    }, true);

}]);

loginControllers.controller('LoginCtrl', ['$scope', '$http', '$window', '$location', 'Auth0Store', function($scope, $http, $window, $location, Auth0Store) {
    $scope.login = function() {
        $http.post('api/login', { acc: $scope.acc, pwd: $scope.pwd }).then(function(res) {
            console.log(res.data);
            switch (res.data.code) {
                case 200:
                    Auth0Store.setUser(res.data.data);
                    $location.path('dashboard');
                    // $window.alert('登入成功> 導向/dashboard');
                    break;
                default:
                    $window.alert(res.data.errmsg);
                    $("#mem_acc + .advice_required_bubble").css("display","inline");
            }

        });
    };

    $scope.try = function(routePath) {
        $http.post('api/' + routePath, {}).then(function(res) {
            switch (res.data.code) {
                default: console.log("try:" + routePath, res.data);
            }

        });
    };
}]);


loginControllers.config(['$provide', function($provide) {
    // store: Module['angular-storage']
    $provide.service('Auth0Store', function(store) {
        this.getUser = function() {
            return store.get('user');
        };
        this.setUser = function(user) {
            return store.set('user', user);
        };
        this.clean = function(user) {
            return store.remove('user');
        };
        this.isLoggedIn = function(user) {
            return store.get('user') ? true : false;
        };
    });
}]);
