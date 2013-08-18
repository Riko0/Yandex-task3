(function(){
    var formValidation=new Validation(form,document.getElementById('invalid_fields'));
    formValidation.addCheck('birthyear', 'Год рождения', Validation.emptyField, Validation.year);
    formValidation.addCheck('graduationyear', 'Год окончания университета', Validation.emptyField, Validation.year);
    formValidation.addCheck('town', 'Город', Validation.emptyField);
    formValidation.addCheck('university', 'Вуз', Validation.emptyField);
    formValidation.addCheck('expectations', 'Ожидания от обучения', Validation.emptyField);
    formValidation.addCheck('infosource', 'Откуда узнали о ШРИ', Validation.emptyField);
    formValidation.addCheck('timeforwork', 'Время для Яндекса', Validation.emptyField);
    formValidation.addCheck('task1', 'Задание 1', Validation.emptyField, Validation.url);
    formValidation.addCheck('task2', 'Задание 2', Validation.emptyField, Validation.url);
    formValidation.addCheck('task3', 'Задание 3', Validation.emptyField, Validation.url);
    formValidation.addCheck('resume', 'Резюме', Validation.emptyField);
    formValidation.addCheck('name', 'Имя', Validation.emptyField);
    formValidation.addCheck('telephone', 'Телефон', Validation.emptyField);
    formValidation.addCheck('email', 'Эл. почта', Validation.emptyField, Validation.email);
    formValidation.addCheck('agreement', 'Соглашение', Validation.checkbox);

    formValidation.validate();
})();