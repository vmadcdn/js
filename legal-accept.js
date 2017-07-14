"use strict";

/**
 * Used for legal accepting of terms, primarily in tassadar.
 */
var LegalAccept = {

	/**
	 * Initialize a legal acception process.
	 */
	initialize: function() {
		$('.legal-wrapper').each(function() {
			var container = $(this);
			var document = container.find('.legal-document');
			var checkbox = container.find('.legal-checkbox');
			var label = container.find('.legal-accept');

			if(checkbox.length > 0){
				// Add binds
				checkbox.click(function() {
					LegalAccept.accept(checkbox, label);
				});

				document.scroll(function() {
					LegalAccept.scroll(document, checkbox, label);
				});

				// Set defaults
				document.prop('scrollTop', 0);
				checkbox.prop('checked', false);
				
				// Checking
				var scrollRequired = (container.find(".must-scroll").length > 0);

				if (((document.innerHeight() >= document.prop('scrollHeight')) && document.is(":visible")) || !scrollRequired) {
					checkbox.removeAttr('disabled');
					label.removeClass('unaccepted');
				}
			}
		});
    },

	/**
	 * Accept the terms (checkbox clicked) and enable the button.
	 *
	 * @param object checkbox
	 * @param object label
	 */
	accept: function(checkbox, label) {
		var button = $('#legal-submit');

		if (checkbox.is(':checked')) {
			label.addClass('accepted');
		} else {
			label.removeClass('accepted');
		}

		if (LegalAccept.validate()) {
			button.removeClass('disabled').removeAttr('disabled');
		} else {
			button.addClass('disabled').attr('disabled', 'disabled');
		}

		return false;
	},

	/**
	 * Check the document scroll when the client scrolls to the bottom.
	 *
	 * @param object node
	 * @param object checkbox
	 * @param object label
	 */
    scroll: function(node, checkbox, label) {
        if (node.prop('scrollTop') >= (node.prop('scrollHeight') - node.prop('offsetHeight'))) {
            checkbox.removeAttr('disabled');
			label.removeClass('unaccepted');
		}
    },

	/**
	 * Validate that all checkboxes have been checked.
	 */
    validate: function() {
		var checkboxes = $('#legal-form input.legal-checkbox');

		//$("#flagTou").val("0");

		for (var i = 0, length = checkboxes.length; i < length; i++) {
			if (!checkboxes[i].checked){
                return false;
            }
		}

		//$("#flagTou").val("1");
		return true;
    }

};
