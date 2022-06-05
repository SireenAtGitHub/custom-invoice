$(document).ready(function () {
    $("#invoiceForm").submit(function (e) {
        e.preventDefault();
        if (validateForm()) {
            return;
        }
        data = {};
        i_names = $("[name=item]").serialize();
        names = decodeURI(i_names);
        price = $("[name=price]").serialize();
        price = decodeURI(price);
        c_name = $("#inputName").val();
        plate = $("#inputNPlate").val();
        p_number = $("#inputPNumber").val();
        str = generate_str(names, price);
        data["cname"] = c_name;
        if (p_number.length == 10){
            data["phone"] = p_number;
        }
        data["number_plate"] = plate;
        data["items"] = str;
        data["csrfmiddlewaretoken"] = "{{ csrf_token }}";
        var spinner = '<div class="spinner-border" style="width: 2rem; height: 2rem;" role="status"><span class="sr-only">Loading...</span></div>&nbsp;&nbsp;Generating Invoice...';
        $.ajax({
            url: $("#url").val(),
            type: "POST",
            data: data,
            beforeSend: function (){
                $('#idForm').html(spinner);
            },
            success: function (response) {
                var binaryData = [];
                binaryData.push(response);
                var fileURL = window.URL.createObjectURL(
                    new Blob(binaryData, { type: "application/pdf" })
                );
                window.open(fileURL);
                resetForm();
            },
        });
    });
});
function resetForm() { 
    $("#invoiceForm").trigger("reset");
    $(".remove_this").each(function () {
        $(this).trigger("click");
    });
    $('#total').text(0);
    $("input[name='price']").removeClass('alignRight');
    $("#invoiceForm").each(function (){
        $(this).find(':input').removeClass('is-valid');
        $(this).find(':input').removeClass('is-invalid');
    });
    $("#idForm").text('Generate Invoice');
}

function generate_str(name, price) {
    name_split = name.split("&");
    price_split = price.split("&");
    name_array = [];
    price_array = [];
    for (let i = 0; i < name_split.length; i++) {
        ns_split = name_split[i].split("=");
        ps_split = price_split[i].split("=");
        for (let j = 1; j < ns_split.length; j++) {
            name_array.push(String(ns_split[j]));
            price_array.push(ps_split[j]);
        }
    }
    str = "";
    for (let i = 0; i < price_array.length; i++) {
        str += name_array[i] + " ^ " + price_array[i];
        str += " $ ";
    }
    return str;
}
