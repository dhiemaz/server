'use strict';

const express = require('express');
const router = express.Router();
const {getProfiles, createProfile} = require('../controllers/profile.controller')

router.use(express.json());
router.get('/profile', getProfiles);
router.post('/profile', createProfile);

module.exports = router;

