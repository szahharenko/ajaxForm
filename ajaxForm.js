/*
 * jQuery ajaxForm Plugin
 * https://github.com/szahharenko/ajaxForm
 * author: Sergei Zahharenko
 * code-essence.eu

 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
**/
jQuery.fn.ajaxForm = function(settings) {
	var form = $(this);
	function formValidate(fields) {
		var match = [],
			errors = false;
		fields.each(function(){
			var i = $(this),
				c = i.is(':checkbox') ? i.is(':checked') : true,
				v = i.val(),
				d = i.data('defval'),
				t = i.data('type'),
				m = i.data('match');
			if (!c || v == d || v == '') {
				markError(i);
				errors = true;
			}
			else if (t == 'email') {
				var em = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
				/* " */
				if (!em.test(v)) {
					markError(i);
					errors = true;
				}
			}
			else if (t == 'numeric') {
				var isnum = /^\d+$/.test(v);
				if (!isnum) {
					markError(i);
					errors = true;
				}
			}
			else if (m) {
				match.push(i)
			}
		});
		if (match.length > 1) { //if passwords should match passwords
			var i1 = $(match[0]),
				i2 = $(match[1]),
				v1 = i1.val(),
				v2 = i2.val();
			if (v1 != v2) {
				errors = true;
				markError(i1);
				markError(i2);
				$(i1).val('').trigger('blur');
				$(i2).val('').trigger('blur');
			}
		}
		return errors;
	}
	function markError(i, cssClass) {
		i = $(i); cssClass = cssClass || 'error';
		i.addClass(cssClass)
		 .bind('focus.err, change.err',function(){
			$(this)
				.unbind('focus.err, change.err')
				.removeClass(cssClass)
				.parent()
				.removeClass(cssClass);
		 })
		 .parent().addClass(cssClass);
	}
	var set = $.extend({
		validate: true,
		fields: 'input:not(:hidden):not([data-type=optional]),textarea:not(:hidden):not([data-type=optional]),select:not([data-type=optional])',
		onSuccess: null,
		onValidationError: null,
		onError: null,
		beforeSubmit: null
	}, settings);
	
	form.submit(function(e){
		e.preventDefault();
		if (form.data('processing')) return false;
		var fields = form.find(set.fields); //fields to be validated
		if (set.validate) {
			if (formValidate(fields)) {
				if (typeof set.onValidationError == 'function') set.onValidationError();
				return false; //Validation
			}
		}
		if (typeof set.beforeSubmit == 'function') set.beforeSubmit();
		form.data('processing',true);
		$.ajax({
			type: form.attr('method') || 'post',
			url:  form.attr('action'),
			data: form.serialize(),
			success: function (data) {
				if (typeof set.onSuccess == 'function') set.onSuccess(data);
				form.data('processing',false);
			},
			error: function(data){
				if (typeof set.onError == 'function') set.onError(data);
				form.data('processing',false);
			}
		});  
	});
}
