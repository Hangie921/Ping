
// console.log(profile);

// var app = angular.module("edit_profile",[]);

// app.controller("form_controller",function($scope){
// });


// function changeBtn(btn,content,link){ //  switch the text and the link of a btn

// }
// function showSection(section){ // show the section and hide the rest

// }

$(document).ready(function(){
	var btn = $("#update_btn");
	$("#update_btn").click(function(e){

		e.preventDefault();
		$.ajax({
			type:'POST',
			url:$(this).attr("data-router"),
			data:{
				username:$('#profile_name').val(),
				tagline:$('#profile_tagline').val()
			},
			dataType:'json'
		}).done(function(rdata){
			alert("done");
			location.reload();
		}).fail(function(error){
			console.log('failed');
		});
	});
});