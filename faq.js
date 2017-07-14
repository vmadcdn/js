$(function(){
		
	$('.faqs_content ul li div.top_row').click(function(){
		if(!$(this).next('.detail_box').is(':visible')){
			$('.faqs_content ul li div.top_row').removeClass('active');
			$('.faqs_content ul li div.detail_box').slideUp();
			$(this).next('.detail_box').slideDown();
			$(this).addClass('active');
			}else{
				$('.faqs_content ul li div.top_row').removeClass('active');
			    $('.faqs_content ul li div.detail_box').slideUp();
				}
				return false;
		})	
		
});
