
// console.log(profile);

// var app = angular.module("edit_profile",[]);

// app.controller("form_controller",function($scope){
// });


// function changeBtn(btn,content,link){ //  switch the text and the link of a btn

// }
// function showSection(section){ // show the section and hide the rest

// }

$(document).ready(function(){
	$("#update_btn").click(function(e){
		e.preventDefault();

		$.ajax({
			type:'POST',
			url:$(this).attr("data-router"),
			data:{
				name:$('#profile_name').val(),
				tagline:$('#profile_tagline').val()
			},
			dataType:'json'
		}).done(function(rdata){
			console.log("done");
			// location.href=$(this).attr("href");
		}).fail(function(error){
			alert('failed');
		});
	});
});