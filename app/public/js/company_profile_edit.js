// I made the three pages of the edit mode into one app and three controllers.
//
// 1st is called profile_edit_app
// 2nd is called detail_controller
// 3rd is called social_media_controller
//
// The contentDirective is used to generate HTML tags in the 2nd page.
// The countrySelect app is used to generate all options of the country select
// in 2nd page
//
// @Todo: 
// 1. Make upload and initial function into a service so it can be used in three 
// controllers.
// 2. Modify DOM in angular, not in jade to reduce the server loading,
//    remove the code in jade to clearify
//     list:
//     # Who_u_r and what_we_do in the view mode
//     # Company culture in the view mode
//     # Determine which part of the menu to show in menu.jade
//     # Use angular to fully replace jQuery , set the sidebar menu initial as
//       a service cause it should be used cross controllers      




var app = angular.module('profile_edit_app', []);

// var app = angular.module('profile_edit_app', ['inputDropdown']);


// This controller is to handle the data for the input
// app.controller('InputDropdownController', [function() {
//     this.selectedDropdownItem = null;
//     this.dropdownItems = [
//         "Afghanistan",
//         "Åland Islands",
//         "Albania",
//         "Algeria",
//         "American Samoa",
//         "Andorra",
//         "Angola",
//         "Anguilla",
//         "Antarctica",
//         "Antigua and Barbuda",
//         "Argentina",
//         "Armenia",
//         "Aruba",
//         "Australia",
//         "Austria",
//         "Azerbaijan",
//         "Bahamas",
//         "Bahrain",
//         "Bangladesh",
//         "Barbados",
//         "Belarus",
//         "Belgium",
//         "Belize",
//         "Benin",
//         "Bermuda",
//         "Bhutan",
//         "Bolivia",
//         "Bonaire, Sint Eustatius and Saba",
//         "Bosnia and Herzegovina",
//         "Botswana",
//         "Bouvet Island",
//         "Brazil",
//         "British Indian Ocean Territory",
//         "Brunei Darussalam",
//         "Bulgaria",
//         "Burkina Faso",
//         "Burundi",
//         "Cambodia",
//         "Cameroon",
//         "Canada",
//         "Cape Verde",
//         "Cayman Islands",
//         "Central African Republic",
//         "Chad",
//         "Chile",
//         "China",
//         "Christmas Island",
//         "Cocos (Keeling) Islands",
//         "Colombia",
//         "Comoros",
//         "Congo",
//         "Congo, The Democratic Republic of the",
//         "Cook Islands",
//         "Costa Rica",
//         "Côte d'Ivoire",
//         "Croatia",
//         "Cuba",
//         "Curaçao",
//         "Cyprus",
//         "Czech Republic",
//         "Denmark",
//         "Djibouti",
//         "Dominica",
//         "Dominican Republic",
//         "Ecuador",
//         "Egypt",
//         "El Salvador",
//         "Equatorial Guinea",
//         "Eritrea",
//         "Estonia",
//         "Ethiopia",
//         "Falkland Islands (Malvinas)",
//         "Faroe Islands",
//         "Fiji",
//         "Finland",
//         "France",
//         "French Guiana",
//         "French Polynesia",
//         "French Southern Territories",
//         "Gabon",
//         "Gambia",
//         "Georgia",
//         "Germany",
//         "Ghana",
//         "Gibraltar",
//         "Greece",
//         "Greenland",
//         "Grenada",
//         "Guadeloupe",
//         "Guam",
//         "Guatemala",
//         "Guernsey",
//         "Guinea",
//         "Guinea-Bissau",
//         "Guyana",
//         "Haiti",
//         "Heard Island and McDonald Islands",
//         "Holy See (Vatican City State)",
//         "Honduras",
//         "Hong Kong",
//         "Hungary",
//         "Iceland",
//         "India",
//         "Indonesia",
//         "Iran, Islamic Republic of",
//         "Iraq",
//         "Ireland",
//         "Isle of Man",
//         "Israel",
//         "Italy",
//         "Jamaica",
//         "Japan",
//         "Jersey",
//         "Jordan",
//         "Kazakhstan",
//         "Kenya",
//         "Kiribati",
//         "Korea, Democratic People's Republic of",
//         "Korea, Republic of",
//         "Kuwait",
//         "Kyrgyzstan",
//         "Lao People's Democratic Republic",
//         "Latvia",
//         "Lebanon",
//         "Lesotho",
//         "Liberia",
//         "Libya",
//         "Liechtenstein",
//         "Lithuania",
//         "Luxembourg",
//         "Macao",
//         "Macedonia, Republic Of",
//         "Madagascar",
//         "Malawi",
//         "Malaysia",
//         "Maldives",
//         "Mali",
//         "Malta",
//         "Marshall Islands",
//         "Martinique",
//         "Mauritania",
//         "Mauritius",
//         "Mayotte",
//         "Mexico",
//         "Micronesia, Federated States of",
//         "Moldova, Republic of",
//         "Monaco",
//         "Mongolia",
//         "Montenegro",
//         "Montserrat",
//         "Morocco",
//         "Mozambique",
//         "Myanmar",
//         "Namibia",
//         "Nauru",
//         "Nepal",
//         "Netherlands",
//         "New Caledonia",
//         "New Zealand",
//         "Nicaragua",
//         "Niger",
//         "Nigeria",
//         "Niue",
//         "Norfolk Island",
//         "Northern Mariana Islands",
//         "Norway",
//         "Oman",
//         "Pakistan",
//         "Palau",
//         "Palestinian Territory, Occupied",
//         "Panama",
//         "Papua New Guinea",
//         "Paraguay",
//         "Peru",
//         "Philippines",
//         "Pitcairn",
//         "Poland",
//         "Portugal",
//         "Puerto Rico",
//         "Qatar",
//         "Reunion",
//         "Romania",
//         "Russian Federation",
//         "Rwanda",
//         "Saint Barthélemy",
//         "Saint Helena, Ascension and Tristan da Cunha",
//         "Saint Kitts and Nevis",
//         "Saint Lucia",
//         "Saint Martin (French Part)",
//         "Saint Pierre and Miquelon",
//         "Saint Vincent and the Grenadines",
//         "Samoa",
//         "San Marino",
//         "Sao Tome and Principe",
//         "Saudi Arabia",
//         "Senegal",
//         "Serbia",
//         "Seychelles",
//         "Sierra Leone",
//         "Singapore",
//         "Sint Maarten (Dutch Part)",
//         "Slovakia",
//         "Slovenia",
//         "Solomon Islands",
//         "Somalia",
//         "South Africa",
//         "South Georgia and the South Sandwich Islands",
//         "South Sudan",
//         "Spain",
//         "Sri Lanka",
//         "Sudan",
//         "Suriname",
//         "Svalbard and Jan Mayen",
//         "Swaziland",
//         "Sweden",
//         "Switzerland",
//         "Syrian Arab Republic",
//         "Taiwan",
//         "Tajikistan",
//         "Tanzania, United Republic of",
//         "Thailand",
//         "Timor-Leste",
//         "Togo",
//         "Tokelau",
//         "Tonga",
//         "Trinidad and Tobago",
//         "Tunisia",
//         "Turkey",
//         "Turkmenistan",
//         "Turks and Caicos Islands",
//         "Tuvalu",
//         "Uganda",
//         "Ukraine",
//         "United Arab Emirates",
//         "United Kingdom",
//         "United States",
//         "United States Minor Outlying Islands",
//         "Uruguay",
//         "Uzbekistan",
//         "Vanuatu",
//         "Venezuela",
//         "Viet Nam",
//         "Virgin Islands, British",
//         "Virgin Islands, U.S.",
//         "Wallis and Futuna",
//         "Western Sahara",
//         "Yemen",
//         "Zambia",
//         "Zimbabwe"
//     ];
// }]);

