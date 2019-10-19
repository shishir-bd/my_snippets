//Readonly Select 
    $("select.readonly :selected").each(function(){
        $(this).parent().data("default", this);
    });

    $("select.readonly").change(function(e) {
        $($(this).data("default")).prop("selected", true);
		//alert("SORRY!! \nYou can select access engineer for your department only.");
    });


//Get total from sub-total
var total = 0;
$('.subtotal').each(function () {
	var value = +this.value || 0;
	total += value;            
});                
$('#total').val( total );


//Fire event after select date by datepicker
    $('input.schedule_date').datepicker({
        format: "dd M yyyy",
        startDate: new Date(),
        autoclose: true
    }).on('changeDate',function(e){
        var date = $(this).val();
        var circuit_id = $(this).data('circuit_id');
        if(date){
            var dataset = {'schedule_date':date,'circuit_id':circuit_id};
            $.ajax({
                type: "POST",
                url: base_url + 'pm/set_schedule_date',
                data: dataset,
                success: function(data){
                    //$('.last_pay_date'+link_id).text('').text(date);
					alert('Schedule date has been updated');
                }
            });
        }
    });

//select deslect all checkboxs
$('#globalCheckbox').click(function(){
    if($(this).prop("checked")) {
	$(".checkBox").prop("checked", true);
    } else {
	$(".checkBox").prop("checked", false);
    }                
});


$('.checkBox').click(function(){
    if($(".checkBox").length == $(".checkBox:checked").length) {
	$("#globalCheckbox").prop("checked", true);
    }else {
	$("#globalCheckbox").prop("checked", false);            
    }
});

    function getLoc(id,type,target) {
        $.ajax({
            type: 'POST',
            url: 'ajax_handle.php',
            data:{'id':id,'type':type,'action':'get_dist'},
            beforeSend: function () {
                $('.'+target).html('<option>Loading...</option>');
                $('select.'+target).select2().trigger('change');
            },
            success: function(htmldata)
            {
                $('.'+target).html(htmldata);
                $('select.'+target).select2().trigger('change');
            }
        });
    }




// override jquery validate plugin defaults   
//https://stackoverflow.com/questions/18754020/bootstrap-with-jquery-validation-plugin
https://bootsnipp.com/snippets/XaXnv

