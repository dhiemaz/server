'use strict';

const express = require('express');
const router = express.Router();
const {
    findProfile,
    getAllProfiles,
    createProfile,
} = require('../controllers/profile.controller')

router.use(express.json());
router.get('/profile/:id', findProfile);
router.get('/profiles', getAllProfiles);
router.post('/profile', createProfile);

module.exports = router;

