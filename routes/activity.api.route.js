'use strict';

const express = require('express');
const router = express.Router();
const {
    sendVote,
    sendComment,
    getComment,
    voteComment,
} = require('../controllers/activity.controller')

router.use(express.json());
router.post('/user/activity/vote/:id', sendVote);
router.post('/user/activty/comment/:id', sendComment);
router.get('/user/activity/comment', getComment);
router.post('/user/activity/vote-comment', voteComment);

module.exports = router;

