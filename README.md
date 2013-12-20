jQuery ajaxForm 
================================
Makes submitting forms with ajax much easyer, and less code. With build-in light validation.

jsfiddle example:
http://jsfiddle.net/acrashik/akjxM/


bindingForm
================================
$('#id').ajaxForm();


list of options and defaults
================================


**validate: bool**

    default true,
    * switch on/off form validation

**fields: 'selector'**

    default 'input:not(:hidden):not([data-type=optional]),textarea:not(:hidden):not([data-type=optional]),select:not([data-type=optional])'
    * selector for fileds going to be validated


**onValidationError: function**	

    triggered if some fields are not valid


**beforeSubmit: function**	

    function to trigger before submiting from and after validation passed

**onSuccess: function(data)**	

    form submitted, responce data can be used.

**onError: function(data)**	

    failed to submit form with ajax
    
**EXAMPLE**

    $('form').ajaxForm({
        validate: true,
        fields: '.mandatory',
        onSuccess: function(data){
            alert('Form submitted!');
        },
        onValidationError: function(data){
            alert('some fields are not valid');
        },
        onError: function(data){
            alert('oops... something is wrong');
        },
        beforeSubmit: function(){
            alert('you area about to send your data...');
        },
    });    


fields validation markup
================================
If you use default options, here are some attributes:

**Default init**

    $('form').ajaxForm()

**data-type**

    data-type attribute
    <input data-type="optional">

**data-type value**

    'optional' - wont be validated
    'numeric' - numbers only
    'email' - validates input value for email 

in case of no data-type attribute not set validations will still check input for empty value, and will fail if it is empty.
    
**password validation**

    data-match attribute
    
**password markup example**

    <input data-match="1" type="password" name="pass">
    <input data-match="1" type="password" name="pass_repeat">

Simple case
================================    

This form on submit will be submitted with ajax, and only email input will be validated, as soon as fields parameter set to '#email', rest inputs can be blank

**HTML**

    <form action="/save/" method="post">
        <label> Your name
            <input type="text" name="user_name" value=""/>
        </label>
        <label> Email
            <input type="text" name="user_email" id="email" data-type="email" value=""/>
        </label>
        <label> Comment
            <textarea name="user_comment"></textarea>
        </label>        
        <input type="submit" value="Submit">
    </form>

**JS**

    $(document).ready(function(){
        $('#register').ajaxForm({
            fields: '#email',
            onSuccess: function(){
                window.location.reload(true)
            }
        });
    })
