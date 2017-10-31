function populateInputs(equivalencyData){
    var obj = equivalencyData[0];
    var is_equivalent = 'No';
    var other_option = 'Yes';
    if (obj.is_equivalent == 1) {
        is_equivalent = 'Yes';
        other_option = 'No';
    }

    document.getElementById('school_external').value = obj.school_external;
    document.getElementById('department_external').value = obj.department_external;
    document.getElementById('number_external').value = obj.number_external;
    document.getElementById('department_internal').value = obj.department_internal;
    document.getElementById('number_internal').value = obj.number_internal;

    var select = document.getElementById('isEquivalentSelect');
    var option = document.createElement("option");
    option.text = is_equivalent;
    option.setAttribute('selected', 'selected');
    select.appendChild(option);

    var option2 = document.createElement('option');
    option2.text = other_option;
    select.appendChild(option2);
}
