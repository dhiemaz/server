'use strict';

const express = require('express');
const router = express.Router();
const {
    findProfile,
    getAllProfiles,
    createProfile,
    viewProfile
} = require('../controllers/profile.controller')

router.use(express.json());

router.post('/user', createUser);
router.get('/user/:name', getUser);

module.exports = router;

