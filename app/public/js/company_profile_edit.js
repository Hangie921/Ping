// console.log(profile);

// var app = angular.module("edit_profile",[]);

// app.controller("form_controller",function($scope){
// });


// function changeBtn(btn,content,link){ //  switch the text and the link of a btn

// }
// function showSection(section){ // show the section and hide the rest

// }

var app = angular.module('profile_edit_app', []);



// New a directive for 2nd page to generate dynamical .content according to the data from DB
app.directive("contentDirective", function($compile) {
    return {
        restrict: 'E',
        replace: true,
        template: "<div class='content'></div>",
        link: function(scope, element, attrs) {
            if (scope.current.type == 'Text' || scope.current.type == 'Quote') {
                element.append("<textarea class='" + scope.current.type + "' rows='10',cols='40'>" + scope.current.content + "</textarea>");
            } else {
                // @Todo 20160426: set class to this lists
                var ul = "<ul>";
                for (var i = 0; i < scope.current.content.length; i++) {
                    ul += "<li>" + scope.current.content[i] + "</li>";
                }
                ul += "</ul>";
                ul = "<div class='list_container' contenteditable='true'>" + ul + "</div>";
                ul = $(ul);
                var link = $compile(ul);
                var node = link(scope);
                element.append(node);
            }
        }
    };
});






// 2nd page of the edit mode with the detail_controller
app.controller('detail_controller', function($scope, $compile) {
    $scope.initial = function(doc) {
        $scope.profile = doc;
        $scope.who_u_r = doc.who_u_r;
        $scope.what_u_do = doc.what_u_do;
        $scope.who_u_r_to_DB = [];
        $scope.what_u_do_to_DB = [];
    };

    //=================== Company instro section ====================



    // generate a <li> contains a section of the input bar including .menu_bar , 
    // .content and .functions_bar
    $scope.genSection = function($event) {
        // @Todo: add class to the DOM
        //        add function to the menu btns
        console.log("genSection");
        var sec = $(`<li><div class='input_single'><div class='menu_bar'><ul><li><a ng-click>btn</a></li><li><a ng-click='genInput($event,"Text")'>Text</a></li><li><a ng-click='genInput($event,"List")'>List</a></li><li><a ng-click='genInput($event,"Quote")'>Quote</a></li></ul></div><div class='content'></div><div class='functions_bar'><i class='lnr lnr-move grayscale_dark_cl'></i><i class='lnr lnr-trash grayscale_dark_cl' ng-click='dropSection($event)'></i></div></div></li>`);
        var link = $compile(sec); // compile the dynamic DOM and 
        var node = link($scope); // set the $scope into it
        $($event.target).siblings("ul").children("li:last-child").after(node);


    };


    // generate the input field in .content according to the type user want
    // lik text, quote or list

    // @Todo: add class to the added DOM
    $scope.genInput = function($event, type) {
        console.log("genInput");
        if (type == 'Text' || type == 'Quote') {
            console.log(type);
            $($event.target).parent().parent().parent().siblings(".content").append("<textarea class='" + type + "''></textarea>");
        } else {
            console.log(type);
            $($event.target).parent().parent().parent().siblings(".content").append("<div contenteditable='true'><ul><li></li></ul></div>");
        }
    };


    $scope.dropSection = function($event) {
        console.log("dropSection");
        $($event.target).parent().parent().parent().remove();
    };

    // $scope.moveSection = function() {

    // }


    // Handle the data from none list input
    $scope.pack_non_list = function(value, type) {
        console.log("non_list");
        console.log(value);
        if (type == 't') {
            $scope.who_u_r_to_DB.push({
                type: "Text",
                content: value
            });
        } else {
            $scope.who_u_r_to_DB.push({
                type: "Quote",
                content: value
            });
        }
    };

    // Handle the data from list input
    $scope.pack_list = function(li_ary) {
        console.log("list");
        $scope.who_u_r_to_DB.push({
            type: "List",
            content: li_ary
        });
    };

    // Pack them and upload to DB
    $scope.pack_details = function() {

        var ary = angular.element(document).find('#who_u_r ul > li .input_single .content').children();
        console.log(ary);
        for (var i = 0; i < ary.length; i++) {
            if (angular.element(ary[i])[0].className == 'Text') {
                $scope.pack_non_list(angular.element(ary[i])[0].value, 't');
            } else if (angular.element(ary[i])[0].className == 'Quote') {
                $scope.pack_non_list(angular.element(ary[i])[0].value, 'q');
            } else {
                var li_ary = [];
                //pack the value from the <li> to an array
                for (var j = 0; j < angular.element(ary[i])[0].children[0].children.length; j++) {
                    li_ary[j] = angular.element(ary[i])[0].children[0].children[j].innerHTML;
                }
                $scope.pack_list(li_ary);
            }
        }

        console.log($scope.who_u_r_to_DB);


        $scope.update_to_DB();
    };



    //=================== About the tags section ====================
    $scope.update_tags = function(prop) {

        if (prop == 'culture') {
            $scope.culture = $scope.culture.toLowerCase();
            $scope.profile.culture.push($scope.culture);
            $scope.culture = '';
        } else {
            $scope.technology = $scope.technology.toLowerCase();
            $scope.profile.technology.push($scope.technology);
            $scope.technology = '';
        }
    };


    //=================== Update all the info in the page ===============
    $scope.update_to_DB = function() {
        var formData = new FormData();

        formData.append("CustomField", "This is some example data");
        formData.append("culture", JSON.stringify($scope.profile.culture));
        formData.append("technology", JSON.stringify($scope.profile.technology));
        formData.append("who_u_r", JSON.stringify($scope.who_u_r_to_DB));

        var oReq = new XMLHttpRequest();
        oReq.onreadystatechange = function() {
            if (oReq.readyState == 4 && oReq.status == 200) {
                var res = JSON.parse(oReq.response);
                console.log(res.code);
                if (res.code == 200) {
                    location.reload();
                    // console.log("hi success");
                } else {
                    console.log(oReq.response);
                }
            }
        };
        oReq.open("POST", "/companies/profile/edit", true);
        oReq.send(formData);
    };
    $scope.delete_tags = function(array, index) {
        // splice the tags data from the $scope.profile.culture or 
        // $scope.profile.technology to generate or remove the tag DOM
        // dynamically

        array.splice(index, 1);
    };






}); //end of 2nd controller


