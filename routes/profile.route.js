'use strict';

const express = require('express');
const router = express.Router();
const {
    getAllProfiles,
    createProfile,
    viewProfile
} = require('../controllers/profile.controller')

router.use(express.json());

// profile route
router.post('/profile', createProfile);
router.get('/profiles', getAllProfiles);
router.get('/profile/:id', viewProfile);

// user route
router.post('/user', createUser);
router.get('/user/:name', getUser);

module.exports = router;

