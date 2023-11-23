// Import required modules
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDb = require('./config/DBConfig');

// Create an instance of Express
const app = express();

// dependencies
const authRoutes = require('./api/routes/auth.route');
const nurseRoutes = require('./api/routes/nurse.route');
const shiftRoutes = require('./api/routes/shift.route');
const scheduleRoutes = require('./api/routes/schedule.route');

// connect to database
connectToDb();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/nurse', nurseRoutes);
app.use('/api/shift', shiftRoutes);
app.use('/api/schedule', scheduleRoutes);

// start server
app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
