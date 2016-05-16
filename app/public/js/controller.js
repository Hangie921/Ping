var searchControllers = angular.module('searchControllers', []);

searchControllers.controller('SearchTalentCtrl', ['$scope', '$http', '$location', '$window',
    function($scope, $http, $location, $window) {

        // $scope.pinger_type='Pinger';
        $http.get('api' + $location.url()).then(function(res) {
            $scope.data = res.data.data;
            if (res.data.code === 200) {
                // console.log('success');
            }
        });

        $scope.queryString = "#/search?";
        $scope.updateQueryString = function() {
            $scope.queryString = "#/search?";
            if ($scope.position) {
                $scope.queryString += "position=" + $scope.position + "&";
            }
            if ($scope.work_type) {
                $scope.queryString += "work_type=" + $scope.work_type + "&";
            }
            if ($scope.seniority) {
                $scope.queryString += "seniority=" + $scope.seniority + "&";
            }
        };
    }


]);
