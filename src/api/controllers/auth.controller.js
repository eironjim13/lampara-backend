const express = require('express');
const Admin = require('../models/admin.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Nurse = require('../models/nurse.model');

// Route for admin login
exports.adminLogin = async (req, res) => {
	try {
		const { username, password } = req.body;

		// Check if username exists in the database
		const admin = await Admin.findOne({ username });

		if (!admin) {
			return res.status(404).json({ message: 'Invalid username or password' });
		}

		const passwordMatch = password === admin.password;

		if (!passwordMatch) {
			return res.status(401).json({ message: 'Invalid username or password' });
		}

		// Create JWT payload
		const payload = {
			admin: {
				id: admin._id,
				username: admin.username,
			},
		};

		// Sign the JWT token
		const token = jwt.sign(payload, process.env.TOKEN_SECRET);

		res.status(200).json({ success: true, token, id: admin._id });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.nurseLogin = async (req, res) => {
	const { username, password } = req.body;

	try {
		const nurse = await Nurse.findOne({ username });

		if (!nurse) {
			return res
				.status(404)
				.json({ success: false, message: 'Invalid username or password' });
		}

		const passwordMatch = await bcrypt.compareSync(password, nurse.password);

		if (!passwordMatch) {
			return res
				.status(401)
				.json({ success: false, message: 'Invalid username or password' });
		}

		// Create JWT payload
		const payload = {
			nurse: {
				id: nurse._id,
				username: nurse.username,
				// Add more data to payload if needed
			},
		};

		// Sign the JWT token
		const token = jwt.sign(payload, process.env.TOKEN_SECRET);

		res.status(200).json({ success: true, token, id: nurse._id });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};
