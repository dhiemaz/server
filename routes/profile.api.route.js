'use strict';

const express = require('express');
const router = express.Router();
const {
    viewProfiles,
    createProfile
} = require('../controllers/profile.controller')

router.use(express.json());
router.get('/profile/:id', viewProfiles);
router.post('/profile', createProfile);

module.exports = router;

