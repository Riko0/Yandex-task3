(function(){
  var form = document.getElementById("form");
  var invalidFieldsContainer=document.getElementById("invalid_fields");

  function validate(){
    var invalidFields=[];

    var birthyear=form.birthyear.value;
    if (birthyear==''){
        invalidFields.push($('#birthyear').data('label'));
    }
    else{
       if (!(/^\d{4}$/.test(birthyear)) || (
          (birthyear<1900) || (birthyear>new Date().getFullYear()))) {
           invalidFields.push($('#birthyear').data('label'));
    }}
    var town=form.town.value;
    if (town==''){
        invalidFields.push($('#town').data('label'));
    }

    var university=form.university.value;
    if (university==''){
        invalidFields.push($('#university').data('label'));
    }
      
    var graduationyear=form.graduationyear.value;
    if (graduationyear==''){
        invalidFields.push($('#graduationyear').data('label'));
    }
      
    var expectations=form.expectations.value;
    if (expectations==''){
        invalidFields.push($('#expectations').data('label'));
    }

    var infosource=form.infosource.value;
    if (infosource==''){
        invalidFields.push($('#infosource').data('label'));
    }
    
    var timeforwork=form.timeforwork.value;
    if (timeforwork==''){
        invalidFields.push($('#timeforwork').data('label'));
    }

    var task1=form.task1.value;
    if (task1==''){
        invalidFields.push($('#task1').data('label'));
    }
    else{
        if (!(/https?:\/\/[a-z.-_+0-9]+\.[a-z]{2,10}(\/\S+)?/.test(task1))){
            invalidFields.push($('#task1').data('label'));
        }
    }

    var task2=form.task2.value;
    if (task2==''){
        invalidFields.push($('#task2').data('label'));
    }
    else{
        if (!(/https?:\/\/[a-z.-_+0-9]+\.[a-z]{2,10}(\/\S+)?/.test(task2))){
            invalidFields.push($('#task2').data('label'));
        }
    }

    var task3=form.task3.value;
    if (task3==''){
        invalidFields.push($('#task3').data('label'));
    }
    else{
        if (!(/https?:\/\/[a-z.-_+0-9]+\.[a-z]{2,10}(\/\S+)?/.test(task3))){
            invalidFields.push($('#task3').data('label'));
        }
    }


    if (form.name.value==''){
        invalidFields.push($('#name').data('label'));
    }

    if (form.telephone.value==''){
        invalidFields.push($('#telephone').data('label'));
    }

    var email=form.email.value;
    if (email==''){
        invalidFields.push($('#email').data('label'));
    }
    else {
        if (!(/^[\w-\._\+%]+@(?:[\w-]+\.)+[\w]{2,6}$/.test(email))){
            invalidFields.push($('#email').data('label'));
        }
    }

    if (form.resume.value==''){
        invalidFields.push($('#resume').data('label'));
    }

    if (invalidFields.length){
      form.submit.disabled=true;
      invalidFieldsContainer.innerHTML="<b>Заполните поля: \"</b>";
      invalidFieldsContainer.innerHTML+=template.invalidFields(invalidFields);
      invalidFieldsContainer.innerHTML+="\"";
    } else {
      invalidFieldsContainer.innerHTML = '';
      form.submit.disabled = false;
    }


  }

  function removeError(id){
      document.getElementById(id+"-error").innerHTML = '';
      document.getElementById(id+"-error").style.padding = '0';
  }

    function removeError321(id){
        debugger;
        document.write('sdfsdf');
        document.getElementById(id+"-error").innerHTML = '';
        document.getElementById(id+"-error").style.padding = '0';
    }
  function displayError(id){
      document.getElementById(id+"-error").innerHTML =$('#'+id).data('errormessage');
      document.getElementById(id+"-error").style.background="#FF9999";
      document.getElementById(id+"-error").style.padding="2px";
  }

  function displayEmpty(id){
      document.getElementById(id+"-error").innerHTML ="Это поле нужно заполнить";
      document.getElementById(id+"-error").style.background="#FF9999";
      document.getElementById(id+"-error").style.padding="2px";
      document.getElementById(id+"-error").style.padding.bottom="1px";
  }


  function onFieldChange(evt){
    validate();
  }

  form.addEventListener('blur', onFieldChange, true);
  form.resume.addEventListener('change', onFieldChange, false);

})();
