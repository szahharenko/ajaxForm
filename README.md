jQuery ajaxForm 
================================
Makes submitting forms with ajax much easyer, and less code. With build-in light validation.


bindingForm
================================
$('#id').ajaxForm();


list of options and defaults
================================

validate: bool
//default true, switch on/off form validation

fields: 'selector'
//default 'input:not(:hidden):not([data-type=optional]),textarea:not(:hidden):not([data-type=optional]),select:not([data-type=optional])'
//selector for fileds going to be validated

onValidationError: function
//triggered if some fields are not valid

beforeSubmit: function
//something to trigger before submiting from

onSuccess: function(data) 
//form submitted, data - is server responce

onError: function(data)
//failed to submit form with ajax



fields validation markup
================================
If you use default fields options, here are some tricks:

data-type attribute
//example: <input data-type="optional">

data-type possible values:

	optional - wont be validated
	numeric - numbers only
	email - validates input value for email 
	
data-match attribute
//example: <input data-match="1" type="password">
//value 1 is number of matching set.
//compare same set values to be identical
