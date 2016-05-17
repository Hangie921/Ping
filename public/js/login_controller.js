var loginControllers = angular.module('loginControllers', []);


loginControllers.run(['$rootScope', '$location', 'Auth', function($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function(event) {

        if (!Auth.isLoggedIn()) {
            console.log('DENY');
            event.preventDefault();
            $location.path('#/login');
        } else {
            console.log('ALLOW');
            $location.path('#/home');
        }
    });
}]);


loginControllers.factory('Auth', function() {
    var user;

    return {
        setUser: function(aUser) {
            user = aUser;
        },
        isLoggedIn: function() {
            return (user) ? user : false;
        }
    };
});



loginControllers.controller('loginCtrl', ['$scope', 'Auth', function($scope, Auth) {
    //submit
    $scope.login = function() {
        // Ask to the server, do your job and THEN set the user

        Auth.setUser(user); //Update the state of the user in the app
    };
}]);

loginControllers.controller('mainCtrl', ['$scope', 'Auth', '$location', function($scope, Auth, $location) {

    $scope.$watch(Auth.isLoggedIn, function(value, oldValue) {

        if (!value && oldValue) {
            console.log("Disconnect");
            $location.path('#/login');
        }

        if (value) {
            console.log("Connect");
            //Do something when the user is connected
        }

    }, true);

}]);