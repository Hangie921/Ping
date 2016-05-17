// 3rd controller of the edit mode with the social_media_controller

app.controller('social_media_controller', ['$scope', 'percentage_service', function($scope, percentage_service) {
    // variable data is called in the company_profile_edit_social.jade

    $scope.initial = function(data_link) {
        // Only add the .checked when the data from the server exists,
        // the "doc" varaible is the data from server
        if (data_link) {
            $scope.official = {
                show_btn: true,
                data: data_link.official ? data_link.official : "",
                has_active: data_link.official ? true : false,
                data_from_server: data_link.official ? true : false
            };
            $scope.facebook = {
                show_btn: true,
                data: data_link.facebook ? data_link.facebook : "",
                has_active: data_link.facebook ? true : false,
                data_from_server: data_link.facebook ? true : false
            };
            $scope.linkedin = {
                show_btn: true,
                data: data_link.linkedin ? data_link.linkedin : "",
                has_active: data_link.linkedin ? true : false,
                data_from_server: data_link.linkedin ? true : false
            };
            $scope.twitter = {
                show_btn: true,
                data: data_link.twitter ? data_link.twitter : "",
                has_active: data_link.twitter ? true : false,
                data_from_server: data_link.twitter ? true : false
            };
            $scope.google = {
                show_btn: true,
                data: data_link.google ? data_link.google : "",
                has_active: data_link.google ? true : false,
                data_from_server: data_link.google ? true : false
            };
        } else {
            $scope.facebook = {
                show_btn: true,
                data: "",
                has_active: false,
                data_from_server: false
            };
            $scope.linkedin = {
                show_btn: true,
                data: "",
                has_active: false,
                data_from_server: false
            };
            $scope.twitter = {
                show_btn: true,
                data: "",
                has_active: false,
                data_from_server: false
            };
            $scope.google = {
                show_btn: true,
                data: "",
                has_active: false,
                data_from_server: false
            };
            $scope.official = {
                show_btn: true,
                data: "",
                has_active: false,
                data_from_server: false
            };
        }

        //Calculate the percentage using percentage_service
        percentage_service.calculate(data, percentage_service.percentage);
        //@To do: show the percentage on the page
    };
    //variables

    $scope.check_active = function(btn) {
        // To add "active" class to the btn if btn.data has value.
        btn.has_active = (btn.data !== undefined && btn.data) ? true : false;
    };


    $scope.container_click = function() {
        console.log("container_click");
        $scope.official.show_btn = true;
        $scope.facebook.show_btn = true;
        $scope.linkedin.show_btn = true;
        $scope.twitter.show_btn = true;
        $scope.google.show_btn = true;


        $scope.check_active($scope.official);
        $scope.check_active($scope.facebook);
        $scope.check_active($scope.linkedin);
        $scope.check_active($scope.twitter);
        $scope.check_active($scope.google);

    };
    $scope.btn_click = function(name) {
        console.log("btn_click");
        $scope.switch(name);
        // $scope.switch(name);
    };
    $scope.switch = function(name) {
        console.log("in switch");
        switch (name) {
            case 'official':
                if ($scope.official.show_btn) {
                    $scope.official.show_btn = false;
                } else {
                    $scope.official.show_btn = true;
                }

                break;

            case 'facebook':
                if ($scope.facebook.show_btn) {
                    $scope.facebook.show_btn = false;
                } else {
                    $scope.facebook.show_btn = true;
                }
                break;

            case 'linkedin':
                if ($scope.linkedin.show_btn) {
                    $scope.linkedin.show_btn = false;
                } else {
                    $scope.linkedin.show_btn = true;
                }
                break;

            case 'twitter':
                if ($scope.twitter.show_btn) {
                    $scope.twitter.show_btn = false;
                } else {
                    $scope.twitter.show_btn = true;
                }
                break;

            case 'google':
                if ($scope.google.show_btn) {
                    $scope.google.show_btn = false;
                } else {
                    $scope.google.show_btn = true;
                }
                break;
        } // end of switch
    }; //end of switch()


    $scope.upload = function(formName, event) {
        var btn = event.currentTarget;
        var formData = new FormData(document.forms.namedItem(formName));

        formData.append("CustomField", "This is some extra data");
        formData.append("links", JSON.stringify({
            official: $scope.official.data,
            facebook: $scope.facebook.data,
            linkedin: $scope.linkedin.data,
            twitter: $scope.twitter.data,
            google: $scope.google.data,
        }));

        var oReq = new XMLHttpRequest();
        oReq.onreadystatechange = function() {
            if (oReq.readyState == 4 && oReq.status == 200) {
                var res = JSON.parse(oReq.response);
                console.log(res.code);
                if (res.code == 200) {
                    location.reload(); // To run the Unit test, you have to comment this line
                    console.log("by $scope.upload of the 3rd controller", res);
                    return res;
                } else {
                    console.log(oReq.response);
                    return false;
                }
            } else {
                return oReq.response;
            }
        };
        oReq.open("POST", btn.getAttribute("data-router"), true);
        oReq.send(formData);

    };


}]); // end of the 3rd controller