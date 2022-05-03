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
    return false;
  }
  num_val = document.getElementById("inputNPlate").value;
  if (num_val == "") {
    alert("Number Plate field should not be empty");
    return false;
  } else {
    if (num_val.length < 10) {
      alert("Enter valid number plate");
      return false;
    }
  }

  $("input[name='item']").each(function () {
    console.log($(this).val());
    if ($(this).val() == "") {
      alert("Fill item details");
      return false;
    }
  });
  $("input[name='price']").each(function () {
    console.log($(this).val());
    if ($(this).val() == "") {
      alert("Fill price details");
      return false;
    }
  });
}
