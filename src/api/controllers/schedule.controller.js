// controllers/schedule.controller.js

const Schedule = require('../models/schedule.model');

// Function to create a new schedule
exports.createSchedule = async (req, res) => {
	const { nurse_id, shift_id, date } = req.body;

	try {
		const newSchedule = new Schedule({
			nurse_id,
			shift_id,
			date,
		});

		const savedSchedule = await newSchedule.save();
		res.status(201).json({
			success: true,
			message: 'Schedule created',
			data: savedSchedule,
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

// Function to get all schedules
exports.getAllSchedules = async (req, res) => {
	try {
		const schedules = await Schedule.find().populate('nurse_id shift_id');

		res.status(200).json({
			success: true,
			message: 'All schedules retrieved',
			data: schedules,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Function to get a schedule by schedule ID
exports.getScheduleByScheduleId = async (req, res) => {
	const { scheduleId } = req.params;

	try {
		const schedule = await Schedule.findById(scheduleId).populate(
			'nurse_id shift_id'
		);

		if (!schedule) {
			return res
				.status(404)
				.json({ success: false, message: 'Schedule not found' });
		}

		res
			.status(200)
			.json({ success: true, message: 'Schedule retrieved', data: schedule });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Function to update a schedule by schedule ID
exports.updateSchedule = async (req, res) => {
	const { scheduleId } = req.params;
	const { nurse_id, shift_id, date } = req.body;

	try {
		let schedule = await Schedule.findById(scheduleId).populate(
			'nurse_id shift_id'
		);

		if (!schedule) {
			return res
				.status(404)
				.json({ success: false, message: 'Schedule not found' });
		}

		schedule.nurse_id = nurse_id || schedule.nurse_id;
		schedule.shift_id = shift_id || schedule.shift_id;
		schedule.date = date || schedule.date;

		schedule = await schedule.save();

		res
			.status(200)
			.json({ success: true, message: 'Schedule updated', data: schedule });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Function to delete a schedule by schedule ID
exports.deleteScheduleByScheduleId = async (req, res) => {
	const { scheduleId } = req.params;

	try {
		const schedule = await Schedule.findByIdAndDelete(scheduleId);

		if (!schedule) {
			return res
				.status(404)
				.json({ success: false, message: 'Schedule not found' });
		}

		res.status(200).json({ success: true, message: 'Schedule deleted' });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};
