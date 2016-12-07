$(function(){
	$(".searchInternalForAllUserView").keyup(function(){
		var searchid = $('#searchInternalForAllUserView').val();
		var dataString = 'search='+ searchid; 
		if(searchid !=''){
			$.ajax({
				url:searchInternalForAllUser,
				type: "POST",
				data: dataString,
				cache: false,
				success: function(html){
					$("#problem").html(html).show();
					/*$("#name").append(html.firstName +" "+html.lastName);
					$("#email").append(html.eMail);
					$("#contactNo").append(html.contactNo);*/
					
				}
			});
		}
		else{
			$.ajax({
				url:searchInternalForAllUser,
				type: "POST",
				data: dataString,
				cache: false,
				success: function(html){
					$("#problem").html(html).show();
				}
			});
		}
		return false; 
	});
});