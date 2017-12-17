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

