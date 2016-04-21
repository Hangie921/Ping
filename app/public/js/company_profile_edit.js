
// console.log(profile);

// var app = angular.module("edit_profile",[]);

// app.controller("form_controller",function($scope){
// });


// function changeBtn(btn,content,link){ //  switch the text and the link of a btn

// }
// function showSection(section){ // show the section and hide the rest

// }

var myApp = angular.module('myApp',[]);

myApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

myApp.service('fileUpload',['$http',function($http){
	
}]);













$(document).ready(function(){

	//modify the .focus of the sideBar

	if($("body").hasClass("detail")){
		$('.side_bar .menu a .menu_item').removeClass('focus');
		$('.side_bar .menu a:nth-child(2) .menu_item').addClass('focus');
	}else if($("body").hasClass("social")){
		$('.side_bar .menu a .menu_item').removeClass('focus');
		$('.side_bar .menu a:nth-child(3) .menu_item').addClass('focus');
	}else{
		$('.side_bar .menu a .menu_item').removeClass('focus');
		$('.side_bar .menu a:nth-child(1) .menu_item').addClass('focus');
	}
	var btn = $("#update_btn");
	

	//submit the #company_branding form
	$("#update_btn").click(function(){
		$('#company_branding').submit();
	});

	//addEvent listener 
	$('#company_branding').submit(function(e){
		e.stopPropagation(); // Stop stuff happening
		e.preventDefault();
		var formData = new FormData(document.forms.namedItem("test"));
		
		ajaxUpload(formData,$('#update_btn').attr("data-router"));
	});

	//upload and prewatch the photo
	$('.upload_photo_btn').click(function(){
		$('#upload_photo').click();
	});

	$('#upload_photo').change(function(){
		readURL(this,$('#photo'));
	});

});



// This function upload the data using Ajax,
function ajaxUpload(formData, router) {
    formData.append("CustomField", "This is some extra data");

    var oReq = new XMLHttpRequest();
    oReq.onreadystatechange = function() {
        if (oReq.readyState == 4 && oReq.status == 200) {
            var res = JSON.parse(oReq.response);
            console.log(res.code);
            if (res.code == 200) {
                location.reload();
            } else {
                console.log(oReq.response);
            }
        }
    };
    oReq.open("POST", router, true);
    oReq.send(formData);
}





function readURL(input,panelSelector) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $(panelSelector).attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}