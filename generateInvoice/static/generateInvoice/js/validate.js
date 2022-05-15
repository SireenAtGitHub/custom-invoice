$(document).ready(function () {
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
        alert("Name field should not be empty");
        return true;
    }
    document.getElementById("inputName").value = clean_name_val;

    num_val = document.getElementById("inputNPlate").value;
    let clean_num_val = num_val.trim().replace(/\s+/g,"");
    if (clean_num_val == "") {
        alert("Number Plate field should not be empty");
        return true;
    } else {
        if (clean_num_val.length < 10) {
            alert("Enter valid number plate");
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