// 1st page of the edit mode with profile_edit_controller
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




// 3rd page of the edit mode with the social_media_controller

app.controller('social_media_controller', function($scope) {
    $scope.initial = function(doc) {
        // Only add the .checked when the data from the server exists,
        // the "doc" varaible is the data from server

        $scope.official = {
            show_btn: true,
            data: doc.official ? doc.official : "",
            has_active: doc.official ? true : false,
            data_from_server: doc.official ? true : false
        };
        $scope.facebook = {
            show_btn: true,
            data: doc.facebook ? doc.facebook : "",
            has_active: doc.facebook ? true : false,
            data_from_server: doc.facebook ? true : false
        };
        $scope.linkedin = {
            show_btn: true,
            data: doc.linkedin ? doc.linkedin : "",
            has_active: doc.linkedin ? true : false,
            data_from_server: doc.linkedin ? true : false
        };
        $scope.twitter = {
            show_btn: true,
            data: doc.twitter ? doc.twitter : "",
            has_active: doc.twitter ? true : false,
            data_from_server: doc.twitter ? true : false
        };
        $scope.google = {
            show_btn: true,
            data: doc.google ? doc.google : "",
            has_active: doc.google ? true : false,
            data_from_server: doc.google ? true : false
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
        };
        reader.readAsDataURL(input.files[0]);
    }
}
