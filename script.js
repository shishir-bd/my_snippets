var total = 0;
$('.subtotal').each(function () {
	var value = +this.value || 0;
	total += value;            
});                
$('#total').val( total );