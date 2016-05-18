var loginControllers = angular.module('loginControllers', ['angular-storage']);

loginControllers.run(['$rootScope', '$location', '$window', 'Auth0Store', function($rootScope, $location, $window, Auth0Store) {
    console.log("run once ");
    $rootScope.$on('$routeChangeStart', function(event) {
        if (!Auth0Store.isLoggedIn()) {
            console.log('DENY');
            // event.preventDefault();

            // @Todo need warning
            // $window.alert('need login');
            // $location.path("login");
        } else {
            console.log('ALLOW');
            // $location.path('#/');
            $rootScope.user = Auth0Store.getUser();
        }
    });
}]);

loginControllers.controller('loginCtrl', ['$scope', '$http', '$window', 'Auth0Store', function($scope, $http, $window, Auth0Store) {

    $scope.login = function() {
        console.log("login!!!!", $scope.acc, $scope.pwd);

        $http.post('api/login', { acc: $scope.acc, pwd: $scope.pwd }).then(function(res) {
            console.log(res.data);
            switch (res.data.code) {
                case 200:
                    Auth0Store.setUser(res.data.data);
                    $window.alert('登入成功> 導向/dashboard');
                    break;
                default:
                    $window.alert(res.data.errmsg);
            }

        });
    };

    $scope.logout = function() {
        Auth0Store.clean();
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
