$(document).ready(function () {
  $("#inputPNumber").keypress(function () {
    if ($("#inputPNumber").val().length >= 10) {
      return false;
    }
  });
});

function validateForm() {
  name_val = document.getElementById("inputName").value;
  if (name_val == "") {
    alert("Name field should not be empty");
    return true;
  }
  num_val = document.getElementById("inputNPlate").value;
  if (num_val == "") {
    alert("Number Plate field should not be empty");
    return true;
  } else {
    if (num_val.length < 10) {
      alert("Enter valid number plate");
      return true;
    }
  }

  var isInvalidItemName = false;
  $("input[name='item']").each(function() {
    console.log($(this).val());
    if ($(this).val() == ''){
        alert("Fill item details");
        isInvalidItemName = true
        return false;
    }
    else if($(this).val().includes("$") || $(this).val().includes("^")){
        alert("Please do not enter $ or ^ in Item Name.");
        isInvalidItemName = true
        return false;
    }
  });
  if (isInvalidItemName === true){
    return true
  }

  var isInvalidItemPrice = false;
  $("input[name='price']").each(function() {
    console.log($(this).val());
    if ($(this).val() == ''){
        alert("Fill price details");
        isInvalidItemPrice = true
        return;
    }
  });
  if (isInvalidItemPrice === true){
    return true
  }
}
