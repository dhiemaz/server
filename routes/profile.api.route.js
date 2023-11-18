'use strict';

const express = require('express');
const router = express.Router();
const {
    findProfile,
    getAllProfiles,
    createProfile,
} = require('../controllers/profile.controller')

router.use(express.json());
router.get('/user/profile/:id', findProfile);
router.get('/user/profiles', getAllProfiles);
router.post('/user/profile', createProfile);

module.exports = router;

