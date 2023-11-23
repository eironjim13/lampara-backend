// models/nurse.model.js
const mongoose = require('mongoose');

// Define the Nurse schema
const nurseSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	// You can add more fields as needed
});

// Create and export the Nurse model
const Nurse = mongoose.model('Nurse', nurseSchema);
module.exports = Nurse;
