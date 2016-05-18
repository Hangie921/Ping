var loginControllers = angular.module('loginControllers', ['angular-storage']);

loginControllers.run(['$rootScope', '$location', '$window', 'Auth0Store', function($rootScope, $location, $window, Auth0Store) {
    console.log("run once ");
    $rootScope.$on('$routeChangeStart', function(event) {
        console.log('Auth0Store.getUser()', Auth0Store.getUser());
        console.log('log', Auth0Store.isLoggedIn());
        if (!Auth0Store.isLoggedIn()) {
            console.log('DENY');
            // event.preventDefault();
            // @Todo need warning
            $window.alert('need login');
            $location.path("login");
        } else {
            console.log('ALLOW');
            // $location.path('#/');
        }
    });
}]);

// store: Module['angular-storage']
// loginControllers.service('Auth0Store', function(store) {
//     this.getUser = function() {
//         return store.get('user');
//     };
//     this.setUser = function(user) {
//         return store.set('user', user);
//     };
//     this.isLoggedIn = function(user) {
//         return store.get('user') ? true : false;
//     };
// });

loginControllers.controller('loginCtrl', ['$scope', 'Auth0Store', function($scope, Auth0Store) {
    
    $scope.login = function() {
        var user = { name: 'Rammus', title: 'RD' };
        Auth0Store.setUser(user);
    };

    $scope.logout = function() {
        Auth0Store.clean();
    };
}]);

loginControllers.config(['$provide', function($provide) {
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
