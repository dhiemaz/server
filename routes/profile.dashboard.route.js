'use strict';

const express = require('express');
const router = express.Router();
const {viewDashboardProfile, getProfiles} = require('../controllers/profile.controller')

const profiles = [
  {
    "id": 1,
    "name": "A Martinez",
    "description": "Adolph Larrue Martinez III.",
    "mbti": "ISFJ",
    "enneagram": "9w3",
    "variant": "sp/so",
    "tritype": 725,
    "socionics": "SEE",
    "sloan": "RCOEN",
    "psyche": "FEVL",
    "image": "https://soulverse.boo.world/images/1.png",
  }
];

router.get('/', viewDashboardProfile);

module.exports = router;