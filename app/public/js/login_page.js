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
			if(rdata.code == 200 ){
				location.href = '/dashboard';
			}else{
				console.log(rdata);
				$("#feedback span").empty().append("帳號或密碼錯誤");
			}
			
		}).fail(function(error){
			$("#feedback span").empty().append("帳號或密碼錯誤");
		});
	});

});