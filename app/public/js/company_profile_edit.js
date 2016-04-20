
// console.log(profile);

// var app = angular.module("edit_profile",[]);

// app.controller("form_controller",function($scope){
// });


// function changeBtn(btn,content,link){ //  switch the text and the link of a btn

// }
// function showSection(section){ // show the section and hide the rest

// }

function readURL(input,panelSelector) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $(panelSelector).attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}

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
		// console.log($(this).serialize());
		// var formData = new FormData($('#company_branding'));
	 	// var oOutput = document.getElementById("output");
		var formData = new FormData(document.forms.namedItem("test"));
		
		ajaxUpload(formData,$('#update_btn').attr("data-router"));
		// $.ajax({
	 //        url: $('#update_btn').attr("data-router"),  //Server script to process data
	 //        type: 'POST',
	 //        data: formData,
	 //        dataType:'json',
	 //        //Options to tell jQuery not to process data or worry about content-type.
	 //        contentType: false,    //"application/json",
	 //        processData: false

	 //    }).done(function(rdata){
		// 	alert("done");
		// 	location.reload();
		// }).fail(function(error){
		// 	console.log(error);
		// });

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
function ajaxUpload(formData,router){
	formData.append("CustomField", "This is some extra data");
	
	var oReq = new XMLHttpRequest();
	oReq.open("POST", router, true);
	oReq.onload = function(oEvent) {
		if (oReq.status == 200) {
				alert('200!');
		} else {
			alert("Error " + oReq.status + " occurred uploading your file.<br \/>");
		}
	};
	oReq.send(formData);
}