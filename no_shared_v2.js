
$(document).ready(function() {
    var root = "http://vmad.cc/";
    var buttons = $('.blockchain-btn');

    buttons.find('.blockchain').hide();
    buttons.find('.stage-begin').trigger('show').show();

    buttons.each(function(index) {
        var _button = $(this);

        (function() {
            var button = _button;

            button.click(function() {
                var create_url = $(this).data('create-url');

                button.find('.blockchain').hide();

                button.find('.stage-loading').trigger('show').show();

                $.ajax({
                    type: "GET",
                    dataType: 'json',
                    url: create_url,
                    success: function(response) {

                        button.find('.blockchain').hide();

                        if (!response || !response.address) {
                            button.find('.stage-error').trigger('show').show().html(button.find('.stage-error').html().replace('[[error]]', 'Unknown Error'));
                            return;
                        }

                        function checkBalance() {
                            $.ajax({
                                type: "GET",
								url: root + 'check_btc_bal.php?address='+response.address,
                                success: function(response) {
                                    if (!response) return;

                                    var value = parseInt(response);

                                    if (value > 0) {
                                        button.find('.blockchain').hide();
                                        button.find('.stage-paid').trigger('show').show().html(button.find('.stage-paid').html().replace('[[value]]', value / 100000000));
                                    } else {
                                        setTimeout(checkBalance, 5000);
                                    }
                                }
                            });
                        }

                        button.find('.stage-ready').trigger('show').show().html(button.find('.stage-ready').html().replace('[[address]]', response.address));

                        button.unbind();

                        ///Check for incoming payment
                        setTimeout(checkBalance, 5000);
                    },
                    error : function(e) {
                        button.find('.blockchain').hide();

                        button.find('.stage-error').show().trigger('show').html(button.find('.stage-error').html().replace('[[error]]', e.responseText));
                    }
                });
            });
        })();
    });
});