//====================================================================



// 1st page of the edit mode with profile_edit_controller
app.controller('profile_edit_controller', ['$scope', '$http', function($scope, $http) {
    $scope.test = 'test in profile_edit_controller';
    $scope.res = {};

    // @Todo : Ajax upload using angular

    // $scope.upload = function(formName, btn) {
    //     var formData = new FormData(document.forms.namedItem(formName));

    //     formData.append("CustomField", "This is some extra data");

    //     var request = {
    //         method: 'POST',
    //         url: btn.getAttribute("data-router"),
    //         data: formData,
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     };

    //     $http(request).then(function(response){
    //         $scope.res = response;
    //         console.log(response);
    //         // location.reload();
    //     },function(response){
    //         $scope.res = response;
    //         console.log(response);
    //     });


    //     // var ajax = $http({
    //     //     headers: {
    //     //         'Content-type': 'multipart/form-data'
    //     //     },
    //     //     url: btn.getAttribute("data-router"),
    //     //     method: 'POST',
    //     //     data: formData

    //     // });
    //     // ajax.success(function(data, status) {
    //     //     res = data;
    //     // });

    //     // ajax.error(function(data, status) {
    //     //     res.code = 400;
    //     // });


    // };

    $scope.upload = function(formName, btn) {
        var formData = new FormData(document.forms.namedItem(formName));
        formData.append("CustomField", "This is some extra data");
        var oReq = new XMLHttpRequest();
        oReq.onreadystatechange = function(resp_inside) {

            if (oReq.readyState == 4 && oReq.status == 200) {
                var res = JSON.parse(oReq.response);
                console.log(res.code);
                if (res.code == 200) {
                    console.log("by $scope.upload of the 1st controller", res);
                    $scope.res = res;
                    console.log($scope.res);
                    location.reload(); // To run the Unit test, you have to comment this line

                } else {
                    console.log(oReq.response);
                    // return res.errmsg;
                    $scope.res = res;
                }

            }

        };


        oReq.open("POST", btn.getAttribute("data-router"), true);
        oReq.send(formData);

    };


    $scope.click_the_file_input = function(input) {
        $(input).click();
    };


    $scope.read_url = function(input, panel_selector) {
        console.log("read url");
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $(panel_selector).attr('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    };


}]); // end of the 1st controller

//====================================================================

// New a directive for 2nd page to generate dynamical .content according to the data from DB
app.directive("contentDirective", function($compile) {
    return {
        restrict: 'E',
        replace: true,
        template: "<div class='content'></div>",
        link: function(scope, element, attrs) {
            if (scope.current.type == 'Text' || scope.current.type == 'Quote') {
                var DOM = "<textarea class='" + scope.current.type + "' rows='10',cols='40'>" + scope.current.content + "</textarea><div class='functions_bar'><i class='lnr lnr-move grayscale_dark_cl'></i><i class='lnr lnr-trash grayscale_dark_cl' ng-click='dropSection($event)'></i></div>";
                DOM = $(DOM);
                var link = $compile(DOM);
                var node = link(scope);
                element.append(node);
            } else {
                // @Todo 20160426: set class to this lists
                var ul = "<ul>";
                for (var i = 0; i < scope.current.content.length; i++) {
                    ul += "<li>" + scope.current.content[i] + "</li>";
                }
                ul += "</ul>";
                ul = "<div class='list_container " + scope.current.type + "' contenteditable='true'>" + ul + "</div><div class='functions_bar'><i class='lnr lnr-move grayscale_dark_cl'></i><i class='lnr lnr-trash grayscale_dark_cl' ng-click='dropSection($event)'></i></div>";
                ul = $(ul);
                var link_ul = $compile(ul);
                var node_ul = link_ul(scope);
                element.append(node_ul);
            }
        }
    };
});





// 2nd page of the edit mode with the detail_controller
app.controller('detail_controller', function($scope, $compile) {
    $scope.test = 'test in detail_controller';
    $scope.compile_to_node = function(DOM) {
        var jq = $(DOM); // compile the dynamic DOM and 
        var link = $compile(jq); // set the $scope into it
        return link($scope);

    };

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
        var node = $scope.compile_to_node(`<li><div class='input_single'><div class='menu_bar col-md-10'><ul><li><i class='lnr lnr-circle-minus grayscale_dark_cl'></i><a ng-click='hide_menu_bar($event)'>btn</a></li><li><a ng-click='genInput($event,"Text")'>Text</a></li><li><a ng-click='genInput($event,"List")'>List</a></li><li><a ng-click='genInput($event,"Quote")'>Quote</a></li></ul></div></div></li>`);
        $($event.target).siblings("ul").children("li:last-child").after(node);


    };


    // generate the input field in .content according to the type user want
    // lik text, quote or list

    // @Todo: add class to the added DOM
    $scope.genInput = function($event, type) {
        console.log("genInput");
        if (type == 'Text' || type == 'Quote') {
            console.log(type);
            var node = $scope.compile_to_node("<div class ='content clear_both'><textarea class='" + type + " ng-scope'></textarea><div class='functions_bar'><i class='lnr lnr-move grayscale_dark_cl'></i><i class='lnr lnr-trash grayscale_dark_cl' ng-click='dropSection($event)'></i></div></div>");
            $($event.target).parent().parent().parent().parent().append(node);
            $scope.hide_menu_bar($event);
        } else {
            console.log(type);
            var node = $scope.compile_to_node("<div class ='content clear_both'><div class='list_container " + type + " ng-scope' contenteditable='true'><ul><li></li></ul></div><div class='functions_bar'><i class='lnr lnr-move grayscale_dark_cl'></i><i class='lnr lnr-trash grayscale_dark_cl' ng-click='dropSection($event)'></i></div></div>");
            $($event.target).parent().parent().parent().parent().append(node);
            $scope.hide_menu_bar($event);

        }
    };
    $scope.hide_menu_bar = function($event) {
        $($event.target).parent().parent().parent().fadeOut();
    };

    $scope.dropSection = function($event) {
        console.log("dropSection");
        $($event.target).parent().parent().parent().parent().remove();
    };

    // @To do add draggable


    // Handle the data from none list input
    $scope.pack_non_list = function(value, type, put_in_ary) {
        console.log("non_list");
        if (put_in_ary == 'who') {
            if (type == 't') {
                $scope.who_u_r_to_DB.push({
                    type: "Text",
                    content: value
                });
            } else if (type == 'q') {
                $scope.who_u_r_to_DB.push({
                    type: "Quote",
                    content: value
                });
            }
        } else if (put_in_ary == 'what') {
            if (type == 't') {
                $scope.what_u_do_to_DB.push({
                    type: "Text",
                    content: value
                });
            } else if (type == 'q') {
                $scope.what_u_do_to_DB.push({
                    type: "Quote",
                    content: value
                });
            }
        }
    };

    // Handle the data from list input
    $scope.pack_list = function(li_ary, put_in_ary) {
        console.log("list");
        if (put_in_ary == 'who') {
            $scope.who_u_r_to_DB.push({
                type: "List",
                content: li_ary
            });
        } else if (put_in_ary == 'what') {
            $scope.what_u_do_to_DB.push({
                type: "List",
                content: li_ary
            });
        }

    };

    // Pack them and upload to DB
    $scope.pack_details = function() {

        var ary = angular.element(document).find('#who_u_r ul > li .input_single .content').children().not(".functions_bar");
        // console.log(ary2);
        // console.log(angular.element(ary[0])[0].className);


        for (var i = 0; i < ary.length; i++) {

            if (angular.element(ary[i])[0].className == 'Text ng-scope') {
                $scope.pack_non_list(angular.element(ary[i])[0].value, 't', 'who');
            } else if (angular.element(ary[i])[0].className == 'Quote ng-scope') {
                $scope.pack_non_list(angular.element(ary[i])[0].value, 'q', 'who');
            } else {
                var li_ary = [];
                //pack the value from the <li> to an array
                for (var j = 0; j < angular.element(ary[i])[0].children[0].children.length; j++) {
                    li_ary[j] = angular.element(ary[i])[0].children[0].children[j].innerHTML;
                }
                $scope.pack_list(li_ary, 'who');
            }
        }


        var ary2 = angular.element(document).find('#what_u_do ul > li .input_single .content').children().not(".functions_bar");

        // console.log(ary2);

        for (var k = 0; k < ary2.length; k++) {
            if (angular.element(ary2[k])[0].className == 'Text ng-scope') {
                $scope.pack_non_list(angular.element(ary2[k])[0].value, 't', 'what');
            } else if (angular.element(ary2[k])[0].className == 'Quote ng-scope') {
                $scope.pack_non_list(angular.element(ary2[k])[0].value, 'q', 'what');
            } else {
                var li_ary2 = [];
                //pack the value from the <li> to an array
                for (var l = 0; l < angular.element(ary2[k])[0].children[0].children.length; l++) {
                    li_ary2[l] = angular.element(ary2[k])[0].children[0].children[l].innerHTML;
                }
                $scope.pack_list(li_ary2, 'what');
            }
        }
        // console.log("who u r :", $scope.who_u_r_to_DB);
        // console.log("what u do :", $scope.what_u_do_to_DB);

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
        formData.append("what_u_do", JSON.stringify($scope.what_u_do_to_DB));

        var oReq = new XMLHttpRequest();
        oReq.onreadystatechange = function() {
            if (oReq.readyState == 4 && oReq.status == 200) {
                var res = JSON.parse(oReq.response);
                console.log(res.code);
                if (res.code == 200) {
                    location.reload(); // To run the Unit test, you have to comment this line
                    console.log("by $scope.upload of the 2nd controller", res);
                    return res;
                } else {
                    console.log(oReq.response);
                    return false;
                }
            } else {
                return oReq.response;
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


//====================================================================



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


}); // end of the 3rd controller



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


    // //upload and preview the photo
    // $('.upload_photo_btn').click(function() {
    //     $('#upload_photo').click();
    // });

    // $('#upload_photo').change(function() {
    //     readURL(this, $('#photo'));
    // });

});




function readURL(input, panelSelector) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $(panelSelector).attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
