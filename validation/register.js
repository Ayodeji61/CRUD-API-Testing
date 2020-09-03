const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
	let errors = {};

	data.id = !isEmpty(data.id) ? data.id : '';
	data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
	data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
	data.gender = !isEmpty(data.gender) ? data.gender : '';
	data.date_of_birth = !isEmpty(data.date_of_birth) ? data.date_of_birth : '';

	if (Validator.isEmpty(data.id)) {
		errors.firstname = 'User ID field is required';
	}

	if (Validator.isEmpty(data.firstname)) {
		errors.firstname = 'First Name field is required';
	}

	if (Validator.isEmpty(data.lastname)) {
		errors.lastname = 'Last Name field is required';
	}

	if (Validator.isEmpty(data.gender)) {
		errors.gender = 'Gender field is required';
	}

	if (Validator.isEmpty(data.date_of_birth)) {
		errors.date_of_birth = 'Date of Birth field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