$.validator.setDefaults({
    highlight: function(element) {
        $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function(element) {
        $(element).closest('.form-group').removeClass('has-error');
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function(error, element) {
        if(element.parent('.input-group').length) {
            error.insertAfter(element.parent());
        } else {
            error.insertAfter(element);
        }
    }
});

/* jquery validator*/
var form = $("#new_member_reg");
			form.validate({
            rules: {
                "data[full_name]" : {
                    required : true,
                    minlength: 3
                },
                "data[email]" : {
                    required: true,
                    email: true
                },
                "data[rank]" : "required",
                "data[mobile]" : "required",
		    telephone: {
			  required: '#mobile:blank'
		     },
		     mobile: {
			  required: '#telephone:blank'
		     },
		
		"data[deposit]" : {
                    require_from_group: [1, ".amount"],
                    number: true,
                },
                "data[withdraw]" : {
                    require_from_group: [1, ".amount"],
                    
                },
		'data[bank_name]': {
                    required: {
                        depends: function(element){
                            return $(".btn-group input:radio:checked").val() == 'Cheque';
                        }
                    }
                },
            },
            messages: {
                "data[full_name]" : {
                    required : "Please enter your fullname",
                    minlength: "Fullname minimum lenght 3"
                },
                "data[email]" : "Please enter a valid email address",
                "data[rank]" : "Please provide your rank info",
                "data[mobile]" : "Please provide your mobile no"
            },
            //ignore: [],
            //debug: true,    
            highlight: function(element, errorClass, validClass) {
                var elem = $(element);
                if (elem.hasClass("select2-offscreen")) {
                    $("#s2id_" + elem.attr("id") + " ul").addClass(errorClass);
                } else {
                    elem.closest('.form-group').addClass('has-error');
                }

                //$(element).closest('.form-group').addClass('has-error');
            },
            unhighlight: function(element, errorClass, validClass) {
                var elem = $(element);
                if (elem.hasClass("select2-offscreen")) {
                    $("#s2id_" + elem.attr("id") + " ul").removeClass(errorClass);
                } else {
                    elem.closest('.form-group').removeClass('has-error');
                }

                //$(element).closest('.form-group').removeClass('has-error');
            },
            errorElement: 'span',
            errorClass: 'help-block',
            errorPlacement: function(error, element) {
                if(element.parent('.input-group').length) {
                    error.insertAfter(element.parent());
                } else {
                    error.insertAfter(element);
                }
            },

            onfocusout: false,
            invalidHandler: function(form, validator) {
                var errors = validator.numberOfInvalids();
                if (errors) {                    
                    validator.errorList[0].element.focus();
                }
            } 
        });

if (form.valid() == true) {}



<div class="input-group">
    <span class="input-group-addon" title="* Price" id="priceLabel">Price</span>
    <input type="number" id="searchbygenerals_priceFrom" name="searchbygenerals[priceFrom]" required="required" class="form-control" value="0">
    <span class="input-group-addon">-</span>
    <input type="number" id="searchbygenerals_priceTo" name="searchbygenerals[priceTo]" required="required" class="form-control" value="0">
  
    <!-- insert this line -->
    <span class="input-group-addon" style="width:0px; padding-left:0px; padding-right:0px; border:none;"></span>
  
    <select id="searchbygenerals_currency" name="searchbygenerals[currency]" class="form-control">
        <option value="1">HUF</option>
        <option value="2">EUR</option>
    </select>
</div>




var specialChars = "~!@#$%^&*)(\+=._-";
var numaricdisit = "013456789";
var ne =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9~!@#$%^&*)(\+=._-]{1,20}$/;

//var ne = /^(?=.*\d)(?=.*[a-z])(?=.*&[A-Z])[0-9a-zA-Z]{8,}$/;
$(function(){
    $('#change_pass_form').validate({
        rules: {
            old_pass: "required",
            new_pass: "required",
            re_new_pass: {
                equalTo: "#new_pass"
            }
        }
    });

    $('.submit').click(function(e) {
        var password = $('#new_pass').val();
        if ( (password.length < 6) || password.length == 0) {

            alert("Password should be 6 digit or more");
            $("#new_pass").focus();
            return false;
        }else if (!ne.test(password)) {

            if(checkNumaricNumber(password)){
                alert("Numeric number is missing of password string.");
                $("#new_pass").focus();
                return false;
            }else if(checkUpperCase(password)){
                alert("Upper case letter is missing of password string.");
                $("#new_pass").focus();
                return false;
            }else if(checkSpecialChars(password)){
                alert("Special Character is missing of password string.");
                $("#new_pass").focus();
                return false;
            }else if(checkLowerCase(password)){
                alert("Lower case letter is missing of password string.");
                $("#new_pass").focus();
                return false;
            }
        }
    });

});
function checkSpecialChars (string){
    for(i = 0; i < specialChars.length;i++){
        if(string.indexOf(specialChars[i]) > -1){
            return false;
        }
    }
    return true;
}
function checkNumaricNumber (string){
    for(i = 0; i < numaricdisit.length;i++){
        if(string.indexOf(numaricdisit[i]) > -1){
            return false;
        }
    }
    return true;
}

function checkUpperCase(string1){
    if ((string1.replace(/[^A-Z]/g, "").length) == 0) {
        return true;
    }
    return false;
}

function checkLowerCase(string1){
    for(i = 0; i < string1.length;i++){
        var character = string1.charAt(i);
        if(character == character.toLowerCase()){
            return false;
        }
    }
    return true;
}

//check if function is available?
if (typeof uploadFile == 'function') {}
if ($.fn.uploadFile) {}
if ($.fn.classyNav) {$('#newspaperNav').classyNav();}


$(document).on("input", ".numeric", function() {
    this.value = this.value.replace(/\D/g,'');
	//this.value = this.value.match(/^\d+\.?\d{0,2}/);
});


<div class="input-group">
	<div class="form-group">
	    <input type="file" name="excel" class="form-control" id="excel" placeholder="File">
	</div>               
	<div class="input-group-btn">
	    <input type="submit" class="btn btn-primary upload-btn" name="upload" value="Upload">
	</div>
</div>




$(':input','#custom_filter_form')
		  .not(':button, :submit, :reset, :hidden')
		  .val('')
		  .prop('checked', false)
		  .prop('selected', false);


$("#form").trigger('reset');


if (session_status() == PHP_SESSION_NONE) {
    session_start();
}



https://craftpip.github.io/jquery-confirm/

if (in_array(null, $array, true) || in_array('', $array, true)) {
    // There are null (or empty) values.
  }



//notifications
http://ksylvest.github.io/jquery-growl/
https://ned.im/noty/#/
https://codeseven.github.io/toastr/
https://notifyjs.jpillora.com/


//file upload
http://hayageek.com/docs/jquery-upload-file.php
http://blueimp.github.io/jQuery-File-Upload/

//file input button
http://markusslima.github.io/bootstrap-filestyle/options.html

//---------
https://select2.org/

//datepicker
http://t1m0n.name/air-datepicker/docs/
https://www.daterangepicker.com/#usage
https://eonasdan.github.io/bootstrap-datetimepicker/


//============ how Weird u r!
const chaine = 'b' + 'a' + + 'n' + 'a';
console.log(chaine.toLowerCase());

"100"+1
"100"-1

