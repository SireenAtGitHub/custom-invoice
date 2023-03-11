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
        str = generate_services_object(names, price);
        data["customerName"] = c_name;
        if (p_number.length == 10) {
            data["phone"] = p_number;
        }
        data["numberPlate"] = plate;
        data["services"] = str;
        data["csrfmiddlewaretoken"] = "{{ csrf_token }}";
        var spinner = '<div class="spinner-border" style="width: 2rem; height: 2rem;" role="status"><span class="sr-only">Loading...</span></div>&nbsp;&nbsp;Generating Invoice...';
        $.ajax({
            url: $("#url").val(),
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
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
    $("#invoiceForm").find(':input').removeClass('is-valid');
    $("#invoiceForm").find(':input').removeClass('is-invalid');
    $("#idForm").text('Generate Invoice');
}

function generate_services_object(name, price) {
    name_split = name.split("&");
    price_split = price.split("&");
    name_array = [];
    price_array = [];
    const services = [];
    for (let i = 0; i < name_split.length; i++) {
        ns_split = name_split[i].split("=");
        ps_split = price_split[i].split("=");
        for (let j = 1; j < ns_split.length; j++) {
            name_array.push(String(ns_split[j]));
            price_array.push(ps_split[j]);
        }
    }
    for(let i = 0; i < price_array.length; i++){
        const service = {serviceName: name_array[i], serviceCharge: Number(price_array[i])}
        services.push(service)
    }
    console.log(services)
    return services;
}
