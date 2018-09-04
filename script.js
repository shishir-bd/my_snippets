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


