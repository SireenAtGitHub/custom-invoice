$(document).ready(function(){
    $("#append").click(function(e){
        var text = $("#data_id").html();
        e.preventDefault();
        $(".form-row").append(text);
    });
    jQuery(document).on('click', '.remove_this', function() {
        jQuery(this).parent().prev().prev().remove();
        jQuery(this).parent().prev().remove();
        jQuery(this).parent().remove();
        return false;
    });
});