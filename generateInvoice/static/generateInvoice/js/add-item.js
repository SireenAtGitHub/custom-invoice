$(document).ready(function () {
    $("#append").click(function (e) {
        e.preventDefault();
        var elms = document.querySelectorAll("[id='item']");
        if (elms.length > 23) {
            alert("You can not add more than 25 items.");
            return false;
        }
        var text = $("#data_id").html();
        $("#itemRows").append(text);
        rearrangeSR();
    });
    function rearrangeSR(){
        var elms = document.querySelectorAll(".itemSR");
        for (var i = 1; i < elms.length; i++) {
            elms[i].childNodes[0].nodeValue = "Item " + (i + 1) + ".";
        }
    }

    $(document).on("keyup","input[name='price']",function(e){
        if(e.target.value !== ''){
            e.target.classList.add('alignRight')
        }else{
            e.target.classList.remove('alignRight')
        }
        calcTotal();
    });
    
    function calcTotal(){
        let total = 0;
        $("input[name='price']").each(function (e) {
            if(this.value !== ''){
                total += parseInt(this.value);
            }
        });
        $('#total').text(total);
    }

    // $("#c_total").click(function (e) {
    //     var elms = document.querySelectorAll("[name='price']");
    //     var total = 0;
    //     for (var i = 0; i < elms.length; i++) {
    //         total += parseInt(document.getElementsByName("price")[i].value);
    //     }
    //     total = isNaN(total) ? 0 + "/-" : total + "/-";
    //     $("#total").text(total);
    // });

    jQuery(document).on("click", ".remove_this", function () {
        jQuery(this).parent().parent('.row').remove();
        calcTotal();
        rearrangeSR();
        return false;
    });
});