$(document).ready(function() {

	$(".tsc_awb_medium").click(function(e){
		e.preventDefault();	
		$("#response .loadingArea").html("");
		loadPopup();
	});
	
	$("#checkout").click(function(e) {
		e.preventDefault();
		var oid = $("#response #oid").attr("value");
		var iid = $("#response #iid").attr("value");

		$.ajax({
			type: "POST",
			url: "paypal.php",
			data: "o="+oid+"&i="+iid+"&submit=submit",
			success: function(html){
				$("#response .loadingArea").html("");
				$("#response .paypalArea").html("");
				$("#response .paypalArea").html(html);
			}
		});		
	});

});

/* Popups */
var popupStatus = 0;
var clicked = "#response";

function loadPopup(){
	
	if(popupStatus==0){
		$("#backgroundPopup").css({"opacity": "0.7"});
		$("#backgroundPopup").fadeIn("fast",function() {
			$(clicked).fadeIn("slow");
			popupStatus = 1;
		 });
		 $("#backgroundPopup").html("<div style=\"position:absolute; left:50%; top:50%; margin-left:-75px; margin-top:-10px\"><div style=\"padding:5px; text-align:center; font-size:18px; color:#33FFFF\"><img src=\"http://css.vmad-cdn.com/images/loading.gif\" width=\"20\" height=\"20\" align=\"absmiddle\" /> checking...</div></div>");
	}
}

function disablePopup(){

	if(popupStatus==1){
		$(clicked).fadeOut("slow", function() {
			$("#backgroundPopup").fadeOut("fast", function() {
				$(".loadingArea").html("");
				$(".paypalArea").html("");
			});
			popupStatus = 0;
	    });
	}
}