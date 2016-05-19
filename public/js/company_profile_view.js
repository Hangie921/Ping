var app = angular.module('profileViewCtrls', []);

app.controller('viewCtrl', ['$scope', '$http', '$route', '$routeParams', '$location', function($scope, $http, $route, $routeParams, $location) {

    $scope.profile = "";
    $scope.test = "test";
    $scope.links = "";
    $scope.active = {
        fb: {
            value: false,
            url: ""
        },
        tw: {
            value: false,
            url: ""
        },
        ld: {
            value: false,
            url: ""
        },
        site: {
            value: false,
            url: ""
        }
    };




    $scope.$on('$viewContentLoaded', function() {
        $http.get('/api/companies/' + $routeParams.profileId)
            .then(function(res) {
                $scope.profile = res.data.data;
                $scope.links = res.data.data.links;
                $scope.checkSocialActive();
            }, function(err) {
                console.log(err);
            });
    });


    $scope.checkSocialActive = function() {
        console.log("check active");
        console.log($scope.links);

        if ($scope.links.facebook && $scope.links.facebook !== "") {
            $scope.active.fb.value = true;
            $scope.active.fb.url = 'https://' + $scope.links.facebook;


        }
        if ($scope.links.twitter && $scope.links.twitter !== "") {
            $scope.active.tw.value = true;
            $scope.active.tw.url = 'https://' + $scope.links.twitter;


        }
        if ($scope.links.linkedin && $scope.links.linkedin !== "") {
            $scope.active.ld.value = true;
            $scope.active.ld.url = 'https://' + $scope.links.linkedin;


        }
        if ($scope.links.official && $scope.links.official !== "") {
            $scope.active.site.value = true;
            $scope.active.site.url = 'https://' + $scope.links.official;

        }


        console.log("active:", $scope.active);
    };

    $scope.getType = function(type){
        if(type ==='Text'){

        }
    };



}]);
