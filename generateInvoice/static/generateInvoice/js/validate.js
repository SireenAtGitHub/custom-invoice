$(document).ready(function () {
    $('#inputName').focusout(function () {
        if ($(this).val() == '') {
            makeInvalid(this);
        } else {
            makeValid(this);
        }
    });
    $('#inputNPlate').focusout(function () {
        if ($(this).val() == '') {
            makeInvalid(this);
        } else if ($(this).val().length < 9) {
            makeInvalid(this, 'Number plate field should contain atleast 9 characters!');
        } else {
            makeValid(this);
        }
    });
    $("#inputPNumber").focusout(function () {
        if ($(this).val().length == 0) {
            makeNuetral(this);
        } else if ($(this).val().length != 0 && $(this).val().length < 10) {
            makeInvalid(this, 'Please enter a 10-digit phone number.');
        } else {
            makeValid(this);
        }
    });
    $(document).on("keyup", ".service-name", function () {
        if ($(this).val().length == 0) {
            makeInvalid(this);
        } else {
            makeValid(this);
        }
    });
    $(document).on("keyup", ".service-price", function () {
        if ($(this).val().length == 0) {
            makeInvalid(this);
        } else {
            makeValid(this);
        }
    });
    $("#inputPNumber").keypress(function () {
        if ($(this).val().length >= 10) {
            return false;
        }
    });
});
function makeNuetral(element) {
    $(element).removeClass('is-valid');
    $(element).removeClass('is-invalid');
}
function makeInvalid(element, errorMessage = 'This field is required.') {
    $(element).addClass('is-invalid');
    $(element).removeClass('is-valid');
    $(element).next('.invalid-feedback').text(errorMessage);
}
function makeValid(element) {
    $(element).removeClass('is-invalid');
    $(element).addClass('is-valid');
}
function validateForm() {
    var isInvalidCustomerName = false;
    name_val = document.getElementById("inputName").value;
    let clean_name_val = name_val.trim().replace(/\s+/g, " ");
    if (clean_name_val == "") {
        makeInvalid($('#inputName'));
        isInvalidCustomerName = true;
    } else {
        makeValid($('#inputName'));
    }
    document.getElementById("inputName").value = clean_name_val;

    var isInvalidNPlate = false;
    num_val = document.getElementById("inputNPlate").value;
    clean_num_val = num_val.trim().replace(/\s+/g, " ");
    if (clean_num_val == "") {
        makeInvalid($('#inputNPlate'));
        isInvalidNPlate = true;
    } else if (clean_num_val.length < 9) {
        makeInvalid($('#inputNPlate'), 'Number plate field should contain atleast 9 characters!');
        isInvalidNPlate = true;
    } else {
        makeValid($('#inputNPlate'));
    }
    document.getElementById("inputNPlate").value = clean_num_val;

    var isInvalidPNumber = false;
    phone_num = $("#inputPNumber").val();
    clean_phone_num = phone_num.trim().replace(/\s+/g, "");
    if (clean_phone_num.length < 10 && clean_phone_num.length != 0) {
        makeInvalid($("#inputPNumber"), 'Please enter a 10-digit phone number.');
        isInvalidPNumber = true;
    }
    $("#inputPNumber").val(clean_phone_num);

    var isInvalidItemName = false;
    $("input[name='item']").each(function () {
        let itemName = $(this).val();
        let clean_itemName = itemName.trim().replace(/\s+/g, " ");
        if (clean_itemName == "") {
            makeInvalid(this);
            isInvalidItemName = true;
        } else {
            makeValid(this);
        }
        $(this).val(clean_itemName);
    });

    var isInvalidItemPrice = false;
    $("input[name='price']").each(function () {
        let itemPrice = $(this).val();
        let clean_itemPrice = itemPrice.trim().replace(/\s+/g, "");
        if (clean_itemPrice == "") {
            makeInvalid(this);
            isInvalidItemPrice = true;
        } else {
            makeValid(this);
        }
        $(this).val(clean_itemPrice);
    });
    if (isInvalidItemName | isInvalidItemPrice | isInvalidCustomerName | isInvalidNPlate | isInvalidPNumber) {
        return true;
    }
}
