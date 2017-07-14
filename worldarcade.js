$(document).ready(function() {

	$(".buttonPopup").click(function(e){

		e.preventDefault();
		clicked = "#"+$(this).attr("href");
		
		centerPopup();
		loadPopup();
		
	});

	$(".buttonPopupClose").click(function(e){
		e.preventDefault();
		disablePopup();
	});

	
	$(".textBox, .textArea").click(function(){
		if($(this).attr("value") == $(this).attr("name")) {
			$(this).attr("value","");
		}
	});

	$("#sendContact").click(function(e) {
		e.preventDefault();
		$("#popupContact .loadingArea").html("<img src=\"http://img.vmad-cdn.com/ajax-loader-orange.gif\"/>");
		
		var target = $("#popupContact #ContactTargetText").attr("value");
		var message = $("#popupContact #ContactMessageText").attr("value");
		var category = $("#popupContact #ContactCategoryText").attr("value");
		var seccode = $("#popupContact #ContactSecCode").attr("value");
		
		$.ajax({
			type: "POST",
			url: "sendEMail.php",
			data: "target="+target+"&category="+category+"&message="+message+"&security_code="+seccode+"&submit=submit",
			success: function(html){
				
				$("#popupContact .loadingArea").html("");
				$("#popupContact .messageArea").html("");
				$("#popupContact .messageArea").html(html);
				
			}
		});
			
		$('#captcha_image').attr('src', $('#captcha_image').attr('src')+'#');
		
	});

});

/* Popups */
var popupStatus = 0;
var clicked = "#popupContact";

function loadPopup(){
	
	if(popupStatus==0){
		
		$('#spaceAd').hide();
		
		$("#backgroundPopup").css({"opacity": "0.7"});
		$("#backgroundPopup").fadeIn("fast",function() {
			$(clicked).fadeIn("slow");
			popupStatus = 1;
		 });
		
		
	}
}

function disablePopup(){

	if(popupStatus==1){
		$(clicked).fadeOut("slow", function() {
			$("#backgroundPopup").fadeOut("fast", function() {
				$(".loadingArea").html("");
				$(".messageArea").html("");
				$('#spaceAd').show();
			});
			popupStatus = 0;
	    });
}
	
}

function centerPopup(){
	
	//request data for centering
	var windowWidth = document.documentElement.clientWidth;
	var windowHeight = document.documentElement.clientHeight;
	var popupHeight = $(clicked).height();
	var popupWidth = $(clicked).width();
	//centering
	$(clicked).css({
		"position": "absolute",
		"top": windowHeight/2-popupHeight/2,
		"left": windowWidth/2-popupWidth/2
	});
	
	$("#backgroundPopup").css({
		"height": windowHeight
	});

}