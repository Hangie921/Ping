$(document).ready(function(){

	$('#login_btn').click(function(e){
		e.preventDefault();
		$.ajax({
			type:'POST',
			url:'/login',
			data:{
				mem_acc:$('#mem_acc').val(),
				mem_pwd:$('#mem_pwd').val()
			},
			dataType:'json'
		}).done(function(rdata){
			location.href='/dashboard';
		}).fail(function(error){
			alert("failed!");
		});
	});

});