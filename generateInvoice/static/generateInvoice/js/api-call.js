$(document).ready(function(){
    $("#idForm").click(function(e) {
        if (validateForm()){
            console.log('Hello');
            return false;
        }
        data = {}
        e.preventDefault();
        name = $('[name=item]').serialize();
        name = decodeURI(name)
        price = $('[name=price]').serialize();
        price = decodeURI(price)
        c_name = $("#inputName").val();
        plate = $("#inputNPlate").val();
        p_number = $("#inputPNumber").val();
        str = generate_str(name, price);
        data['cname'] = c_name;
        data['phone'] = p_number;
        data['number_plate'] = plate;
        data['items'] = str;
        data['csrfmiddlewaretoken']= '{{ csrf_token }}';
        $.ajax({
            url: $("#url").val(),
            type: "POST",
            data: data,
            success: function(response) {
                var binaryData = []
                binaryData.push(response)
                var link=document.createElement('a');
                link.href=window.URL.createObjectURL(new Blob(binaryData, {type: "application/pdf"}));
                link.download="INVOICE" + plate.toUpperCase() + ".pdf";
                link.click();
                window.location.replace($("#home").val());
        }
    });
    });
});

function generate_str(name, price){
    name_split = name.split('&');
    price_split = price.split('&');
    name_array = []
    price_array = []
    for (let i = 0; i < name_split.length; i++) {
        ns_split = name_split[i].split('=');
        ps_split = price_split[i].split('=');
        for (let j = 1; j < ns_split.length; j++){
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

function validateForm(){
    name_val = document.getElementById("inputName").value;
    if (name_val == ''){
        alert("Name field should not be empty");
        return false;
    }
    num_val = document.getElementById("inputNPlate").value;
    if (num_val == ''){
        alert("Number Plate field should not be empty");
        return false;
    }else{
        if (num_val.length < 10){
            alert("Enter valid number plate");
            return false;
        }
    }
    phone_val = document.getElementById('inputPNumber').value;
    var phoneno = /^\d{10}$/;
    if(phone_val == ''){
        alert("Phone number field should not be empty");
        return false;
    }else{
        console.log(phoneno.test(phone_val))
        if (phone_val.length != 10 || !phoneno.test(phone_val)){
            alert("Enter valid phone number");
            return false;
        }
    }

    $("input[name='item']").each(function() {
        console.log($(this).val());
        if ($(this).val() == ''){
            alert("Fill item details");
            return false;
        }
    });
    $("input[name='price']").each(function() {
        console.log($(this).val());
        if ($(this).val() == ''){
            alert("Fill price details");
            return false;
        }
    });
}