(function (){
    var RegEx= {
        NOT_EMPTY:/^\S+$/,
        YEAR:(/^\d{4}$/),
        URL:(/https?:\/\/[a-z.-_+0-9]+\.[a-z]{2,10}(\/\S+)?/),
        EMAIL:(/^[\w-\._\+%]+@(?:[\w-]+\.)+[\w]{2,6}$/)
    };

    var Validation = function(form, indicator){
        this.form=form;
        this.indicator=indicator;
        this.validations={};
        this.submitElement=form.querySelector('input[type=submit]')||
            form.querySelector('submit');
    };

    Validation.prototype.addCheck = function(field, label, var_checkFunctions){
        this.validations[field]={
            label:label,
            checkFunctions:(var_checkFunctions instanceof Array)?
                var_checkFunctions:
                Array.prototype.slice.call(arguments, 2)
        };
    };


    Validation.prototype.validate = function(){
        var invalidFields =[];
        var currentField;
        var currentCheck;

        for (var field in this.validations){
            if (this.validations.hasOwnProperty(field)){
                currentField = this.validations[field];

                for (var i= 0, l=currentField.checkFunctions.length; i<l; i++){
                    currentCheck = currentField.checkFunctions[i](this.form[field]);

                    if (currentCheck!== ''){
                        invalidFields.push({
                            field:field,
                            label:currentField.label,
                            message:currentCheck
                        });
                        break;
                    }
                }
            }
        }
        this.updateUI(invalidFields);
        return invalidFields;
    };

    Validation.prototype.updateUI = function(invalidFields){
        this.submitElement.disabled=invalidFields.length>0;
        this.indicator.innerHTML=getIndicatorHTML(invalidFields);
    };

    Validation.emptyField = function(field){
        return RegEx.NOT_EMPTY.test(field.value)?'':'Поле не должно быть пустым';
    };

    Validation.email = function(field){
        return RegEx.EMAIL.test(field.value)?'':'Введите корректный e-mail';
    };

    Validation.year = function(field){
        return ((RegEx.YEAR.test(field.value))&&((+field.value>1900)&&
            (+field.value<newDate().getFullYear())))?'':'Введите год от 1900 до текущего';
    };

    Validation.url = function(field){
        return (RegEx.URL.test(field.value))?'':'Введите корректную ссылку';
    };

    Validation.checkbox = function(field){
        return (field.checked)?'':'Вы должны принять условия';
    };

    function getIndicatorHTML(invalidFields){
        var output=[];
        for (i=0, l=invalidFields.length; i<l; i++){
            output.push(invalidFields[i].label);
        }
        return 'Осталось заполнить: '+output.join(', ');
    }

    window.Validation = Validation;
})();