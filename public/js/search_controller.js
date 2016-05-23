var searchControllers = angular.module('searchControllers', []);

searchControllers.controller('SearchTalentCtrl', ['$scope', '$http', '$location', '$window', '$routeParams',
    function($scope, $http, $location, $window, $routeParams) {
        $scope.position = $routeParams.position;
        $scope.work_type = $routeParams.work_type;
        $scope.seniority = $routeParams.seniority;

        var httpSearch = function() {

            $http.get('api' + $location.url()).then(function(res) {
                console.log(res.data);
                if (res.data.code === 200) {
                    $scope.talents = res.data.data;
                    $scope.count = res.data.count;

                    var pages = [];
                    for (var i = 0; i < Math.floor(res.data.count / 16) + 1; i++) {
                        pages.push(i+1);
                    }
                    $scope.pages = pages;
                } else {
                    console.log(JSON.stringify(res.data));
                }
            });
        };
        httpSearch();

        $scope.$on('$routeUpdate', function(scope, next, current) {
            // Minimize the current widget and maximize the new one
            httpSearch();
        });


        $scope.search = function() {
            $location.search({
                position: $scope.position,
                work_type: $scope.work_type,
                seniority: $scope.seniority
            });
        };

        $scope.contactTalent = function(username) {
            $http.post('api/contact', { contact_someone: username, msg: 'Ping it' }).then(function(res) {
                console.log(res.data);
                switch (res.data.code) {
                    case 200:
                        $window.alert('Ping ' + username);
                        break;
                    default:
                        $window.alert(res.data.errmsg);
                }

            });

        };
    }


]);
