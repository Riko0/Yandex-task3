(function(){
    var form = document.getElementById("form");
    var invalidFieldsContainer=document.getElementById("invalid_fields");

    function validate(){
        var invalidFields=[];

        if (form.name.value==''){
            invalidFields.push(form.name);
            displayError("name");
        }

        var birthyear=form.birthyear.value;
         if (birthyear==''){
         displayEmpty("birthyear");
         invalidFields.push(form.birthyear);
         }
        if (!(/^\d{4}$/.test(birthyear)) || (
            (birthyear<1900) || (birthyear>new Date().getFullYear()))) {
            displayError("birthyear");
            invalidFields.push(form.birthyear);
        }

        var tasklink=form.tasklink.value;
        if (tasklink==''){
            displayEmpty("tasklink");
            invalidFields.push(form.tasklink);
        }
        else{
            if (!(/https?:\/\/[a-z.-_+0-9]+\.[a-z]{2,10}(\/\S+)?/.test(tasklink))){
                invalidFields.push(form.tasklink);
                displayError("tasklink");
            }
        }
        var email=form.email.value;
        if (email==''){
            displayEmpty("email");
            invalidFields.push(form.email);
        }
        else {
            if (!(/^[\w-\._\+%]+@(?:[\w-]+\.)+[\w]{2,6}$/.test(email))){
                invalidFields.push(form.email);
                displayError("email");
            }
        }

        if (form.resume.value==''){
            displayError(resume);
            invalidFields.push(form.resume);
        }

        if (invalidFields.length){
            form.submit.disabled=true;
            invalidFieldsContainer.innerHTML=template.invalidFields(invalidFields);
        } else {
            invalidFieldsContainer.innerHTML = '';
            form.submit.disabled = false;
        }
    }

    function displayError(id){
        document.getElementById(id+"-error").innerHTML =$('#'+id).data('errormessage');
        document.getElementById(id+"-error").style.background="#FF9999";
        document.getElementById(id+"-error").style.padding="1px";
    }

    function displayEmpty(id){
        document.getElementById(id+"-error").innerHTML ="Это поле нужно заполнить";
        document.getElementById(id+"-error").style.background="#FF9999";
        document.getElementById(id+"-error").style.padding="1px";
    }

    function removeError(id){

        document.getElementById(id+"-error").innerHTML = '';
        document.getElementById(id+"-error").style.padding = '0';
    }

    function onFieldChange(evt){
        validate();
    }

    form.addEventListener('blur', onFieldChange, true);
    form.resume.addEventListener('change', onFieldChange, false);
    form.addEventListener('focus', removeError("name"), true);

    validate();
    removeError("name");
})();
