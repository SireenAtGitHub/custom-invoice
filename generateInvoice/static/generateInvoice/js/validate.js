$(document).ready(function () {
    $('#inputName').keyup(function() {
        if ($(this).val() != ''){
            $(this).removeClass('is-invalid');
            $(this).addClass('is-valid');
        }else{
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
            $('.customer-name').text('This field is required!');
        }
    });
    $('#inputNPlate').keyup(function() {
        if ($(this).val() == ''){
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
            $('.number-plate').text('This field is required!');
        }else{
            if($(this).val().length < 10){
                $(this).removeClass('is-valid');
                $(this).addClass('is-invalid');
                $('.number-plate').text('Number plate field should contain atleast 10 characters!');
            }else{
                $(this).removeClass('is-invalid');
                $(this).addClass('is-valid');
            }
        }
    });
    $("#inputPNumber").keypress(function () {
        if ($("#inputPNumber").val().length >= 10) {
            return false;
        }
    });
});

function validateForm() {
    name_val = document.getElementById("inputName").value;
    let clean_name_val = name_val.trim().replace(/\s+/g," ");
    if (clean_name_val == "") {
        $('#inputName').addClass('is-invalid');
        return true;
    }
    document.getElementById("inputName").value = clean_name_val;

    num_val = document.getElementById("inputNPlate").value;
    let clean_num_val = num_val.trim().replace(/\s+/g," ");
    if (clean_num_val == "") {
        $('#inputNPlate').removeClass('is-valid');
        $('#inputNPlate').addClass('is-invalid');
        $('.number-plate').text('This field is required!');
        return true;
    } else {
        if (clean_num_val.length < 10) {
            $('#inputNPlate').removeClass('is-valid');
            $('#inputNPlate').addClass('is-invalid');
            $('.number-plate').text('Number plate field should contain atleast 10 characters!');
            return true;
        }
    }
    document.getElementById("inputNPlate").value = clean_num_val;

    phone_num = $("#inputPNumber").val();
    let clean_phone_num = phone_num.trim().replace(/\s+/g,"");
    if (clean_phone_num.length < 10 && clean_phone_num.length != 0) {
        alert("Enter valid phone number");
        return true;
    }
    $("#inputPNumber").val(clean_phone_num);

    var isInvalidItemName = false;
    $("input[name='item']").each(function () {
        let itemName = $(this).val();
        let clean_itemName = itemName.trim().replace(/\s+/g," ");
        if (clean_itemName == "") {
            alert("Fill item details");
            isInvalidItemName = true;
            return false;
        } else if (clean_itemName.includes("$") || clean_itemName.includes("^")) {
            alert("Please do not enter $ or ^ in Item Name.");
            isInvalidItemName = true;
            return false;
        }
        $(this).val(clean_itemName);
    });
    if (isInvalidItemName === true) {
        return true;
    }

    var isInvalidItemPrice = false;
    $("input[name='price']").each(function () {
        let itemPrice = $(this).val();
        let clean_itemPrice = itemPrice.trim().replace(/\s+/g,"");
        if (clean_itemPrice == "") {
            alert("Fill price details");
            isInvalidItemPrice = true;
            return;
        }
        $(this).val(clean_itemPrice);
    });
    if (isInvalidItemPrice === true) {
        return true;
    }
}
