// console.log(profile);

// var app = angular.module("edit_profile",[]);

// app.controller("form_controller",function($scope){
// });


// function changeBtn(btn,content,link){ //  switch the text and the link of a btn

// }
// function showSection(section){ // show the section and hide the rest

// }

var app = angular.module('profile_edit_app', []);

//First page of the edit mode with profile_edit_controller
app.controller('profile_edit_controller', function($scope) {
    
    $scope.upload = function(formName, btn) {
        var formData = new FormData(document.forms.namedItem(formName));

        formData.append("CustomField", "This is some extra data");

        var oReq = new XMLHttpRequest();
        oReq.onreadystatechange = function() {
            if (oReq.readyState == 4 && oReq.status == 200) {
                var res = JSON.parse(oReq.response);
                console.log(res.code);
                if (res.code == 200) {
                    location.reload();
                    // console.log(res.code);
                } else {
                    console.log(oReq.response);
                }
            }
        };
        oReq.open("POST", btn.getAttribute("data-router"), true);
        oReq.send(formData);

    };
});





// Third page of the edit mode with the social_media_controller

app.controller('social_media_controller', function($scope) {
    $scope.initial = function(doc) {
        // Only add the .checked when the data from the server exists,
        // the "doc" varaible is the data from server

        $scope.official = {
            show_btn: true,
            data: doc.official ? doc.official : "",
            has_active: doc.official ? true : false,
            data_from_server: doc.official ? true :false
        };
        $scope.facebook = {
            show_btn: true,
            data: doc.facebook ? doc.facebook : "",
            has_active: doc.facebook ? true : false,
            data_from_server: doc.facebook ? true :false
        };
        $scope.linkedin = {
            show_btn: true,
            data: doc.linkedin ? doc.linkedin : "",
            has_active: doc.linkedin ? true : false,
            data_from_server: doc.linkedin ? true :false 
        };
        $scope.twitter = {
            show_btn: true,
            data: doc.twitter ? doc.twitter : "",
            has_active: doc.twitter ? true : false,
            data_from_server: doc.twitter ? true :false
        };
        $scope.google = {
            show_btn: true,
            data: doc.google ? doc.google : "",
            has_active: doc.google ? true : false,
            data_from_server: doc.google ? true :false
        };


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


    $scope.upload = function(formName, btn) {

        var formData = new FormData(document.forms.namedItem(formName));

        formData.append("CustomField", "This is some extra data");
        formData.append("links",JSON.stringify({
            official:$scope.official.data,
            facebook:$scope.facebook.data,
            linkedin:$scope.linkedin.data,
            twitter:$scope.twitter.data,
            google:$scope.google.data,
        }));

        var oReq = new XMLHttpRequest();
        oReq.onreadystatechange = function() {
            if (oReq.readyState == 4 && oReq.status == 200) {
                var res = JSON.parse(oReq.response);
                console.log(res.code);
                if (res.code == 200) {
                    location.reload();
                    // console.log(res.code);
                } else {
                    console.log(oReq.response);
                }
            }
        };
        oReq.open("POST", btn.getAttribute("data-router"), true);
        oReq.send(formData);

    };


});



//========================= Above is Angular =================





//======================= Following is jQuery ==============

$(document).ready(function() {

    //modify the .focus of the sideBar

    if ($("body").hasClass("detail")) {
        $('.side_bar .menu .menu_item ').removeClass('focus');
        $('.side_bar .menu .menu_item:nth-child(2)').addClass('focus');
    } else if ($("body").hasClass("social")) {
        $('.side_bar .menu .menu_item ').removeClass('focus');
        $('.side_bar .menu .menu_item:nth-child(3)').addClass('focus');
    } else {
        $('.side_bar .menu .menu_item ').removeClass('focus');
        $('.side_bar .menu .menu_item:nth-child(1)').addClass('focus');
    }
    var btn = $("#update_btn_first");


    //upload and prewatch the photo
    $('.upload_photo_btn').click(function() {
        $('#upload_photo').click();
    });

    $('#upload_photo').change(function() {
        readURL(this, $('#photo'));
    });

});



// This function upload the data using Ajax,



function readURL(input, panelSelector) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $(panelSelector).attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
