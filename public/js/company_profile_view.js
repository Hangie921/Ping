var app = angular.module('profileViewApp', []);

app.controller('viewCtrl', ['$scope', function($scope) {
    $scope.links= data.links;
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

    $scope.init = function() {
        $scope.checkSocialActive();
    };


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

}]);
