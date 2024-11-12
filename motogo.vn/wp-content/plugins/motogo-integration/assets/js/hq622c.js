(function( $ ){    
	$("#pick_up_location").select2();
	$("#return_location").select2();


	$('#same-return').on('change', function(){

		if($('#same-return').is(':checked')){
			$("#return_loc_wrapper").addClass( "disabled");
			getReturnLocations();
		}else{
			
			$("#return_loc_wrapper").removeClass( "disabled" );
			getReturnLocations();
		}

	})

	document.getElementById("booking-form-submit").onclick = function() {
		
    //         $('.pick_up_location_wrapper').removeClass('stm_error');
    //         $('.pick_up_date_wrapper').removeClass('stm_error');
    //         $('.return_location_wrapper').removeClass('stm_error');
    //         $('.return_date_wrapper').removeClass('stm_error');
    //         $('.fill-error').hide();
    
    var pickup_location = $('#pick_up_location').val();
    var return_location = $('#return_location').val();
    var pickup_date_val = $('#hq-pickup-date-input').val();
    var return_date_val = $('#hq-return-date-input').val();
    
    var error = false;
    if (pickup_location == null || pickup_location == 0) {
                // $('.pick_up_location_wrapper').addClass('stm_error');
                // $('.fill-error').show();
                error = true;
            }
            
            if (return_location == null || return_location == 0) {
                // $('.return_location_wrapper').addClass('stm_error');
                // $('.fill-error').show();
                error = true;
            }
            
            if (pickup_date_val == '') {
                // $('.pick_up_date_wrapper').addClass('stm_error');
                // $('.fill-error').show();
                error = true;
            }
    //         if (caag_pickup_time_val == '') {
    //             $('.pick_up_date_wrapper').addClass('stm_error');
    //             $('.fill-error').show();
    //             error = true;
    //         }
    
    if (return_date_val == '') {
                // $('.return_date_wrapper').addClass('stm_error');
                // $('.fill-error').show();
                error = true;
            }
    //         if (caag_return_time_val == '') {
    //             $('.return_date_wrapper').addClass('stm_error');
    //             $('.fill-error').show();
    //             error = true;
    //         }
    if(error == false){
    	document.getElementById("hq-book-form").submit();
    }
    
}



var formatDate = 'd/m/Y H:i';
var d = new Date();
var month = d.getMonth();
var day = d.getDate();
var year = d.getFullYear();
var tomorrow = '+1970/01/02';

    //disable return input to avoid user picking this time first
    $("#hq-return-date-input").prop('disabled', true);

    // Pickup config
    var pickerConfigPickup = {
    	format: formatDate,
    	closeOnDateSelect: false,
    	minDate: tomorrow,
    	defaultDate: tomorrow,
    	onChangeDateTime: function (pickUpDateSelected) {
                    //now enable return input
                    $("#hq-return-date-input").prop('disabled', false);
                    //when we change date in pickup picker, we set the return picker to have this date as minimum
                    $("#hq-return-date-input").datetimepicker({
                    	minDate: pickUpDateSelected
                    });
                },
                validateOnBlur: false,
            };

    // Return config
    var pickerConfigReturn = {
    	defaultSelect: false,
    	format: formatDate,
    	closeOnDateSelect: false,
    	validateOnBlur: false
    };

    // Init datetimepickers
    $('#hq-pickup-date-input').datetimepicker(pickerConfigPickup);
    $('#hq-return-date-input').datetimepicker(pickerConfigReturn);

    // // Custom locations inputs
    // $('select[name="pick_up_location"]').on("change", function() {

    //     if ($(this).val() == 'custom') {
    //         $('#hq-pickup-custom-input').fadeIn();
    //         $('#hq-pickup-custom-input').prop('required',true);
    //     } else {
    //         $('#hq-pickup-custom-input').fadeOut();
    //         $('#hq-pickup-custom-input').prop('required',false);
    //     }

    // });

    // $('select[name="return_location"]').on("change", function() {

    //     if ($(this).val() == 'custom') {
    //         $('#hq-return-custom-input').fadeIn();
    //         $('#hq-return-custom-input').prop('required',true);
    //     } else {
    //         $('#hq-return-custom-input').fadeOut();
    //         $('#hq-return-custom-input').prop('required',false);
    //     }

    // });

    var formActions = [
    {brandId:1,action:'/reservation-motogo'},
    {brandId:2,action:'/reservation-hanoi'},
    // {brandId:3,action:'/reservation-danang'},
    {brandId:3,action:'/reservation-ninhbinh'},
    {brandId:4,action:'/reservation-hue'},
    {brandId:6,action:'/reservation-hagiang'},
    ]

    $('#pick_up_location').on('change', function(){
    	
    	getReturnLocations();

    });


    function getReturnLocations(){
    	var locationOptions = '<option value ="0">Chọn điểm trả xe:</option>';
    	if($('#pick_up_location').val() != 0){
    		var link;
    		var brandId;
    		
    		hq_locations.forEach(function (location){
    			if(location.id == $('#pick_up_location').val()){
    				hq_brands.forEach(function(brand){
    					if(location.brandId == brand.id){
    						brandId = brand.id;
    						formActions.forEach(function(red){
    							if(red.brandId == brandId){
    								link = red.action;
    							}
    						})
    						
    						
    					}
    				})
    			}
    		});
    		
    		hq_locations.forEach(function(loc){
    			if(loc.brandId == brandId){
    				if($('#same-return').is(':checked') == false){
    					locationOptions += '<option value="'+ loc.id+'">'+ loc.name + '</option>'
    				}else{
    					if($('#pick_up_location').val() == loc.id){
    						locationOptions += '<option value="'+ loc.id+'" selected>'+ loc.name + '</option>'
    					}else{
    						locationOptions += '<option value="'+ loc.id+'">'+ loc.name + '</option>'
    					}
    				}

    			}
    		})
    		
    		$('#return_location option').remove();
    		$("#return_location").append(locationOptions);
    		if($('#same-return').is(':checked') == false){
    			$("#return_location").prop( "disabled", false );
    		}
    		$("#hq-book-form").attr("action",link);

    	}else{
    		$('#return_location option').remove();
    		$("#return_location").append(locationOptions);
    		$("#return_location").prop( "disabled", true );
    		$("#hq-book-form").attr("action","#");
    	}
    }

})(jQuery);