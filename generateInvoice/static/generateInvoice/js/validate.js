$(document).ready(function () {
    $('#inputName').keyup(function () {
        if ($(this).val() != '') {
            $(this).removeClass('is-invalid');
            $(this).addClass('is-valid');
        } else {
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
            $('.customer-name').text('This field is required.');
        }
    });
    $('#inputNPlate').focusout(function () {
        if ($(this).val() == '') {
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
            $('.number-plate').text('This field is required.');
        } else {
            if ($(this).val().length < 9) {
                $(this).removeClass('is-valid');
                $(this).addClass('is-invalid');
                $('.number-plate').text('Number plate field should contain atleast 9 characters!');
            } else {
                $(this).removeClass('is-invalid');
                $(this).addClass('is-valid');
            }
        }
    });
    $("#inputPNumber").focusout(function () {
        if ($(this).val().length == 0) {
            $(this).removeClass('is-valid');
            $(this).removeClass('is-invalid');
        } else {
            if ($(this).val().length != 0 && $(this).val().length < 10) {
                $(this).removeClass('is-valid');
                $(this).addClass('is-invalid');
            } else {
                $(this).removeClass('is-invalid');
                $(this).addClass('is-valid');
            }
        }
    });
    $(document).on("keyup", ".item-name", function () {
        $(this).each(function () {
            item_name = $(this).val();
            if ($(this).val() == '') {
                $(this).removeClass('is-valid');
                $(this).addClass('is-invalid');
                $(this).next().text("This field is required.");
            } else {
                $(this).removeClass('is-invalid');
                $(this).addClass('is-valid');
            }
        });
    });
    $(document).on("keyup", ".item-price", function () {
        $(this).each(function () {
            if ($(this).val().length == 0) {
                $(this).removeClass('is-valid');
                $(this).addClass('is-invalid');
            } else {
                $(this).removeClass('is-invalid');
                $(this).addClass('is-valid');
            }
        });
    });
    $("#inputPNumber").keypress(function () {
        if ($(this).val().length >= 10) {
            return false;
        }
    });
});

function validateForm() {
    name_val = document.getElementById("inputName").value;
    let clean_name_val = name_val.trim().replace(/\s+/g, " ");
    if (clean_name_val == "") {
        $('#inputName').addClass('is-invalid');
        return true;
    }
    document.getElementById("inputName").value = clean_name_val;

    num_val = document.getElementById("inputNPlate").value;
    let clean_num_val = num_val.trim().replace(/\s+/g, " ");
    if (clean_num_val == "") {
        $('#inputNPlate').removeClass('is-valid');
        $('#inputNPlate').addClass('is-invalid');
        $('.number-plate').text('This field is required.');
        return true;
    } else {
        if (clean_num_val.length < 9) {
            $('#inputNPlate').removeClass('is-valid');
            $('#inputNPlate').addClass('is-invalid');
            $('.number-plate').text('Number plate field should contain atleast 9 characters!');
            return true;
        }
    }
    document.getElementById("inputNPlate").value = clean_num_val;

    phone_num = $("#inputPNumber").val();
    let clean_phone_num = phone_num.trim().replace(/\s+/g, "");
    if (clean_phone_num.length < 10 && clean_phone_num.length != 0) {
        $("#inputPNumber").addClass('is-invalid');
        return true;
    }
    $("#inputPNumber").val(clean_phone_num);

    var isInvalidItemName = false;
    $("input[name='item']").each(function () {
        let itemName = $(this).val();
        let clean_itemName = itemName.trim().replace(/\s+/g, " ");
        if (clean_itemName == "") {
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
            $('.item-feedback').text("This field is required.");
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
        let clean_itemPrice = itemPrice.trim().replace(/\s+/g, "");
        if (clean_itemPrice == "") {
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
            isInvalidItemPrice = true;
            return;
        }
        $(this).val(clean_itemPrice);
    });
    if (isInvalidItemPrice === true) {
        return true;
    }
}
