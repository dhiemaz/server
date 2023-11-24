'use strict';

const express = require('express');
const router = express.Router();
const {
    sendVote,
    sendComment,
    getComment,
    sendLikes,
} = require('../controllers/activity.controller')

router.use(express.json());
router.post('/user/activity/likes/:id', sendLikes);
router.post('/user/activty/comment/:id', sendComment);
router.get('/user/activity/comment', getComment);

module.exports = router;

