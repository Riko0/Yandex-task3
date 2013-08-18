(function (){
    var RegEx= {
        YEAR:(/^\d{4}$/),
        URL:(/https?:\/\/[a-z.-_+0-9]+\.[a-z]{2,10}(\/\S+)?/),
        EMAIL:(/^[\w-\._\+%]+@(?:[\w-]+\.)+[\w]{2,6}$/)
    };

    var Vaildation = function(form){
        this.form=form;
        this.validations ={};
    };

    Vaildation.prototype.addCheck = function(field, checkFunction){
        if (!this.validations[field]){
            this.validations[field]=[];
        }

        this.validations[field].push(checkFunction);
    };


    Validation.prototype.validate = function(){
        var invalidFields ={};
        var currentFieldValidations;
        var currentCheck;

        for (var field in this.validations){
            if (this.validations.hasOwnProperty(field)){
                currentFieldValidations = this.validations[field];

                for (var i= 0, l=currentFieldValidations.length; i<l; i++){
                    currentCheck = currentFieldValidations[i](this.form[field]);

                    if (currentCheck!== ''){
                        invalidFields[field] = currentCheck;
                        break;
                    }
                }
            }
        };
        return invalidFields;
    }

    Vaildation.emailValidation = function(field){
        return RegEx.EMAIL.test(field.value)?'Введите корректный e-mail':'';
    }

    window.Validation = Vaildation;
})();