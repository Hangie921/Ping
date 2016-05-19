var loginControllers = angular.module('loginControllers', ['angular-storage']);

loginControllers.run(['$rootScope', '$location', '$window', 'Auth0Store', function($rootScope, $location, $window, Auth0Store) {


    $rootScope.$watch(Auth0Store.isLoggedIn, function(value) {
        if (value)
            $rootScope.user = Auth0Store.getUser();
        else {
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
            }

        });
    };

    $scope.logout = function() {
        console.log("loginControllers. logout");
        Auth0Store.clean();
    };

    $scope.try = function(routePath) {
        $http.post('api/' + routePath, {}).then(function(res) {
            switch (res.data.code) {
                default: console.log("try:" + routePath, res.data);
            }

        });
    };
}]);

// loginControllers.controller('LogoutCtrl', ['$scope', '$http', '$window', '$location', 'Auth0Store', function($scope, $http, $window, $location, Auth0Store) {
//     $scope.$on('$routeChangeStart',function() {
//         console.log("logout ");
//     });
// }]);

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
