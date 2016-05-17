// 2nd controller of the edit mode with the detail_controller
app.controller('detail_controller', ['$scope', '$compile', 'percentage_service', '$timeout', '$interval', function($scope, $compile, percentage_service) {
    $scope.test = 'test in detail_controller';
    $scope.profile = data;
    $scope.compile_to_node = function(DOM) {
        var jq = $(DOM); // compile the dynamic DOM and 
        var link = $compile(jq); // set the $scope into it
        return link($scope);

    };

    $scope.initial = function() {
        console.log("init");

        $scope.who_u_r = data.who_u_r;
        $scope.what_u_do = data.what_u_do;
        $scope.who_u_r_to_DB = [];
        $scope.what_u_do_to_DB = [];

        percentage_service.calculate(data, percentage_service.percentage);
        //@To do: show the percentage on the page

    };


    //=================== Company info section ====================
    // variable "data" is from the jade
    // variable "country_arr", "s_a" are from location.js
    // function "populateCountries" and "populateCity" are also


    $scope.selectedLocation = data.location;
    $scope.defaultCountry = country_arr;
    $scope.defaultCity = s_a;

    $scope.populateCountries = function populateCountries(countryElementId, stateElementId, selected) {
        // given the id of the <select> tag as function argument, it inserts <option> tags
        console.log(selected)
        var countryElement = document.getElementById(countryElementId);
        countryElement.length = 0;
        countryElement.options[0] = selected ? new Option(selected, selected) : new Option('Select Country', '-1');
        countryElement.selectedIndex = 0;
        for (var i = 0; i < country_arr.length; i++) {
            countryElement.options[countryElement.length] = new Option(country_arr[i], country_arr[i]);
        }

        // Assigned all countries. Now assign event listener for the states.

        if (stateElementId) {
            countryElement.onchange = function() {
                $scope.populateCity(countryElementId, stateElementId);
            };
        }
    };
    $scope.populateCity = function populateCity(countryElementId, stateElementId, selected) {

        var selectedCountryIndex = document.getElementById(countryElementId).selectedIndex;

        var stateElement = document.getElementById(stateElementId);

        stateElement.length = 0; // Fixed by Julian Woods
        stateElement.options[0] = selected ? new Option(selected, selected) : new Option('Select State', '');
        stateElement.selectedIndex = 0;

        var state_arr = s_a[selectedCountryIndex].split("|");

        for (var i = 0; i < state_arr.length; i++) {
            stateElement.options[stateElement.length] = new Option(state_arr[i], state_arr[i]);
        }
    };


    //=================== Company info section ====================



    // generate a <li> contains a section of the input bar including .menu_bar , 
    // .content and .functions_bar
    $scope.genSection = function($event) {
        console.log("genSection");
        var node = $scope.compile_to_node(`<li><div class='input_single'><div class='menu_bar col-md-10'><ul><li><i class='lnr lnr-circle-minus grayscale_dark_cl'></i><a ng-click='hide_menu_bar($event)'>btn</a></li><li><a ng-click='genInput($event,"Text")'>Text</a></li><li><a ng-click='genInput($event,"List")'>List</a></li><li><a ng-click='genInput($event,"Quote")'>Quote</a></li></ul></div></div></li>`);
        $($event.target).siblings("ul").children("li:last-child").after(node);


    };


    // generate the input field in .content according to the type user want
    // lik text, quote or list

    // @Todo: add class to the added DOM
    $scope.genInput = function($event, type) {
        console.log("genInput");
        var node;
        if (type == 'Text' || type == 'Quote') {
            console.log(type);
            node = $scope.compile_to_node("<div class ='content clear_both'><textarea class='" + type + " ng-scope'></textarea><div class='functions_bar'><i class='lnr lnr-move grayscale_dark_cl'></i><i class='lnr lnr-trash grayscale_dark_cl' ng-click='dropSection($event)'></i></div></div>");
            $($event.target).parent().parent().parent().parent().append(node);
            $scope.hide_menu_bar($event);
        } else {
            console.log(type);
            node = $scope.compile_to_node("<div class ='content clear_both'><div class='list_container " + type + " ng-scope' contenteditable='true'><ul><li></li></ul></div><div class='functions_bar'><i class='lnr lnr-move grayscale_dark_cl'></i><i class='lnr lnr-trash grayscale_dark_cl' ng-click='dropSection($event)'></i></div></div>");
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





}]); //end of 2nd controller
