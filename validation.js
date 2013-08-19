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

        var eventType=this.form[field].type=='checkbox'?'click':'blur';
        listenEvent(this.form[field], eventType, this.onFieldBlur,this);
        listenEvent(this.form[field], 'focus', this.onFieldFocus,this);

        var errordiv=this.form[field].parentNode.querySelector('.error');
        if (errordiv){
            this.form[field].errordiv=errordiv;
        }
    };


    Validation.prototype.getInvalidFields = function(){
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
        return invalidFields;
    };

    Validation.prototype.onFieldBlur = function(evt){
        evt=evt||window.event;
        var target=evt.target||evt.srcElement;
        var invalidFields=this.getInvalidFields();
        this.updateUI(invalidFields);

        var fieldError =getFieldError(target.id,invalidFields);
        if (fieldError){
            target.errordiv=displayError(target,fieldError);
        }
    };

    Validation.prototype.onFieldFocus = function(evt){
        evt=evt||window.event;
        var target=evt.target||evt.srcElement;
        if (target.errordiv){
            removeError(target.errordiv);
        }
    };

    Validation.prototype.validate = function(){
        this.updateUI(this.getInvalidFields());
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
            (+field.value<new Date().getFullYear())))?'':'Введите год от 1900 до текущего';
    };

    Validation.url = function(field){
        return (RegEx.URL.test(field.value))?'':'Введите корректную ссылку';
    };

    Validation.checkbox = function(field){
        return (field.checked)?'':'Вы должны принять условия';
    };

    function displayError(target, msg){
        var div = document.createElement('div');
        div.className='error';
        div.innerHTML=msg;
        target.parentNode.insertBefore(div, null);
        return div;
    }

    function removeError(div){
        div.parentNode.removeChild(div);
        /*div.parentNode.className='accordion-content';   */
    }

    function getIndicatorHTML(invalidFields){
        var output=[];
        if (invalidFields.length!==0){
            document.getElementById('invalid_fields').className='';
            for (var i=0, l=invalidFields.length; i<l; i++){
                output.push(invalidFields[i].label);
            }
            return '<b>Осталось заполнить:</b><br>• '+output.join('<br>• ');
        }
        document.getElementById('invalid_fields').className='collapsed';
        return '';
    }

    function getFieldError(field,invalidFields){
        for (var i=0, l=invalidFields.length; i<l; i++){
            if (field==invalidFields[i].field){
                return invalidFields[i].message;
            }
        }
        return null;
    }



    window.Validation = Validation;
})();