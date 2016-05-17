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



// var app = angular.module('profile_edit_app', []);

var app = angular.module('profile_edit_app', ['dndLists', 'ngSanitize', 'ui.select']);

var app = angular.module('ping',)

















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


