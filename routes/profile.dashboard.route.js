'use strict';

const express = require('express');
const router = express.Router();
const {
    viewDashboardProfile
} = require('../controllers/profile.controller')

router.get('/', viewDashboardProfile);

module.exports = router;
