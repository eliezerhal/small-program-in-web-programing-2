document.addEventListener('DOMContentLoaded', function(){
    document.getElementById("my_button").addEventListener("click", sendValidator);
    document.getElementById("end_button").addEventListener("click", start);
    document.getElementById("numberOfChildren").addEventListener("keyup", addFields);}, false);

    //This function checks that there are no input errors
function sendValidator(){
    //listDetails is an array that holds the input
    var listDetails = [];
    //errors is an array that holds the errors
    var errors = [];
    //names is an array that holds the names of the children
    var names = [];

    val1 = document.getElementById("massageg0").value;
    if(val1 != "") {
        listDetails[0] = val1;
        if(errors[0])
            errors.splice(0,1);
    }
    else
        errors[0] = "first name is missing";

    val2 = document.getElementById("massageg1").value;
    if(val2 != "") {
        listDetails[1] = val2;
        if(errors[1])
            errors.splice(1,1);
    }
    else
        errors[1] = "last name is missing";

    date = new Date();
    currentYear = date.getFullYear();

    val3 = document.getElementById("massageg2").value;
    if(!val3)
        errors[2] = "birth year is missing\n";
    else if(val3>=1900 && val3 <= currentYear) {
        listDetails[2] = val3;
        if(errors[2])
            errors.splice(2,1);
    }
    else
        errors[2] = "birth year is illegal";

    val4 = document.getElementById("massageg3").value;
    if(!val4)
        errors[3] = "immigrition year is missing";
    else if(val4>=val3 && val4 <= currentYear) {
        listDetails[3] = val4;
        if(errors[3])
            errors.splice(3,1);
    }
    else
        errors[3] = "immigrition year is illegal";
    console.log(errors[3]);

    var number = document.getElementById("numberOfChildren").value;
    for(let i=0;i<number;i++)
            names[i] = document.getElementById("child" + (i+1)).value;
    for(let i=0; i<number; i++)
        if(!names[i])
            errors[4] = "name of child is missing";
        else if(errors[4])
            errors.splice(4,1);

    var check = false;
    for(let i=0; i<number-1; i++)
        for(let j=i+1; j<number; j++)
            if (names[i] == names[j]) {
                errors[5] = "name of childs is illegal";
                check = true;
            }
    if(!check){
        names = names.sort();
        if(errors[5])
            errors.splice(5,1);
    }

    for(let i=0;i<6;i++)
        if(errors[i]) {
            document.getElementById("error").style.display = "block";
            document.getElementById("error" + i).innerHTML = errors[i];
        }
    else
            document.getElementById("error" + i).innerHTML = "";

    if(errors.length == 0)
        end(listDetails, names);
}

    //This function displays a summary of the page
function end(listDetails, names) {
    document.getElementById("base").style.display = "none";
    document.getElementById("data").style.display = "block";
    for(let i=0;i<4;i++)
        document.getElementById("data" + i).innerHTML = listDetails[i];

    if(names){
        let childText = "";
        document.getElementById("children").style.display = "block";
        for(let i=0; i<names.length; i++){
            childText+=names[i];
            if(i != names.length-1)
                childText+="<br>";
        }
        document.getElementById("child").innerHTML = childText;
    }
}

    //This function returns the page to its original state
function start(){
    document.getElementById("base").style.display = "block";
    document.getElementById("error").style.display = "none";
    document.getElementById("data").style.display = "none";
    for(let i=0;i<4;i++)
        document.getElementById("massageg" + i).value = "";
    var number = document.getElementById("numberOfChildren").value;
    document.getElementById("numberOfChildren").value = null;
    addFields();
    document.getElementById("children").style.display = "none";
}

    //This function creates the child table automatically
function addFields(){
    // Number of inputs to create
    var number = document.getElementById("numberOfChildren").value;
    // Container <div> where dynamic content will be placed
    var container = document.getElementById("container");
    // Clear previous contents of the container
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }

    for (let i=0;i<number;i++){
        // Append a node with a random text
        container.appendChild(document.createTextNode("child " + (i+1)));
        // Create an <input> element, set its type and name attributes
        var input = document.createElement("input");
        input.type = "text";
        input.name = "child" + i;
        input.id = "child" + (i+1);
        container.appendChild(input);
        // Append a line break
        container.appendChild(document.createElement("br"));
    }
}