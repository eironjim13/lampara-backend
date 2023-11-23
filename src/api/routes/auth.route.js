const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/admin/login', authController.adminLogin);
router.post('/nurse/login', authController.nurseLogin);

module.exports = router;
