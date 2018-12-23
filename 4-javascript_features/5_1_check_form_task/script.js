'use strict';

function validateForm(data) {
	var formId = data.formId; /* 'profile' */
    var formValidClass = data.formValidClass; /* 'form_valid' */
    var formInvalidClass = data.formInvalidClass; /* 'form_invalid' */
    var inputErrorClass = data.inputErrorClass; /* input_error' */

    var form = document.getElementById(formId);

    form.addEventListener('submit', function(event) {
    	event.preventDefault();

    	event.target.classList.remove(formValidClass);
    	event.target.classList.remove(formInvalidClass);

    	if (formValid(event, inputErrorClass)) {
    		event.target.classList.add(formValidClass);
    	} else {
    		event.target.classList.add(formInvalidClass);
    	}
    });

    form.addEventListener('keydown', function(event) {
    	if (13 == event.keyCode && event.target.tagName === 'INPUT') {
			/*console.log('Enter was pressed');*/
		}
    }, true);


    form.addEventListener('blur', function(event) {
		if (event.target.tagName === 'INPUT' && !inputValid(event.target)) {
			event.target.classList.add(inputErrorClass);
		}
	}, true);

    form.addEventListener('focus', function(event) {
		if (event.target.tagName === 'INPUT') {
			event.target.classList.remove(inputErrorClass);
			event.target.classList.remove(formValidClass);
			event.target.classList.remove(formInvalidClass);
		}
    }, true);
}


function formValid(event, inputErrorClass) {	
	var elems = document.querySelectorAll('input');
	for (var i = 0; i < elems.length; i++) {
		if (elems[i].hasAttribute('class') 
			&& elems[i].dataset.class === 'input_error') {
				return false;
		}

		if (!inputValid(elems[i])) {
			elems[i].classList.add(inputErrorClass);
			return false;
		}
	}
		

	return true;
};


function inputValid(inputElement) {
	var value = document.getElementById(inputElement.id).value;
	var validationType = inputElement.dataset.validator; /* letters, number, regexp */
	var min = Number(inputElement.dataset.validatorMin);
	var max = Number(inputElement.dataset.validatorMax);	
	var pattern = RegExp(inputElement.dataset.validatorPattern);

	return checkRequired(inputElement.dataset.required, value) 
				  && checkValidationByType(inputElement.dataset.required, 
				  						   validationType, 
				  						   value,
				  						   min,
				  						   max,
				  						   pattern);
};

function checkRequired(hasRequired, value) {
	var isValid = true;
	if (hasRequired !== undefined &&
		value.length === 0) {
			isValid = false;
	}
	return isValid;
};

function checkValidationByType(hasRequired, validationType, value,  min, max, pattern) {
	if (hasRequired === undefined && value.length === 0) return true;
	switch(validationType) {
		case "letters":
			return /^[a-zа-я]+$/i.test(value);

		case "number":
			var num = Number(value);
			var isValid = /^-?\d+$/.test(value);
			if (!isNaN(min) && !isNaN(max)) {
				isValid = isValid && (num <= max) && (num >= min);
			}
			return isValid;

		case "regexp":
			return pattern.test(value);

		default:
			console.error('Unknown validation type: ' + validationType);
			break;
	};
	return false;
};