function getAllInputs(form){
    this.form=form;
    var inputs=[];
    inputs=this.form.querySelectorAll('.accordion-title');
    return inputs;
};

function listening(inputs){
    for (var i=0,l=inputs.length;i<l;i++){
        listenEvent(inputs[i],'click',changeState,this);
    }
};

function initAccordion(){
    listening(getAllInputs(document.forms[0]));
};


function changeState(e){
    var field = getFieldset(e.target);

    if (field.querySelector('.accordion-content').className=='accordion-content'){
        $(field.querySelector('.accordion-content')).slideToggle(0);
        e.field.querySelector('.accordion-content').className='accordion-content-collapsed';
    }
    else{
        $(field.querySelector('.accordion-content-collapsed')).slideToggle(0);
        field.querySelector('.accordion-content-collapsed').className='accordion-content';
    }

};

function getFieldset(o){
    debugger;
    if ((o.parentElement).className=='fieldset')
        return o.parentElement;
    if ((o.parentElement.parentElement).className=='fieldset')
        return o.parentElement.parentElement;
    if ((o.parentElement.parentElement.parentElement).className=='fieldset')
        return o.parentElement.parentElement.parentElement;
}

initAccordion();