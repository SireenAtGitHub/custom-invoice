$(document).ready(function(){
    $("#append").click(function(e){
        var elms = document.querySelectorAll("[id='item']");
        if(elms.length > 23){
            alert("You can not add more than 25 items.");
            return false;
        }
        var text = $("#data_id").html();
        e.preventDefault();
        $(".form-row").append(text);
        var elms = document.querySelectorAll("[id='item_label']");
            for(var i=0; i<elms.length; i++) {
                elms[i].childNodes[0].nodeValue = (i + 2) + ". Item Name";
            }
    });
    jQuery(document).on('click', '.remove_this', function() {
        jQuery(this).parent().prev().prev().remove();
        jQuery(this).parent().prev().remove();
        jQuery(this).parent().remove();
        var elms = document.querySelectorAll("[id='item_label']");
            for(var i=0; i<elms.length; i++) {
                elms[i].childNodes[0].nodeValue = (i + 2) + ". Item Name";
            }
        return false;
    });
});