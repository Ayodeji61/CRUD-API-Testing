const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	id: {
		type: Number,
		required: true
	},
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	gender: {
		type: String,
		enum: [ 'M', 'F' ],
		default: 'M'
	},
	date_of_birth: {
		type: String,
		required: true
	}
});

module.exports = User = mongoose.model('users', UserSchema);
