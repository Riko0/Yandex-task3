(function (){
    var RegEx= {
        NOT_EMPTY:/^\S+$/,
        YEAR:(/^\d{4}$/),
        URL:(/https?:\/\/[a-z.-_+0-9]+\.[a-z]{2,10}(\/\S+)?/),
        EMAIL:(/^[\w-\._\+%]+@(?:[\w-]+\.)+[\w]{2,6}$/)
    };

    var Validation = function(form){
        this.form=form;
        this.validations={};
    };

    Validation.prototype.addCheck = function(field, checkFunction){
        if (!this.validations[field]){
            this.validations[field]=[];
        }

        this.validations[field].push(checkFunction);
    };


    Validation.prototype.validate = function(){
        var invalidFields =[];
        var currentFieldValidations;
        var currentCheck;

        for (var field in this.validations){
            if (this.validations.hasOwnProperty(field)){
                currentFieldValidations = this.validations[field];

                for (var i= 0, l=currentFieldValidations.length; i<l; i++){
                    currentCheck = currentFieldValidations[i](this.form[field]);

                    if (currentCheck!== ''){
                        invalidFields.push({
                            field:field,
                            message:currentCheck
                        });
                        break;
                    }
                }
            }
        }
        console.log(invalidFields);
        return invalidFields;
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




    window.Validation = Validation;
})();