var reportID_arr = [];
var ins2 = 0;
var ins3 = 0;
var checks1 = 0;
function show_users(bookID){
	$.ajax({
		type:"POST",
		url:show_users_for_book_view,
		data:{bookID:bookID},
		dataType: "JSON",
		success:function(data){
			
		}
	});
}
function show_pages(bookID){
	
}
function show_reports(bookID){
	//alert("hello");
	//window.bookID = bookIDs;
	var myModal = $('#extraFeatures');
	$.ajax({
		type:"POST",
		url:show_reports_for_book_view,
		data:{bookID:bookID},
		dataType:"JSON",
		success:function(data){
			var count = Object.keys(data).length;
			if(count != '0'){
				for(i = 0; i<count; i++){
					reportID_arr[i] = data[i].reportID;
				}
				$('#allUsersReportForBookView').modal('show');
				$("#allUsersReportForBookView").on("hidden.bs.modal", function(){
					location.reload();
				});
			}
			else{
				//alert("no reports");
				myModal.find('.modal-body').text('No Reports for this User');
				myModal.find('.modal-title').text('Reports');
				myModal.modal('show');
			}
			report_prevs();
		}
	});
}
$(document).ready(function(){
	$( "#userAllPrev_image" ).click(function(){
		userAllPrevss();
	});
	$( "#userAllNext_image" ).click(function(){
		userAllNextss();
	});
	$('#report_prevs_image').click(function(){
		report_prevs();
	});
	$('#report_nexts_image').click(function(){
		report_nexts();
	});
});
function report_prevs(){
	if(ins2 != 0){
		$('.detailsForReports').show();
		$.ajax({
			type:"POST",
			url:return_all_reportsID_info,
			data:{reportID: reportID_arr[ins2]},
			dataType:"JSON",
			success: function(data){
				window.reportedBookID = data.bookID;
				window.reportedBookName = data.bookName;
				window.reportIDs = data.reportID;
				$('#bookNamess').text(data.bookName);
				$('#authorNamess').text(data.authorName);
				$('#categorys').text(data.category);
				$('#reporterName').text(data.firstName+" "+data.lastName);
				$('#reportTxt').text(data.reports);
				if(!data.coverImg){
					$( '#imgTestReports' ).attr( 'src' , defaultBookImage);
				}
				else{
					$( '#imgTestReports' ).attr( 'src' , BookImage+"/"+ data.coverImg);
				}
			}
		});
		ins3 = ins2 + 1;
		ins2 = ins2 - 1;
		$('#report_nexts_image').prop('disabled', false);
	}
	else{
		if(checks1 == 1){
			$('.detailsForReports').show();
			$.ajax({
				type:"POST",
				url:return_all_reportsID_info,
				data:{reportID: reportID_arr[ins2]},
				dataType:"JSON",
				success: function(data){
					window.reportedBookID = data.bookID;
					window.reportedBookName = data.bookName;
					window.reportIDs = data.reportID;
					$('#bookNamess').text(data.bookName);
					$('#authorNamess').text(data.authorName);
					$('#categorys').text(data.category);
					$('#reporterName').text(data.firstName+" "+data.lastName);
					$('#reportTxt').text(data.reports);
					if(!data.coverImg){
						$( '#imgTestReports' ).attr( 'src' , defaultBookImage);
					}
					else{
						$( '#imgTestReports' ).attr( 'src' , BookImage+"/"+ data.coverImg);
					}
				}
			});
			ins3 = 1;
			ins2 = 0;
			checks1 = 0;
		}
		else{
			ins3 = 0;
			ins2 = 0;
			checks1 = 0;
			$('#bookNamess').text(" ");
			$('#authorNamess').text(" ");
			$('#reporterName').text(" ");
			$('#categorys').text(" ");
			$('#reportTxt').text(" ");
			$('#report_prevs_image').prop('disabled', true);
			$('#report_nexts_image').prop('disabled', false);
			$('.detailsForReports').hide();
			$('#imgTestReports').attr( 'src', startImage);
		}
	}
	$.ajax({
		type:"POST",
		url:isAccepted_in_report_table,
		data:{reportID:window.reportIDs},
		dataType: "JSON",
		success: function(data){
		},
		error: function (jqXHR, textStatus, errorThrown){
			alert("Error ");
		}
	});
}
function report_nexts(){
	checks1 = 1;
	if(reportID_arr.length > ins3){
		$('.detailsForReports').show();
		if(ins3 == 0){
			$('#report_prevs_image').prop('disabled', false);
			$.ajax({
				type:"POST",
				url:return_all_reportsID_info,
				data:{reportID: reportID_arr[ins3]},
				dataType:"JSON",
				success: function(data){
					window.reportedBookID = data.bookID;
					window.reportedBookName = data.bookName;
					window.reportIDs = data.reportID;
					$('#bookNamess').text(data.bookName);
					$('#authorNamess').text(data.authorName);
					$('#categorys').text(data.category);
					$('#reporterName').text(data.firstName+" "+data.lastName);
					$('#reportTxt').text(data.reports);
					if(!data.coverImg){
						$( '#imgTestReports' ).attr( 'src' , defaultBookImage);
					}
					else{
						$( '#imgTestReports' ).attr( 'src' , BookImage+"/"+ data.coverImg);
					}
				}
			});
			ins3 = ins3 + 1;
			ins2 = 0;
			checks1 = 0;
		}
		else{
			$('.detailsForReports').show();
			$('#report_prevs_image').prop('disabled', false);
			$.ajax({
				type:"POST",
				url:return_all_reportsID_info,
				data:{reportID: reportID_arr[ins3]},
				dataType:"JSON",
				success: function(data){
					window.reportedBookID = data.bookID;
					window.reportedBookName = data.bookName;
					window.reportIDs = data.reportID;
					$('#bookNamess').text(data.bookName);
					$('#authorNamess').text(data.authorName);
					$('#categorys').text(data.category);
					$('#reporterName').text(data.firstName+" "+data.lastName);
					$('#reportTxt').text(data.reports);
					if(!data.coverImg){
						$( '#imgTestReports' ).attr( 'src' , defaultBookImage);
					}
					else{
						$( '#imgTestReports' ).attr( 'src' , BookImage+"/"+ data.coverImg);
					}
				}
			});
			ins2 = ins3 - 1;
			ins3 = ins3 + 1;
		}
	}
	else{
		$('#bookNamess').text(" ");
		$('#authorNamess').text(" ");
		$('#reporterName').text(" ");
		$('#categorys').text(" ");
		$('#reportTxt').text(" ");
		$('#report_nexts_image').prop('disabled', true);
		$('.detailsForReports').hide();
		$('#imgTestReports').attr( 'src', endImage);
		ins2 =  reportID_arr.length - 1;
	}
	$.ajax({
		type:"POST",
		url:isAccepted_in_report_table,
		data:{reportID:window.reportIDs},
		dataType: "JSON",
		success: function(data){
			//alert("update");
		},
		error: function (jqXHR, textStatus, errorThrown){
			alert("Error ");
		}
	});
}
function sendMessageForAllUser_view(){
	var myModals = $('#extraFeatures');
	$.ajax({
		type:"POST",
		url:check_in_msg_table,
		data:{receiverID:window.userID, bookID:window.reportedBookID},
		dataType:"JSON",
		success: function(data){
			var count = Object.keys(data).length;
			if(count == '0'){
				$('#msgModal').modal('show');
				myModals.modal('hide');
				/*$("#msgModal").on("hidden.bs.modal", function(){
					location.reload();
				});*/
			}
			else{
				//alert("message already sent");
				 
				myModals.find('.modal-body').text('Message is already sent');
				myModals.find('.modal-title').text('Message');
				myModals.modal('show');
			}
		}
	});
}
function sendMsg(){
	var msgTopics = document.getElementById('msgTxt').value;
	var msgSubject = "Message for "+window.reportedBookName+" Book--> "+msgTopics;
	$.ajax({
		type:"POST",
		url:send_messages,
		data:{receiverID:window.userID, msgTopic:msgSubject, msgBookID:window.reportedBookID},
		dataType:"JSON",
		success: function(data){
			if(data.status){
				alert("message send");
				$('#msgModal').modal('hide');
			}
			else{
				alert("problem");
			}
		}
	});
}